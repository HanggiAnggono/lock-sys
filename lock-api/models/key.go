package models

import (
	"gorm.io/gorm"
)

type Key struct {
	gorm.Model
	Label string `json:"label"`
	Copies []KeyCopies `gorm:"foreignKey:MasterKeyID"`
}
