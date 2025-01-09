package routes

import (
	"github.com/gin-gonic/gin"
	"locksystem.com/lock-api/database"
	"locksystem.com/lock-api/handlers/copies_handlers"
	"locksystem.com/lock-api/handlers/keys_handlers"
	"locksystem.com/lock-api/handlers/staff_handlers"
)

func SetupRoutes(r *gin.Engine) {
	apiV1 := r.Group("/api/v1")

	{
		apiV1.GET("/seeds", func(ctx *gin.Context) {
			err := database.Seed(database.DB)

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
		apiV1.GET("/copies/:id", copies_handlers.GetKeyCopy)
		apiV1.DELETE("/copies/:id", copies_handlers.DeleteCopy)
		apiV1.POST("/copies", copies_handlers.CreateKeyCopy)

		apiV1.GET("/staffs/:id", staff_handlers.GetStaffById)
		apiV1.GET("/staffs", staff_handlers.GetStaff)
		apiV1.POST("/staffs", staff_handlers.CreateStaff)
		apiV1.PUT("/staffs/:id", staff_handlers.UpdateStaff)
		apiV1.DELETE("/staffs/:id", staff_handlers.DeleteStaff)
	}
}
