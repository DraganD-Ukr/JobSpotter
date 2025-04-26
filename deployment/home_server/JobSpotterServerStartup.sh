#!/bin/bash

echo"   ___       _       ___________     _   _              _   _  __    _____                          "
echo"  |_  |     | |     /  ___| ___ \   | | | |            | | | |/  |  /  ___|                         "
echo"    | | ___ | |__   \ `--.| |_/ /__ | |_| |_ ___ _ __  | | | |`| |  \ `--.  ___ _ ____   _____ _ __ "
echo"    | |/ _ \| '_ \   `--. \  __/ _ \| __| __/ _ \ '__| | | | | | |   `--. \/ _ \ '__\ \ / / _ \ '__|"
echo"/\__/ / (_) | |_) | /\__/ / | | (_) | |_| ||  __/ |    \ \_/ /_| |_ /\__/ /  __/ |   \ V /  __/ |   "
echo"\____/ \___/|_.__/  \____/\_|  \___/ \__|\__\___|_|     \___/ \___/ \____/ \___|_|    \_/ \___|_|   "
echo"                                                                                                    "
                                                                                                    

echo ""
echo "Welcome to JobSpotter Server Manager!"
echo "------------------------------------"

# Functions
start_support_services() {
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
  echo "Support services started."
}

start_spring_services() {
  echo "Starting Spring Boot services one by one with 10s delay..."
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
  echo "Spring Boot services started."
}

start_full_stack() {
  echo "Starting full JobSpotter stack..."
  start_support_services
  echo "Waiting extra 20 seconds before starting Spring services..."
  sleep 20
  start_spring_services
  echo "JobSpotter Server fully started."
}

update_docker_images() {
  echo "Starting to pull latest Docker images..."
  echo "------------------------------------"
  images=(
    postgres
    mongo
    redis/redis-stack
    confluentinc/cp-kafka
    confluentinc/cp-zookeeper
    quay.io/keycloak/keycloak
    grafana/grafana
    prom/prometheus
    openzipkin/zipkin
    jobspotter/config-server
    jobspotter/discovery
    jobspotter/gateway
    jobspotter/job-post
    jobspotter/notification
    jobspotter/report
    jobspotter/review
    jobspotter/user
  )
  for image in "${images[@]}"; do
    echo "Pulling latest image: $image"
    docker pull "$image:latest"
    echo "------------------------------------"
    sleep 2
  done
  echo "All images pulled successfully."
  echo "------------------------------------"
}
remove_old_images() {
  echo "Removing unused and dangling Docker images..."
  docker image prune -af
  echo "Old images removed."
  echo "------------------------------------"
}

# Menu Loop
while true; do
  echo ""
  echo "Menu:"
  echo "------------------------------------"
  echo "1) Start Support Services"
  echo "2) Start Spring Boot Services"
  echo "3) Start Everything (Full Stack)"
  echo "4) Update Docker Images"
  echo "5) Remove Old Docker Images"
  echo "6) Exit"
  echo "------------------------------------"
  read -p "Please enter your choice [1-6]: " choice
  echo ""

  case $choice in
    1)
      start_support_services
      ;;
    2)
      start_spring_services
      ;;
    3)
      start_full_stack
      ;;
    4)
      update_docker_images
      ;;
    5)
      remove_old_images
      ;;
    6)
      echo "Exiting JobSpotter Manager."
      exit 0
      ;;
    *)
      echo "Invalid option. Please choose 1-6."
      ;;
  esac

  echo "------------------------------------"
done