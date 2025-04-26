#!/bin/bash

# PostgreSQL details
POSTGRES_CONTAINER_NAME="postgres"   # your postgres container name
POSTGRES_USER="postgres"             # your postgres user
POSTGRES_PASSWORD="root"             # your postgres password

# MongoDB details
MONGO_CONTAINER_NAME="mongodb"
MONGO_USERNAME="admin"
MONGO_PASSWORD="admin"

# -----------------------------------------------
echo "Setting up PostgreSQL databases..."

# Run inside Postgres container
docker exec -e PGPASSWORD=$POSTGRES_PASSWORD $POSTGRES_CONTAINER_NAME psql -U $POSTGRES_USER -d postgres -c 'CREATE DATABASE "job-post";'
docker exec -e PGPASSWORD=$POSTGRES_PASSWORD $POSTGRES_CONTAINER_NAME psql -U $POSTGRES_USER -d postgres -c 'CREATE DATABASE "review";'
docker exec -e PGPASSWORD=$POSTGRES_PASSWORD $POSTGRES_CONTAINER_NAME psql -U $POSTGRES_USER -d postgres -c 'CREATE DATABASE "user";'

echo "PostgreSQL databases created!"

# -----------------------------------------------
echo "Setting up MongoDB collections..."

docker exec $MONGO_CONTAINER_NAME mongosh --username $MONGO_USERNAME --password $MONGO_PASSWORD --authenticationDatabase admin --eval "
use notification;
db.createCollection('notifications');
"

echo "MongoDB databases and collections created!"
