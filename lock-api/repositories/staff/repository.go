package staff

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"locksystem.com/lock-api/database"
	models "locksystem.com/lock-api/models"
	"locksystem.com/lock-api/repositories/common"
)

var validate = validator.New()

func GetAllStaff(ctx *gin.Context) (common.Meta, error) {
	var staffs []models.Staff
	var totalCount int64
	err := database.DB.Model(&models.Staff{}).Count(&totalCount).Error
	if err != nil {
		return common.Meta{}, err
	}

	q := ctx.Query("q")
	meta := common.PaginationMeta(totalCount, ctx)
	err = database.DB.Scopes(common.Paginate(ctx)).Where("name ILIKE ? OR description ILIKE ?", "%"+q+"%", "%"+q+"%").Find(&staffs).Error

	meta.Data = staffs

	return meta, err
}

func GetStaffByID(id string) (models.Staff, error) {
	var staff models.Staff
	err := database.DB.First(&staff, id).Error
	return staff, err
}

func CreateStaff(payload *CreateStaffPayload) (models.Staff, error) {
	staff := models.Staff{Name: payload.Name, Description: payload.Description}
	if err := validate.Struct(payload); err != nil {
		return staff, err
	}
	return staff, database.DB.Create(&staff).Error
}

func UpdateStaff(payload *UpdateStaffPayload) (models.Staff, error) {
	if err := validate.Struct(payload); err != nil {
		return models.Staff{}, err
	}
	staff := models.Staff{
		Name:        payload.Name,
		Description: payload.Description,
	}
	result := database.DB.Model(&models.Staff{}).Where("id = ?", payload.ID).Updates(staff)
	return staff, result.Error
}

func DeleteStaff(id string) error {
	return database.DB.Delete(&models.Staff{}, id).Error
}

type CreateStaffPayload struct {
	Name        string `json:"name" validate:"required"`
	Description string `json:"description"`
}

type UpdateStaffPayload struct {
	ID          uint   `json:"id" validate:"required"`
	Name        string `json:"name" validate:"required"`
	Description string `json:"description"`
}
