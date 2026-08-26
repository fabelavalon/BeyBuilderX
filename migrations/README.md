# Database migrations

Alembic-style schema upgrades for the PouchDB stores.

## How it works

- **Engine:** `migrate.js` — registers revisions, walks the upgrade/downgrade chain, updates version.
- **Version doc:** `settings` DB, `_id: "dbVersion"`, field `revision` (e.g. `"001"`). Missing doc = base (never migrated).
- **Versions:** one file per revision under `versions/`. Each calls `registerMigration({ revision, down_revision, message, upgrade, downgrade })`.

Migrations run on app start and after DB import (`main.js`).

## Adding a migration

1. Create `versions/00N_short_name.js` with `down_revision` pointing at the previous head.
2. Add a `<script src="./migrations/versions/00N_short_name.js">` in `index.html` after `migrate.js`.
3. Add the same path to `serviceWorker.js` `PRECACHE_URLS` (and bump `CACHE_NAME` if needed).

## Notes

- Keep migration files self-contained. Do not call helpers from `main.js`.
- Prefer small, reversible `upgrade` / `downgrade` pairs when practical.
- Optional `reapplyIf(context)` on a revision: if already at that head but schema is incomplete, `upgrade` runs again (used when amending an unreleased migration).

## vsRecord shape (revision 001+)

```js
{
  _id: "bey1Id_bey2Id_stadiumId",  // bey ids sorted alphabetically
  type: "vsRecord",
  bey1Id, bey2Id, stadiumId,
  bey1, bey2,                      // full build snapshots
  title,
  scores: { wko, lko, wso, lso, wbst, lbst, wx, lx, draws }
}
```

Indexes: `_design/vsRecords` views `by_bey_pair`, `by_stadium`, `by_bey_and_stadium`.
