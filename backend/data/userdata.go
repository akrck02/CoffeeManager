package data

import (
	"database/sql"

	"github.com/akrck02/coffeeManagerApi/interfaces"
	"github.com/withmandala/go-log"
)

func Login(params interfaces.LoginParams, db *sql.DB, logger *log.Logger) map[string]string {
	const SQL_QUERY = "SELECT username, password, auth FROM user WHERE username=? and password=?"

	//Execute the statement
	rows, err := db.Query(SQL_QUERY, params.Username, params.Password)
	if err != nil {
		panic(err)
	}

	if rows.Next() {

		m := make(map[string]string)

		var username string
		var password string
		var auth string

		err := rows.Scan(&username, &password, &auth)
		m["username"] = username
		m["auth"] = auth

		//Close the rows
		defer rows.Close()
		if err != nil {
			panic(err)
		}

		return m
	}

	//Close the rows
	defer rows.Close()
	return nil
}

func Register(params interfaces.LoginParams) {

}
