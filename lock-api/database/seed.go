package database

import (
	"fmt"

	"locksystem.com/lock-api/models"
)

func Seed() error {
	var keys []models.Key
	db := DB

	for i := 0; i < 10; i++ {
		keys = append(keys, models.Key{Label: fmt.Sprintf("KEY-%d", i)})
	}

	err := db.Create(&keys).Error

	if err != nil {
		return err
	}

	var keyCopies []models.KeyCopies

	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			keyId := fmt.Sprintf("COPY OF %s-%d", keys[i].Label, j)
			keyCopies = append(keyCopies, models.KeyCopies{KeyID: keyId, MasterKeyID: keys[i].ID})
		}
	}

	err = db.Create(&keyCopies).Error

	return err
}
