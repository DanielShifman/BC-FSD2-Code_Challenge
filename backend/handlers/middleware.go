package handlers

import (
	"github.com/gorilla/sessions"
	"net/http"
	global "paintApp/glob"
)

var store *sessions.CookieStore

// AuthPreflightHandler handles preflight requests for the signin and signout routes
// This is necessary to allow the front end to send requests to the back end
// without the browser blocking them due to CORS policy
func AuthPreflightHandler(w http.ResponseWriter, r *http.Request) {
	// Allow CORS for the front end regardless of the origin for simplicity
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))

	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.WriteHeader(http.StatusNoContent)
	return
}

// InventoryPreflightHandler handles preflight requests for the inventory and data routes
// This is necessary to allow the front end to send requests to the back end
// without the browser blocking them due to CORS policy
func InventoryPreflightHandler(w http.ResponseWriter, r *http.Request) {
	// Allow CORS for the front end regardless of the origin for simplicity
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))

	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.WriteHeader(http.StatusNoContent)
	return
}

// AdminPreflightHandler handles preflight requests for the admin route
// This is necessary to allow the front end to send requests to the back end
// without the browser blocking them due to CORS policy
func AdminPreflightHandler(w http.ResponseWriter, r *http.Request) {
	// Allow CORS for the front end regardless of the origin for simplicity
	w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))

	w.Header().Set("Access-Control-Allow-Methods", "GET, PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.WriteHeader(http.StatusNoContent)
	return
}

func InitSessionStore() {
	store = sessions.NewCookieStore([]byte(global.SessionSecret))
}
