package copies_handlers

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"locksystem.com/lock-api/models"
	keycopies "locksystem.com/lock-api/repositories/key_copies"
)

func GetKeyCopies(ctx *gin.Context) {
	var masterKeyId = ctx.Param("id")
	copies, err := keycopies.GetKeyCopies(masterKeyId)
	log.Println(copies)

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": copies})
}

func CreateKeyCopy(ctx *gin.Context) {
	var data keycopies.CreateKeyCopiesData

	if err := ctx.BindJSON(&data); err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
	}

	if err := models.Validate.Struct(&data); err != nil {
		errors := make(map[string]string)
		for _, validationErr := range err.(validator.ValidationErrors) {
			errors[validationErr.Field()] = validationErr.Error()
		}

		ctx.JSON(400, gin.H{"error": errors})
		return
	}

	copy, err := keycopies.CreateKeyCopies(&data)

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": copy})
}
