package main

import (
	"go-gin-app/config"
	"go-gin-app/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	config.InitDB()
	config.RunMigration("migrations/init.sql")
	routes.OrderRoutes(r)

	// r.GET("/", func(ctx *gin.Context) {
	// 	ctx.JSON(200, gin.H{
	// 		"messege": "Hellow",
	// 	})
	// })
	r.Run(":8000")
}
