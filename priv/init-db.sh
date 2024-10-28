#!/bin/bash
set -e

# Run the standard entrypoint setup from Postgres
export PGPASSWORD="postgres"

psql -v ON_ERROR_STOP=1 --username "$POSTGRESQL_USERNAME" <<-EOSQL
    CREATE DATABASE plotwist_dev;
    CREATE DATABASE plotwist_test;
EOSQL