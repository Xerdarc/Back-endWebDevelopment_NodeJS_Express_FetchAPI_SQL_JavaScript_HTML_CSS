document.addEventListener("DOMContentLoaded", function () {
	const loginform = document.getElementById("loginform")
	const warningcard = document.getElementById("warningcard")
	const warningtext = document.getElementById("warningtext")

	const callback = (resStatus, resData) => {
		if (resStatus == 200) {
			if (resData.token) {
				localStorage.setItem("token", resData.token)
				window.location.href = `profile.html`
			}
		}
		else {
			warningcard.classList.remove("d-none")
			warningtext.innerText = resData.message
			return
		}
	}

	loginform.addEventListener("submit", function (event) {
		event.preventDefault()

		const username = document.getElementById("username").value
		const password = document.getElementById("password").value
		const data = {
			username: username,
			password: password
		}
		fetchMethod(currenturl + `/api/login`, callback, "POST", data)
		loginform.reset()
	})
})