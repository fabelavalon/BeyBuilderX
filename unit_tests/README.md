# Unit tests

Node scripts that smoke-test logic without a browser.

## Run

```bash
npm test
```

Or run a single file:

```bash
node unit_tests/migration_001_stadium.test.js
```

## Layout

| File | Covers |
|------|--------|
| `migration_001_stadium.test.js` | Migration engine + revision `001` (stadium schema, indexes) |

No test framework — plain `node` + `assert` / thrown errors.
