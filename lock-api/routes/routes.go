package routes

import (
	"github.com/gin-gonic/gin"
	"locksystem.com/lock-api/handlers/keys_handlers"
)

func SetupRoutes(r *gin.Engine) {
	apiV1 := r.Group("/api/v1")

	{
		apiV1.GET("/keys/:id", keys_handlers.GetKey)
		apiV1.GET("/keys", keys_handlers.GetKeys)
		apiV1.POST("/keys", keys_handlers.CreateKey)
		apiV1.PUT("/keys/:id", keys_handlers.UpdateKey)
		apiV1.DELETE("/keys/:id", keys_handlers.DeleteKey)
	}
}
