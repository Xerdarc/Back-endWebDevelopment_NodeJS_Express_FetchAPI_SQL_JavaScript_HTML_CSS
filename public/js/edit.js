document.addEventListener("DOMContentLoaded", function () {
	// display single user info
	const callback = (resStatus, resData) => {
		// ensure token is valid/exists
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `register.html`
			return
		}

		console.log(resStatus)
		console.log(resData)

		const currentusername = document.getElementById("currentusername")
		currentusername.innerHTML = `${resData.username}`
	}
	fetchMethod(currenturl + `/api/user`, callback, "GET", null, localStorage.getItem("token")) // pass all the expected arguments

	// edit user
	const editform = document.getElementById("editform")
	editform.addEventListener("submit", function (event) {
		event.preventDefault()
		const callback = (resStatus, resData) => {
			// ensure token is valid/exists
			if (resStatus == 401) {
				localStorage.removeItem("token")
				window.location.href = `register.html`
				return
			}

			if (resStatus == 204) {
				window.alert("Username changed successfully.") // confirmation message in the alert pop up
				window.location.href = `profile.html` // redirects back to profile page to see changes
			}
			else {
				warningcard.classList.remove("d-none")
				warningtext.innerText = resData.message
				return
			}
		}

		const edit = document.getElementById("edit").value
		const data = {
			username: edit
		}
		fetchMethod(currenturl + `/api/user`, callback, "PUT", data, localStorage.getItem("token"))
	})
})