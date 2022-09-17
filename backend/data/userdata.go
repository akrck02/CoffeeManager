package data

import (
	"database/sql"

	"github.com/akrck02/coffeeManagerApi/interfaces"
	"github.com/withmandala/go-log"
)

func Login(params interfaces.LoginParams, db *sql.DB, logger *log.Logger) {
	const SQL_QUERY = "SELECT username, password, auth FROM user WHERE username=? and password=?"

	//Get a prepared statement
	stmt, err := db.Prepare(SQL_QUERY)
	if err != nil {
		panic(err)
	}

	//Execute the statement
	rows, err := stmt.Query(params.Username, params.Password)
	if err != nil {
		panic(err)
	}

	//Close the rows
	defer rows.Close()
	for rows.Next() {
		var username string
		var password string
		var auth string
		err := rows.Scan(&username, &password, &auth)
		if err != nil {
			panic(err)
		}
	}

}

func Register(params interfaces.LoginParams) {

}
