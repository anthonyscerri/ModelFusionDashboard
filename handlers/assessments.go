package handlers

import (
	"github.com/antsce/roadAnomaly/models"
	"net/http"
	"github.com/labstack/echo"
)

type H map[string]interface{}

// GetTasks endpoint

func GetAnomalyRecords() echo.HandlerFunc {
	return func(c echo.Context) error {

		return c.JSON(http.StatusOK, models.GetAnomaly())
	}
}
