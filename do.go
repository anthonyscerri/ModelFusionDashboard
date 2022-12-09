// todo.go
package main

import (

	"database/sql"
        _ "github.com/mattn/go-sqlite3"
        "fmt"
	"log"

)



type coords struct {
        lat     string
        long    string
}

type features struct {
        id      string `json:"id"`
        name      string `json:"name"`
        active      string `json:"active"`
        coord      []coords `json:"coords"`
}


type layers struct {
        id      string `json:"id"`
        name      string `json:"name"`
        active      string `json:"active"`
        features      []features `json:"features"`
}

func main() {
    db,err := sql.Open("sqlite3", "./models/reporting.db")

    record, err := db.Query("SELECT lat,long FROM anomalies")

    if err != nil {
        log.Fatal(err)
    }
    defer record.Close()

    for record.Next() {
        fmt.Printf("1")
}
}
