package services

import (
	"crypto/md5"
	"encoding/hex"
)

func oneWayEncrypt(text string) string {
	hash := md5.Sum([]byte(text))
	return hex.EncodeToString(hash[:])
}
