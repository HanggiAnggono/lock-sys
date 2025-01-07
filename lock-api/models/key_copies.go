package models

import "gorm.io/gorm"

type KeyCopies struct {
	gorm.Model
	KeyID       string `json:"key_id"`
	MasterKeyID uint   `json:"master_key_id"`
	MasterKey   Key
	Status      string `json:"status"`
	Description string `json:"description"`
}

type CopyStatus struct {
	AVAILABLE   string
	CHECKED_OUT string
	LOST        string
	DAMAGED     string
	STOLEN      string
	RETIRED     string
	DESTROYED   string
}

var KeyCopyStatus = CopyStatus{
	AVAILABLE:   "AVAILABLE",
	CHECKED_OUT: "CHECKED_OUT",
	LOST:        "LOST",
	DAMAGED:     "DAMAGED",
	STOLEN:      "STOLEN",
	RETIRED:     "RETIRED",
	DESTROYED:   "DESTROYED",
}
