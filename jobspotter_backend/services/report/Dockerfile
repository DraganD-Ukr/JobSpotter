# Build stage
FROM maven:3.9.9-amazoncorretto-21 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests


# Runtime stage
FROM amazoncorretto:21
ARG PROFILE=docker

ENV ACTIVE_PROFILE=${PROFILE}

WORKDIR /app
COPY --from=build /build/target/report-service-*.jar /app/

EXPOSE 8084

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE}  report-service-*.jar
