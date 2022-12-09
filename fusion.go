// todo.go
package main

import (
	"github.com/antsce/roadAnomaly/handlers"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {

	// Create a new instance of Echo
	e := echo.New()

	e.File("/map", "public/map.html")

	e.Use(middleware.Static("./static"))

	e.Static("/static", ".jqw")

	e.GET("/Anomaly", handlers.GetAnomalyRecords())

	// Start as a web server
	e.Start(":8080")
}
