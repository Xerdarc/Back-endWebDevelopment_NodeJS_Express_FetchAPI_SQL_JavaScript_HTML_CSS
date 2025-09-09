document.addEventListener("DOMContentLoaded", function () {
	const registerform = document.getElementById("registerform")
	const warningcard = document.getElementById("warningcard")
	const warningtext = document.getElementById("warningtext")

	registerform.addEventListener("submit", function (event) {
		event.preventDefault()

		const username = document.getElementById("username").value
		const password = document.getElementById("password").value
		const confirmpassword = document.getElementById("confirmpassword").value

		if (!username || !password || !confirmpassword) {
			warningcard.classList.remove("d-none")
			warningtext.innerText = `Please fill out all required fields.`
			return
		}

		if (password === confirmpassword) {
			warningcard.classList.add("d-none")
			const data = {
				username: username,
				password: password
			}
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
			fetchMethod(currenturl + `/api/register`, callback, "POST", data)
		}
		else {
			warningcard.classList.remove("d-none")
			warningtext.innerText = "Passwords do not match."
			return
		}
	})
})