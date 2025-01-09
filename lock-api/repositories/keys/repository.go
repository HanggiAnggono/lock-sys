package keys_repository

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"locksystem.com/lock-api/database"
	"locksystem.com/lock-api/models"
	"locksystem.com/lock-api/repositories/common"
)

func GetKeys(ctx *gin.Context) (common.Meta, error) {
	var keys []models.Key
	q := ctx.Query("q")
	meta, err := common.Paginated(keys, ctx, func(d *gorm.DB) *gorm.DB {
		return d.Where("label ILIKE ?", "%"+q+"%")
	})

	return meta, err
}

func GetKey(id string) (models.Key, error) {
	var key models.Key
	err := database.DB.Model(&models.Key{}).Preload("Copies").Find(&key, id).Error

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
	Label       string `json:"label"`
	Description string `json:"description"`
}

func UpdateKey(id string, data *UpdateKeyData) (models.Key, error) {
	key := models.Key{
		Label:       data.Label,
		Description: data.Description,
	}
	ID, _ := strconv.Atoi(id)
	key.ID = uint(ID)

	err := database.DB.Save(&key).Error

	return key, err
}

func DeleteKey(id string) error {
	err := database.DB.Delete(&models.Key{}, id).Error
	return err
}
