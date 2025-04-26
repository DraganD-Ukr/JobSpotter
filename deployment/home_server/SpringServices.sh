#!/bin/bash

services=(
  config-server
  discovery
  gateway
  job-post
  notification
  report
  review
  user
)

for service in "${services[@]}"; do
  echo "Starting service: $service"
  docker compose up -d "$service"
  echo "Waiting 10 seconds before starting next service..."
  sleep 10
done

echo "All Spring Boot services started"
