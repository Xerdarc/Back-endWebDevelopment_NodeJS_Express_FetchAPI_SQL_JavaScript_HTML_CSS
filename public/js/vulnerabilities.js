document.addEventListener("DOMContentLoaded", function () {
	const callback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)

		// ensure token is valid/exists
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `register.html`
			return
		}

		const vulnerabilities = document.getElementById("vulnerabilitieslist")
		if (resStatus == 404) {
			vulnerabilities.innerHTML = `<p class="text-secondary fs-3 text-center">${resData.message}</p>`
			return
		}

		resData.forEach((vulnerability) => {
			const displayitem = document.createElement("div")
			displayitem.innerHTML = `
				<div class="card my-4">
					<div class="card-body">
						<div class="card-title fs-4">${vulnerability.type}</div>
						<div class="card-subtitle text-secondary mb-3">ID: ${vulnerability.id}</div>
						<p class="card-text fs-5">${vulnerability.description}</p>
					</div
				</div>		
			`
			vulnerabilities.appendChild(displayitem)
		})
	}
	fetchMethod(currenturl + `/api/vulnerability`, callback, "GET", null, localStorage.getItem("token"))

	// post vulnerability codes
	const vulnerabilityform = document.getElementById("vulnerabilityform")

	const postvulcallback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)

		if (resStatus == 201) {
			vulnerabilityform.reset()
			alert("Vulnerability posted successfully.\nUser has earned 50 credits!")
			window.location.href = `vulnerabilities.html`
		}
		else {
			alert(resData.message)
			return
		}
	}

	vulnerabilityform.addEventListener("submit", function (event) {
		event.preventDefault()
		const warningcard = document.getElementById("warningcard")
		const warningtext = document.getElementById("warningtext")
		const type = document.getElementById("type").value
		const description = document.getElementById("description").value
		const points = document.getElementById("points").value

		// error-checking code
		if (!type || !description || points == undefined || points == "") {
			warningcard.classList.remove("d-none")
			warningtext.innerText = "Please make sure all fields are filled up."
			return
		}

		const data = {
			type: type,
			description: description,
			points: points
		}
		fetchMethod(currenturl + `/api/vulnerability/`, postvulcallback, "POST", data, localStorage.getItem("token"))
	})
})