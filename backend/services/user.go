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

		params.Device = c.ClientIP()

		if params.Username == "" || params.Password == "" || params.Device == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing parameters"})
			return
		}

		params.Password = oneWayEncrypt(params.Password)

		// Check login or end request with error
		userDbData := data.Login(params, db, logger)
		if userDbData == nil {

			error := make(map[string]string)
			error["message"] = "invalid credentials"
			c.JSON(http.StatusForbidden, error)
			return
		}

		c.JSON(http.StatusOK, userDbData)
		return

		//Search device on database
		//const device = getDevice(userDbData["auth"],params.Device)

		/* if exists update with new token
		if device != nil {

			updateDeviceToken(device, token)

		} else { // else create a new device and token

			createDeviceWithToken(params.Username, params.Password, params.Username, token)
		}*/

	}

	c.IndentedJSON(http.StatusBadRequest, pingResponse{Message: "Incorrect parameters"})
}

/*

 */
func Register(c *gin.Context) {

	// params.Password = oneWayEncrypt(params.Password)
	c.IndentedJSON(http.StatusOK, pingResponse{Message: "pong"})
}
