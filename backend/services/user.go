package services

import (
	"database/sql"
	"net/http"

	"github.com/akrck02/coffeeManagerApi/data"
	"github.com/akrck02/coffeeManagerApi/interfaces"

	"github.com/gin-gonic/gin"
	"github.com/withmandala/go-log"
)

/*
  Login into the system
*/
func Login(c *gin.Context, db *sql.DB, logger *log.Logger) {

	var params interfaces.LoginParams
	err := c.ShouldBindJSON(&params)

	if err == nil {

		if params.Username == "" || params.Password == "" || params.Device == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing parameters"})
			return
		}

		data.Login(params, db, logger)

		c.IndentedJSON(http.StatusOK, pingResponse{Message: "logged in"})
		return
	}

	c.IndentedJSON(http.StatusBadRequest, pingResponse{Message: "Incorrect parameters"})
}

/*

 */
func Register(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, pingResponse{Message: "pong"})
}
