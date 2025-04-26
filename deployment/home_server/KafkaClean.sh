#!/bin/bash
docker compose down kafka zookeeper
echo " Cleaning up old Kafka ..."
docker rm -f kafka 

echo "Cleaning up old Kafka and ..."
docker volume rm $(docker volume ls -qf "name=kafka") || true

echo "Cleaning up old Kafka and Zookeeper networks..."
docker network prune -f

echo " Starting fresh zookeeper..."
docker compose up -d zookeeper

sleep 5

echo "Starting fresh kafka..."
docker compose up -d kafka
  
