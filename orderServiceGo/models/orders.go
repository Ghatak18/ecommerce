package models

type Order struct {
	Id        int     `json:"id"`
	UserId    string  `json:"userid"`
	ProductId string  `json:"productid"`
	Quantity  int     `json:"quantity"`
	Amount    float32 `json:"amount"`
}
