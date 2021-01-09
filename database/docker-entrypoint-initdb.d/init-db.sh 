#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER beenmapapi;
    CREATE DATABASE beenmap;
    GRANT ALL PRIVILEGES ON DATABASE beenmap TO beenmapapi;
EOSQL