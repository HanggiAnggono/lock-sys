package keys_repository

import (
	"github.com/gin-gonic/gin"
	"locksystem.com/lock-api/database"
	"locksystem.com/lock-api/models"
	"locksystem.com/lock-api/repositories/common"
)

func GetKeys(ctx *gin.Context) (common.Meta, error) {
	var keys []models.Key
	var totalCount int64
	err := database.DB.Model(&models.Key{}).Count(&totalCount).Error
	if err != nil {
		return common.Meta{}, err
	}

	q := ctx.Query("q")
	meta := common.PaginationMeta(totalCount, ctx)
	err = database.DB.Scopes(common.Paginate(ctx)).Where("label ILIKE ?", "%"+q+"%").Find(&keys).Error

	meta.Data = keys

	return meta, err
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
