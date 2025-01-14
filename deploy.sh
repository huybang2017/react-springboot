#!/bin/bash

# Variables
REACT_APP_PATH="/root/Projects/Project-freelance-001/FrontEnd"
DEPLOY_PATH="/var/www/html"
SPRING_BOOT_PATH="/root/Projects/Project-freelance-001/BackEnd"
SPRING_BOOT_JAR="$SPRING_BOOT_PATH/target/BackEnd-0.0.1-SNAPSHOT.jar"
SPRING_BOOT_DEPLOY_PATH="/var/www/springboot-app"  # New deployment path for Spring Boot JAR

# Stop previous PM2 processes
echo "Pulling latest changes from git..."
# git pull --rebase
git pull origin main
pm2 stop all

# Step 1: Build React App
echo "Building React app..."
cd "$REACT_APP_PATH" || exit
npm install  # Install dependencies
npm run build  # Build the React app

# Step 2: Move React build to /var/www/html
echo "Moving React build to $DEPLOY_PATH..."
sudo rm -rf "$DEPLOY_PATH"/*  # Remove old files in the deployment folder
sudo cp -r "$REACT_APP_PATH"/dist/* "$DEPLOY_PATH"/  # Copy new build files

# Step 3: Build Spring Boot App
echo "Building Spring Boot app..."
cd "$SPRING_BOOT_PATH" || exit
mvn clean package -DskipTests  # Build the Spring Boot app

# Step 4: Move Spring Boot JAR to deployment path
echo "Moving Spring Boot JAR to $SPRING_BOOT_DEPLOY_PATH..."
sudo mkdir -p "$SPRING_BOOT_DEPLOY_PATH"
sudo cp "$SPRING_BOOT_JAR" "$SPRING_BOOT_DEPLOY_PATH/"  # Copy the JAR to the deployment path

# Step 5: Start Spring Boot App with PM2
echo "Starting Spring Boot app..."
pm2 start "$SPRING_BOOT_DEPLOY_PATH/BackEnd-0.0.1-SNAPSHOT.jar" --name "springboot-app" --interpreter java --interpreter-args "-jar"

# Step 6: Save the PM2 processes
pm2 save

# Step 7: Set PM2 to start on boot
pm2 startup

echo "Deployment complete!"

