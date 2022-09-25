package services

import (
	"database/sql"

	"github.com/akrck02/coffeeManagerApi/config"
	"github.com/akrck02/coffeeManagerApi/data"
	"github.com/gin-gonic/gin"
	"github.com/withmandala/go-log"
)

const API_PATH = "api"
const VERSION = "v1"
const API_COMPLETE = "/" + API_PATH + "/" + VERSION + "/"

func Start(configuration config.Config, logger *log.Logger) {
	router := gin.Default()

	db := data.GetConnection(configuration.DB)
	logger.Info("Connected to database " + configuration.DB)

	router.Use(CORSMiddleware())

	router.GET(API_COMPLETE+"ping/", Ping)
	router.POST(API_COMPLETE+"login/", route(Login, db, logger))

	logger.Info("Server started on " + configuration.HOST + ":" + configuration.PORT)
	router.Run(configuration.HOST + ":" + configuration.PORT)
	defer db.Close()
}

func route(function func(c *gin.Context, db *sql.DB, logger *log.Logger), db *sql.DB, logger *log.Logger) func(c *gin.Context) {

	return func(c *gin.Context) {
		function(c, db, logger)
	}

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
