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

		const questlist = document.getElementById("questlist")
		resData.forEach((quest) => {
			if (quest.id == 3) { // assigning a unique value for the third quest (credits given are different)
				quest.credits = "See open reports for more details"
			}

			const displayitem = document.createElement("div")
			displayitem.innerHTML = `
				<div class="card my-4">
					<div class="card-body d-flex justify-content-between align-items-center">
						<div class="card-title fs-4">${quest.quest}
							<div class="card-subtitle text-secondary fs-6">Credits awarded: ${quest.credits}</div>
							</div>
						<a href="quest.html?quest_id=${quest.id}" class="btn btn-secondary">Go</a>
					</div>
				<div>		
			`
			questlist.appendChild(displayitem)
		})
	}
	fetchMethod(currenturl + `/api/quest`, callback, "GET", null, localStorage.getItem("token"))
})