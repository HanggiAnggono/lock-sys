package models

import "gorm.io/gorm"

type KeyCopies struct {
	gorm.Model
	KeyID string `json:"key_id"`
	MasterKeyID uint `json:"master_key_id"`
}