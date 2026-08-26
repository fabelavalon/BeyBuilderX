/**
 * Smoke test: migration 001 — stadium vsRecord schema.
 * Run: node unit_tests/migration_001_stadium.test.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import assert from "assert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function memDb() {
    const docs = new Map();
    return {
        async get(id) {
            if (!docs.has(id)) {
                const e = new Error("missing");
                e.name = "not_found";
                e.status = 404;
                throw e;
            }
            return structuredClone(docs.get(id));
        },
        async put(doc) {
            const rev = "1-" + Math.random().toString(16).slice(2);
            const stored = { ...doc, _rev: rev };
            docs.set(doc._id, stored);
            return { ok: true, id: doc._id, rev };
        },
        async remove(doc) {
            docs.delete(doc._id);
            return { ok: true };
        },
        async allDocs() {
            const rows = [...docs.values()].map((d) => ({
                id: d._id,
                doc: structuredClone(d)
            }));
            return { rows, total_rows: rows.length };
        },
        keys() {
            return [...docs.keys()].sort();
        }
    };
}

const sandbox = {
    console,
    MIGRATIONS: undefined,
    registerMigration: undefined,
    runMigrations: undefined,
    buildMigrationChain: undefined,
    getDbVersionDoc: undefined,
    setDbVersion: undefined,
    DB_VERSION_DOC_ID: undefined
};
vm.createContext(sandbox);
vm.runInContext(
    fs.readFileSync(path.join(root, "migrations/migrate.js"), "utf8"),
    sandbox
);
vm.runInContext(
    fs.readFileSync(
        path.join(root, "migrations/versions/001_stadium_vs_records.js"),
        "utf8"
    ),
    sandbox
);

const settings = memDb();
const recordsDBX = memDb();
const beyBladeDBX = memDb();

const beyA = { id: "bladeA r b", name: "A" };
const beyZ = { id: "bladeZ r b", name: "Z" };
const beyB = { id: "bladeB r b", name: "B" };
const beyC = { id: "bladeC r b", name: "C" };

// Only reverse orientation exists (pre-dedupe legacy)
await recordsDBX.put({
    _id: beyZ.id + " " + beyA.id,
    title: "Z vs A",
    wko: 1,
    lko: 2,
    wso: 0,
    lso: 0,
    wbst: 0,
    lbst: 0,
    wx: 0,
    lx: 0,
    draws: 0,
    challenger: beyZ,
    defender: beyA
});

// Both orientations exist
await recordsDBX.put({
    _id: beyB.id + " " + beyC.id,
    title: "B vs C",
    wko: 5,
    lko: 0,
    wso: 0,
    lso: 0,
    wbst: 0,
    lbst: 0,
    wx: 0,
    lx: 0,
    draws: 0,
    challenger: beyB,
    defender: beyC
});
await recordsDBX.put({
    _id: beyC.id + " " + beyB.id,
    title: "C vs B",
    wko: 0,
    lko: 5,
    wso: 0,
    lso: 0,
    wbst: 0,
    lbst: 0,
    wx: 0,
    lx: 0,
    draws: 0,
    challenger: beyC,
    defender: beyB
});

const rev = await sandbox.runMigrations({ settings, recordsDBX, beyBladeDBX });
assert.strictEqual(rev, "001");

const expectedZA = beyA.id + "_" + beyZ.id + "_xtreme";
const expectedBC = beyB.id + "_" + beyC.id + "_xtreme";

const dataKeys = recordsDBX.keys().filter((k) => !k.startsWith("_design/"));
assert.deepStrictEqual(dataKeys, [expectedBC, expectedZA].sort());

const canonZA = await recordsDBX.get(expectedZA);
assert.strictEqual(canonZA.type, "vsRecord");
assert.strictEqual(canonZA.stadiumId, "xtreme");
assert.strictEqual(canonZA.bey1Id, beyA.id);
assert.strictEqual(canonZA.bey2Id, beyZ.id);
assert.strictEqual(canonZA.scores.wko, 2);
assert.strictEqual(canonZA.scores.lko, 1);

const canonBC = await recordsDBX.get(expectedBC);
assert.strictEqual(canonBC.scores.wko, 5);
assert.strictEqual(canonBC.bey1Id, beyB.id);

await assert.rejects(
    () => recordsDBX.get(beyC.id + " " + beyB.id),
    (err) => err.name === "not_found"
);

const design = await recordsDBX.get("_design/vsRecords");
assert.ok(design.views.by_bey_pair);
assert.ok(design.views.by_stadium);

const ver = await settings.get("dbVersion");
assert.strictEqual(ver.revision, "001");

// Idempotent re-apply when already at 001
const rev2 = await sandbox.runMigrations({ settings, recordsDBX, beyBladeDBX });
assert.strictEqual(rev2, "001");
assert.deepStrictEqual(
    recordsDBX.keys().filter((k) => !k.startsWith("_design/")),
    [expectedBC, expectedZA].sort()
);

console.log("migration_001_stadium.test.js: ok");
