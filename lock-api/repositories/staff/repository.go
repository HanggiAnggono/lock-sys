package staff

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
	"locksystem.com/lock-api/database"
	models "locksystem.com/lock-api/models"
	"locksystem.com/lock-api/repositories/common"
)

var validate = validator.New()

func GetAllStaff(ctx *gin.Context) (common.Meta, error) {
	var staffs []models.Staff
	q := ctx.Query("q")
	meta, err := common.Paginated(staffs, ctx, func(d *gorm.DB) *gorm.DB {
		return d.Where("name ILIKE ? OR description ILIKE ?", "%"+q+"%", "%"+q+"%")
	})

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
