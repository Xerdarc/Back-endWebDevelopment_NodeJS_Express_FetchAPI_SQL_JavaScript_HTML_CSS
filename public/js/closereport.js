// the only purpose this page serves is to get the report ID
document.addEventListener("DOMContentLoaded", function () {
	url = new URL(document.URL)
	const urlparams = url.searchParams
	const report_id = urlparams.get("report_id")

	const closereportcallback = (resStatus, resData) => {
		// check if token is still valid/exists (only put it on this one as it is the first callback run)
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = "register.html"
			return
		}

		if (resStatus == 200) {
			alert("Report closed successfully.\nUser has earned the credits from the report!")
			window.location.href = `reports.html`
		}
		else {
			alert (resData.message)
			return
		}

	}

	const data = {
		report_id: report_id,
		status: 1
	}
	
	fetchMethod(currenturl + `/api/report/${report_id}`, closereportcallback, "PUT", data, localStorage.getItem("token"))
})