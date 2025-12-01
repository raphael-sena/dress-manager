# Usar a imagem oficial do Maven para buildar o projeto
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copiar o diretório .mvn, settings.xml e o pom.xml para o contêiner
COPY ./dressmanager/.mvn/ .mvn/
COPY ./dressmanager/pom.xml .

# Rodar o download das dependências antes de copiar o restante dos arquivos
RUN mvn dependency:go-offline

# Copiar o restante dos arquivos do projeto
COPY ./dressmanager/src ./src

# Compilar o projeto
RUN mvn clean package -DskipTests

# Usar a imagem oficial do OpenJDK para rodar a aplicação
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar o JAR gerado pelo Maven
COPY --from=build /app/target/dressmanager-0.0.1-SNAPSHOT.jar ./app.jar

# Expor a porta 8080 para o Spring Boot
EXPOSE 8080

# Rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]