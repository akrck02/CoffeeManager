package interfaces

type LoginParams struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Device   string `json:"device"`
}
