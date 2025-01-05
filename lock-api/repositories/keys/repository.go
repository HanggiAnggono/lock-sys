package keys_repository

import (
	"locksystem.com/lock-api/database"
	"locksystem.com/lock-api/models"
)

func GetKeys() ([]models.Key, error) {
	var keys []models.Key
	err := database.DB.Find(&keys).Error
	return keys, err
}

func GetKey(id string) (models.Key, error) {
	var key models.Key
	err := database.DB.Find(&key, id).Error
	return key, err
}

type CreateKeyData struct {
	Label string `json:"label"`
}

func CreateKey(data *CreateKeyData) (models.Key, error) {
	var key models.Key = models.Key{Label: data.Label}
	err := database.DB.Create(&key).Error
	return key, err
}

type UpdateKeyData struct {
	Label string `json:"label"`
}

func UpdateKey(id string, data *UpdateKeyData) (models.Key, error) {
	var key models.Key = models.Key{
		Label: data.Label,
	}

	err := database.DB.Model(&models.Key{}).Where("id = ?", id).Updates(&key).Error

	return key, err
}

func DeleteKey(id string) error {
	err := database.DB.Delete(&models.Key{}, id).Error
	return err
}