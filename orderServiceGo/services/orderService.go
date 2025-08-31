package services

import (
	"go-gin-app/config"
	"go-gin-app/models"
	"log"
)

var orders = []models.Order{}
var currentId = 1

func CreateOrder(o models.Order) error {
	// o.Id = currentId
	// currentId++
	// o.ProductId = "200"
	// o.UserId = "100"
	// o.Amount = 70.0

	// orders = append(orders, o)
	// return o
	query := `INSERT INTO orders(userid,productid,quantity,totalamount) VALUES ($1, $2, $3, $4)`
	_, err := config.DB.Exec(query, o.UserId, o.ProductId, o.Quantity, o.Amount)

	if err != nil {
		log.Println("failed to insert order:", err)
		return err
	}
	return nil
}

func GetAllOrders() ([]models.Order, error) {
	rows, err := config.DB.Query("SELECT id, userid,productid,quantity,totalamount FROM orders")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var orders []models.Order

	for rows.Next() {
		var o models.Order
		err := rows.Scan(&o.Id, &o.UserId, &o.ProductId, &o.Quantity, &o.Amount)
		if err != nil {
			log.Println("Failed to scan row", err)
			continue
		}
		orders = append(orders, o)
	}
	return orders, nil
}
