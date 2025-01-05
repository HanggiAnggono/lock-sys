package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	db "locksystem.com/lock-api/database"
	"locksystem.com/lock-api/routes"
)

func main() {
	err := godotenv.Load()
	db.ConnectDB()
	db.Migrate(db.DB)

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := gin.Default()
	routes.SetupRoutes(r)

	r.Run()
}
