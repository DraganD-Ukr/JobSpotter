#!/bin/bash

echo "Starting support services one by one with 10s delay..."

services=(
  postgresql
  mongodb
  zookeeper
  keycloak-db
  keycloak
  redis
  zipkin
  prometheus
  grafana
  kafka
)

for service in "${services[@]}"; do
  echo "Starting service: $service"
  docker compose up -d "$service"
  echo "Waiting 10 seconds before starting next service..."
  sleep 10
done

echo "All support services started!"
