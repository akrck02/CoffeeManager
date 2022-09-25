package main

import (
	"os"

	"github.com/akrck02/coffeeManagerApi/config"
	"github.com/akrck02/coffeeManagerApi/services"
	"github.com/akrck02/coffeeManagerApi/utils"
)

func main() {

	logger := utils.Logger
	configuration := config.LoadConfig()

	if configuration.SECRET == "" {
		logger.Error("Secret is not set, exiting...")
		os.Exit(1)
	}

	services.Start(configuration, logger)

}
