document.addEventListener("DOMContentLoaded", function () {
	// show all vulnerability ID in the select menu
	const callback = (resStatus, resData) => {
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `index.html`
			return
		}

		const vulnerabilityoptions = document.getElementById("vulnerabilityoptions")
		resData.forEach((report) => {
			const displayitem = document.createElement("option")
			displayitem.innerHTML = `
				<option id="report${report.id}">${report.id}</option>
			`
			vulnerabilityoptions.appendChild(displayitem)
		})
	}
	fetchMethod(currenturl + `/api/vulnerability`, callback, "GET", null, localStorage.getItem("token"))

	// post report codes
	const reportform = document.getElementById("reportform")
	const postrepcallback = (resStatus, resData) => {
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `index.html`
			return
		}
		
		if (resStatus == 201) {
			alert("Report logged successfully.\nUser has earned 75 credits!")
			window.location.href = `reports.html`
		}
		else {
			alert(resData.message)
			return
		}
	}

	reportform.addEventListener("submit", function (event) {
		event.preventDefault()
		const vulnerability_id = document.getElementById("reportselect").value
		const data = {
			vulnerability_id: vulnerability_id
		}
		fetchMethod(currenturl + `/api/report`, postrepcallback, "POST", data, localStorage.getItem("token"))
	})
})