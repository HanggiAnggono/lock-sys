package database

import (
	"fmt"
	"math/rand"

	faker "github.com/go-faker/faker/v4"
	"gorm.io/gorm/clause"
	"locksystem.com/lock-api/models"
)

func Seed() error {
	var keys []*models.Key
	var err error
	db := DB

	for i := 0; i < 20; i++ {
		key := models.Key{
			Label:       fmt.Sprintf("KEY-%d", i),
			Description: faker.Sentence(),
		}

		keys = append(keys, &key)

	}

	err = db.Create(&keys).Error

	if err != nil {
		return err
	}

	var keyCopies []*models.KeyCopies

	for i := 0; i < len(keys); i++ {
		for j := 0; j < 10; j++ {
			keyId := fmt.Sprintf("COPY OF %s-%d", keys[i].Label, j)
			statuses := []string{
				models.KeyCopyStatus.AVAILABLE,
				models.KeyCopyStatus.CHECKED_OUT,
				models.KeyCopyStatus.LOST,
				models.KeyCopyStatus.DAMAGED,
				models.KeyCopyStatus.STOLEN,
				models.KeyCopyStatus.RETIRED,
				models.KeyCopyStatus.DESTROYED,
			}

			copy := models.KeyCopies{
				KeyID:       keyId,
				MasterKeyID: keys[i].ID,
				Status:      statuses[rand.Intn(len(statuses))],
				Description: faker.Sentence(),
			}

			keyCopies = append(keyCopies, &copy)
		}

		err = db.Clauses(clause.OnConflict{
			DoNothing: true,
		}).Create(&keyCopies).Error

		if err != nil {
			return err
		}
	}

	return err
}
