package controllers

import (
	"go-gin-app/models"
	"go-gin-app/services"
	"go-gin-app/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllOrders(c *gin.Context) {
	orders, err := services.GetAllOrders()
	if err != nil {
		utils.RespondJSON(c, http.StatusInternalServerError, gin.H{"error": "failed to fetch orders"})
		return
	}
	utils.RespondJSON(c, http.StatusOK, orders)
}

func CreateOrder(c *gin.Context) {
	var Order models.Order

	if err := c.ShouldBindJSON(&Order); err != nil {
		utils.RespondJSON(c, 400, gin.H{
			"error": err.Error(),
		})
		return
	}

	err := services.CreateOrder(Order)
	if err != nil {
		utils.RespondJSON(c, http.StatusInternalServerError, gin.H{"error": "failed to create order"})
		return
	}

	utils.RespondJSON(c, http.StatusCreated, gin.H{"messege": "order Created"})
}
