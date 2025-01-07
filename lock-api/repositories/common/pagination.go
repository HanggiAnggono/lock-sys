package common

import (
	"math"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Paginate(c *gin.Context) func(*gorm.DB) *gorm.DB {
	return func(d *gorm.DB) *gorm.DB {
		page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
		pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

		if page == 0 {
			page = 1
		}

		offset := (page - 1) * pageSize
		return d.Offset(offset).Limit(pageSize)
	}
}

type Meta struct {
	Data        any   `json:"data"`
	CurrentPage int64 `json:"currentPage"`
	PageSize    int64 `json:"pageSize"`
	TotalItems  int64 `json:"totalItems"`
	TotalPage   int64 `json:"totalPage"`
}

func PaginationMeta(totalCount int64, ctx *gin.Context) Meta {
	pageSize, _ := strconv.ParseInt(ctx.DefaultQuery("pageSize", "10"), 10, 64)
	totalPage := int64(math.Ceil(float64(totalCount) / float64(pageSize)))
	currentPage, _ := strconv.ParseInt(ctx.DefaultQuery("page", "1"), 10, 64)

	meta := Meta{
		CurrentPage: currentPage,
		PageSize:    pageSize,
		TotalItems:  totalCount,
		TotalPage:   totalPage,
	}

	return meta
}
