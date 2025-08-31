package routes

import (
	"go-gin-app/controllers"

	"github.com/gin-gonic/gin"
)

func OrderRoutes(r *gin.Engine) {
	orderGroup := r.Group("/orders")
	{
		orderGroup.GET("/", controllers.GetAllOrders)
		orderGroup.POST("/create", controllers.CreateOrder)
	}
}
