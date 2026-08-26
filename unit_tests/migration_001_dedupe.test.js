/**
 * Smoke test: migration engine + revision 001 vsRecord dedupe.
 * Run: node unit_tests/migration_001_dedupe.test.js
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
        path.join(root, "migrations/versions/001_dedupe_vs_records.js"),
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

// Only reverse orientation exists
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

const keys = recordsDBX.keys();
assert.deepStrictEqual(keys, [
    beyA.id + " " + beyZ.id,
    beyB.id + " " + beyC.id
]);

const canonZA = await recordsDBX.get(beyA.id + " " + beyZ.id);
assert.strictEqual(canonZA.challenger.id, beyA.id);
assert.strictEqual(canonZA.wko, 2);
assert.strictEqual(canonZA.lko, 1);

const canonBC = await recordsDBX.get(beyB.id + " " + beyC.id);
assert.strictEqual(canonBC.wko, 5);

await assert.rejects(
    () => recordsDBX.get(beyC.id + " " + beyB.id),
    (err) => err.name === "not_found"
);

const ver = await settings.get("dbVersion");
assert.strictEqual(ver.revision, "001");

console.log("migration_001_dedupe.test.js: ok");
