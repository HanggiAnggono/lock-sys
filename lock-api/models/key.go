package models

import (
	"gorm.io/gorm"
)

type Key struct {
	gorm.Model
	Label string `json:"label"`
	Description string `json:"description"`
	Copies []KeyCopies `json:"copies" gorm:"foreignKey:MasterKeyID"`
}
