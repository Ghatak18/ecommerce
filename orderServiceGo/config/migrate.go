package config

import (
	"log"
	"os"
)

func RunMigration(path string) {
	content, err := os.ReadFile(path)
	if err != nil {
		log.Fatal("Failed to read migration file: %v", err)
	}

	_, err = DB.Exec(string(content))
	if err != nil {
		log.Fatal("failed to migrate SQL: %v", err)
	}

	log.Println("SQL migrated")

}
