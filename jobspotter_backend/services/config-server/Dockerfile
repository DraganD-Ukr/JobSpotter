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
COPY --from=build /build/target/config-server-*.jar /app/

EXPOSE 8888

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE}  config-server-*.jar
