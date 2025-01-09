package staff_handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"locksystem.com/lock-api/models"
	staff "locksystem.com/lock-api/repositories/staff"
)

func GetStaff(ctx *gin.Context) {
	staffs, err := staff.GetAllStaff(ctx)

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": staffs})
}

func GetStaffById(ctx *gin.Context) {
	id := ctx.Param("id")
	staff, err := staff.GetStaffByID(id)

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": staff})
}

func CreateStaff(ctx *gin.Context) {
	var data staff.CreateStaffPayload
	fmt.Printf("Data: %+v\n", data)

	if err := ctx.BindJSON(&data); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
	}

	if err := models.Validate.Struct(&data); err != nil {
		errors := []string{}
		for _, validationErr := range err.(validator.ValidationErrors) {
			fmt.Printf("validationErr %v \n", validationErr)
			errors = append(errors, validationErr.Error())
		}

		ctx.AbortWithStatusJSON(http.StatusBadRequest, errors)
		return
	}

	staff, err := staff.CreateStaff(&data)

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": staff})
}

func UpdateStaff(ctx *gin.Context) {
	var data staff.UpdateStaffPayload
	fmt.Printf("Data: %+v\n", data)

	if err := ctx.BindJSON(&data); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
	}

	if err := models.Validate.Struct(&data); err != nil {
		errors := []string{}
		for _, validationErr := range err.(validator.ValidationErrors) {
			fmt.Printf("validationErr %v \n", validationErr)
			errors = append(errors, validationErr.Error())
		}

		ctx.AbortWithStatusJSON(http.StatusBadRequest, errors)
		return
	}

	staff, err := staff.UpdateStaff(&data)

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": staff})
}

func DeleteStaff(ctx *gin.Context) {
	id := ctx.Param("id")
	err := staff.DeleteStaff(id)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": "Staff deleted"})
}