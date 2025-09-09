document.addEventListener("DOMContentLoaded", function () {
	const login = document.getElementById("login")
	const register = document.getElementById("register")

	const token = localStorage.getItem("token")
	if (token) {
		login.classList.remove("d-none") // removes the p element if token is present
	}
	else {
		register.classList.remove("d-none")
	}
})