FROM maven:3.8.5-openjdk-17-slim AS build

WORKDIR /app

COPY settings.xml /root/.m2/
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn package -DskipTests spring-boot:repackage

FROM openjdk:17-slim-bullseye

WORKDIR /app

COPY --from=build /app/target/be-parking-pos-*.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
