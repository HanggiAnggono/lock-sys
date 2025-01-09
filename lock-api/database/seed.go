package database

import (
	"fmt"
	"math/rand"

	faker "github.com/go-faker/faker/v4"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	"locksystem.com/lock-api/models"
)

func SeedKeys(db *gorm.DB) error {
	var keys []*models.Key
	for i := 0; i < 20; i++ {
		key := models.Key{
			Label:       fmt.Sprintf("KEY-%d", i),
			Description: faker.Sentence(),
		}
		keys = append(keys, &key)
	}
	return db.Create(&keys).Error
}

func SeedKeyCopies(db *gorm.DB, keys []*models.Key) error {
	var keyCopies []*models.KeyCopies
	for _, key := range keys {
		for j := 0; j < 10; j++ {
			keyId := fmt.Sprintf("COPY OF %s-%d", key.Label, j)
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
				MasterKeyID: key.ID,
				Status:      statuses[rand.Intn(len(statuses))],
				Description: faker.Sentence(),
			}
			keyCopies = append(keyCopies, &copy)
		}
	}
	err := db.Clauses(clause.OnConflict{DoNothing: true}).Create(&keyCopies).Error
	if err != nil {
		return fmt.Errorf("failed to seed key copies: %w", err)
	}
	return nil
}

func SeedStaff(db *gorm.DB) error {
	var staffs []*models.Staff
	for i := 0; i < 10; i++ {
		staff := models.Staff{
			Name:        faker.Name(),
			Description: faker.Sentence(),
		}
		staffs = append(staffs, &staff)
	}
	return db.Create(&staffs).Error
}

func TruncateAll(db *gorm.DB) error {
	return db.Exec("TRUNCATE TABLE keys, key_copies, staffs").Error
}

func Seed(db *gorm.DB) error {
	if err := TruncateAll(db); err != nil {
		return fmt.Errorf("failed to truncate tables: %w", err)
	}

	if err := SeedKeys(db); err != nil {
		return fmt.Errorf("failed to seed keys: %w", err)
	}
	keys := []*models.Key{}
	db.Find(&keys)
	if err := SeedKeyCopies(db, keys); err != nil {
		return fmt.Errorf("failed to seed key copies: %w", err)
	}
	if err := SeedStaff(db); err != nil {
		return fmt.Errorf("failed to seed staff: %w", err)
	}
	return nil
}
