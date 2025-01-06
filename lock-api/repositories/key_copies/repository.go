package keycopies

import (
	"locksystem.com/lock-api/database"
	"locksystem.com/lock-api/models"
)

func GetKeyCopies(id string) ([]models.KeyCopies, error) {
	var keyCopies []models.KeyCopies
	err := database.DB.Find(&keyCopies, "master_key_id = ?", id).Error
	return keyCopies, err
}

type CreateKeyCopiesData struct {
	KeyID       string `json:"key_id" validate:"required"`
	MasterKeyID uint   `json:"master_key_id" validate:"required"`
}

func CreateKeyCopies(data *CreateKeyCopiesData) (models.KeyCopies, error) {
	var keyCopies models.KeyCopies = models.KeyCopies{
		KeyID:       data.KeyID,
		MasterKeyID: data.MasterKeyID,
	}

	err := database.DB.Create(&keyCopies).Error
	return keyCopies, err
}

type UpdateKeyCopiesData struct {
	KeyID string `json:"key_id"`
}

func UpdateKeyCopies(id string, data *UpdateKeyCopiesData) (models.KeyCopies, error) {
	var keyCopies models.KeyCopies = models.KeyCopies{
		KeyID: data.KeyID,
	}
	err := database.DB.Model(&models.KeyCopies{}).Where("id = ?", id).Updates(&keyCopies).Error
	return keyCopies, err
}

func DeleteKeyCopies(id string) error {
	err := database.DB.Delete(&models.KeyCopies{}, id).Error
	return err
}
