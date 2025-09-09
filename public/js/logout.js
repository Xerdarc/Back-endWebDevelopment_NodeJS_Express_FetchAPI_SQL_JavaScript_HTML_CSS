document.addEventListener("DOMContentLoaded", function () {
	const logout = document.getElementById("logout")

	logout.addEventListener("click", function (event) {
		event.preventDefault()
		localStorage.removeItem("token")
		window.location.href = `index.html`
	})
})