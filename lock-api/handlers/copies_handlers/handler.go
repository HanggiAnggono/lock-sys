package copies_handlers

import (
	"fmt"
	"log"
	"net/http"

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
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": copies})
}

func GetKeyCopy(ctx *gin.Context) {
	var masterKeyId = ctx.Param("id")
	copy, err := keycopies.GetKeyCopy(masterKeyId)

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": copy})
}

func CreateKeyCopy(ctx *gin.Context) {
	var data keycopies.CreateKeyCopiesData
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

	copy, err := keycopies.CreateKeyCopies(&data)

	if err != nil {
		ctx.AbortWithStatusJSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": copy})
}

func DeleteCopy(ctx *gin.Context) {
	err := keycopies.DeleteKeyCopies(ctx.Param("id"))

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": "Key deleted"})
}
