package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ Could not load .env file. Continuing with OS environment variables...")
	}

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	log.Printf("Connecting to DB on host=%s port=%s user=%s db=%s...\n", host, port, user, dbname)

	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal("❌ Failed to open DB: ", err)
	}

	if err = db.Ping(); err != nil {
		log.Fatal("❌ DB not reachable: ", err)
	}

	log.Println("✅ Connected to PostgreSQL")
	DB = db
}

// host=localhost port=5433 user=tublai password=tublai dbname=order_db sslmode=disable
