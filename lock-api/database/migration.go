package database

import (
	"gorm.io/gorm"
	"locksystem.com/lock-api/models"
)

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&models.Key{}, &models.KeyCopies{}, &models.Staff{})
}
