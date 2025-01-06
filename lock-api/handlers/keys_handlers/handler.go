package keys_handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	keys_repository "locksystem.com/lock-api/repositories/keys"
)

func GetKeys(ctx *gin.Context) {
	keys, err := keys_repository.GetKeys()

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": keys})
}

func GetKey(ctx *gin.Context) {
	key, err := keys_repository.GetKey(ctx.Param("id"))

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": key})
}

func CreateKey(ctx *gin.Context) {
	var data keys_repository.CreateKeyData
	ctx.BindJSON(&data)
	key, err := keys_repository.CreateKey(&data)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": key})
}

func UpdateKey(ctx *gin.Context) {
	var data keys_repository.UpdateKeyData
	ctx.BindJSON(&data)
	key, err := keys_repository.UpdateKey(ctx.Param("id"), &data)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": key})
}

func DeleteKey(ctx *gin.Context) {
	err := keys_repository.DeleteKey(ctx.Param("id"))

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, gin.H{"data": "Key deleted"})
}
