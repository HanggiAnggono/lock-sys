package routes

import (
	"github.com/gin-gonic/gin"
	"locksystem.com/lock-api/database"
	"locksystem.com/lock-api/handlers/copies_handlers"
	"locksystem.com/lock-api/handlers/keys_handlers"
)

func SetupRoutes(r *gin.Engine) {
	apiV1 := r.Group("/api/v1")

	{
		apiV1.GET("/seeds", func(ctx *gin.Context) {
			err := database.Seed()

			if err != nil {
				ctx.JSON(500, gin.H{"error": err.Error()})
			}

			ctx.JSON(200, gin.H{"data": "Seeds created"})
		})

		apiV1.GET("/keys/:id", keys_handlers.GetKey)
		apiV1.GET("/keys", keys_handlers.GetKeys)
		apiV1.POST("/keys", keys_handlers.CreateKey)
		apiV1.PUT("/keys/:id", keys_handlers.UpdateKey)
		apiV1.DELETE("/keys/:id", keys_handlers.DeleteKey)

		apiV1.GET("/keys/:id/copies", copies_handlers.GetKeyCopies)
		apiV1.POST("/copies", copies_handlers.CreateKeyCopy)
	}
}
