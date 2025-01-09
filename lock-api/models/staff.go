package models

import "gorm.io/gorm"

type Staff struct {
	gorm.Model
	Name        string `gorm:"not null" json:"name"`
	Description string `gorm:"type:text" json:"description"`
}