document.addEventListener("DOMContentLoaded", function () {
	// callback for getting all open reports
	const opencallback = (resStatus, resData) => {
	// check if token is still valid/exists (only put it on this one as it is the first callback run)
	if (resStatus == 401) {
		localStorage.removeItem("token")
		window.location.href = "register.html"
		return
	}

	const openreports = document.getElementById("openreports")
	if (resStatus == 404) {
		openreports.innerHTML=  `<p class="fs-2 text-secondary text-center">${resData.message}</p>`
		return
	}

		console.log(resStatus)
		console.log(resData)

		resData.forEach((report) => {
			const displayitem = document.createElement("div")
			displayitem.className = "col-lg-4 col-md-6 col-sm-12 mt-2"
			displayitem.innerHTML = `
				<div class="card">
					<div class="card-body">
						<div class="card-title fs-5">Report ID: ${report.id}</div>
						<div class="card-text">
							Vulnerability ID: ${report.vulnerability_id} (${report.type})<br>
							User ID: ${report.user_id} (${report.username})<br>
							Credits awarded: ${report.points}
						</div>
					</div>
					<div class="card-footer">
						<a href="#" class="btn btn-secondary" id="report${report.id}">Close</a>
					</div>						
				</div>			
			`
			openreports.appendChild(displayitem)
		
			const closebutton = document.getElementById(`report${report.id}`)
			closebutton.addEventListener("click", function (event) {
				event.preventDefault()
				window.location.href = `closereport.html?report_id=${report.id}`
			})
		})
	}

	// callback for getting all closed reports
	const closedcallback = (resStatus, resData) => {
		const closedreports = document.getElementById("closedreports")
		
		if (resStatus == 404) {
			closedreports.innerHTML=  `<p class="fs-2 text-secondary text-center">${resData.message}</p>`
			return
		}

		console.log(resStatus)
		console.log(resData)

		resData.forEach((report) => {
			const displayitem = document.createElement("div")
			displayitem.className = "col-lg-4 col-md-6 col-sm-12 mt-2"
			displayitem.innerHTML = `
				<div class="card">
					<div class="card-body">
						<div class="card-title fs-5">Report ID: ${report.id}</div>
						<div class="card-text">
							Vulnerability ID: ${report.vulnerability_id} (${report.type})<br>
							User ID: ${report.user_id} (${report.username})<br>
						</div>
					</div>
				</div>			
			`
		closedreports.appendChild(displayitem)	
		})
	}

	fetchMethod(currenturl + `/api/report/open`, opencallback, "GET", null, localStorage.getItem("token"))
	fetchMethod(currenturl + `/api/report/closed`, closedcallback, "GET", null, localStorage.getItem("token"))
})