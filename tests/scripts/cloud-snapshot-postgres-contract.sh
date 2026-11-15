#!/usr/bin/env bash
set -euo pipefail
# Caller must provide a newly created synthetic PG16 service. No database URL.
test "${PGHOST:-}" = 127.0.0.1
test "${PGDATABASE:-}" = neondb
test "$(psql -X -Atq -v ON_ERROR_STOP=1 -c 'SELECT schema_version FROM public.app_schema_meta WHERE singleton=true')" = 9
psql -X -v ON_ERROR_STOP=1 -f tests/sql/cloud_snapshot_recovery_setup.sql
evidence="$(mktemp -d)"
trap 'rm -rf "$evidence"' EXIT
repair() {
  psql -X -Atq -v ON_ERROR_STOP=1 -c "SET ROLE neondb_owner; UPDATE public.student_cloud_state SET state_json=jsonb_set(jsonb_set(state_json,'{missionHistory}','[]'),'{xp}','$1'),revision=revision+1,last_device_id='synthetic-repair',updated_at=now() WHERE auth_user_id='synthetic-f7-a' AND revision=1 RETURNING revision;"
}
repair 41 > "$evidence/a" &
first=$!
repair 42 > "$evidence/b" &
second=$!
wait "$first"
wait "$second"
test "$(cat "$evidence/a" "$evidence/b" | sed '/^$/d')" = 2
psql -X -v ON_ERROR_STOP=1 -f tests/sql/cloud_snapshot_recovery_assertions.sql
