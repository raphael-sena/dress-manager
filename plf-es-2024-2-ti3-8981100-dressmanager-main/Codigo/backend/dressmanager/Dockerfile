FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y \
    && apt-get install maven -y

WORKDIR /app

COPY . .

RUN mvn clean install -DskipTests

FROM openjdk:17-jdk-slim

EXPOSE 8080

COPY --from=build /app/target/dressmanager-backend.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]