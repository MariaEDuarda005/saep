# Use the official Maven image as a base image
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Build the application, skipping tests
RUN mvn clean install -DskipTests=true

# Use the official OpenJDK image as a base image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Azure Pipeline Library arguments
ARG APPLICATION_PROFILE
ARG DATABASE_HOST
ARG DATABASE_NAME
ARG DATABASE_USER
ARG DATABASE_PASSWORD

# Set environment variables
ENV APPLICATION_PROFILE=$APPLICATION_PROFILE
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD

# Copy the JAR file from the build stage to the current stage
COPY --from=build /app/target/kanban-0.0.1-SNAPSHOT.jar .

# Copy and replace environment variables in configuration files
COPY src/main/resources/application.properties /app/application.properties

# Replace variables in application.properties
RUN sed -i "s/\${APPLICATION_PROFILE.*}/${APPLICATION_PROFILE}/g" /app/application.properties

# Copy and replace application-dev.properties with environment variables
COPY src/main/resources/application-${APPLICATION_PROFILE}.properties /app/application-${APPLICATION_PROFILE}.properties
RUN sed -i "s/\${DATABASE_HOST}/${DATABASE_HOST}/g" /app/application-${APPLICATION_PROFILE}.properties && \
    sed -i "s/\${DATABASE_NAME}/${DATABASE_NAME}/g" /app/application-${APPLICATION_PROFILE}.properties && \
    sed -i "s/\${DATABASE_USER}/${DATABASE_USER}/g" /app/application-${APPLICATION_PROFILE}.properties && \
    sed -i "s/\${DATABASE_PASSWORD}/${DATABASE_PASSWORD}/g" /app/application-${APPLICATION_PROFILE}.properties

# Expose the application port
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "kanban-0.0.1-SNAPSHOT.jar"]