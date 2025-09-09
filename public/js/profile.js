document.addEventListener("DOMContentLoaded", function () {
	// callback for user info
	const callback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)
		
		// check if token is still valid/exists
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = "register.html"
			return
		}

		const userinfo = document.getElementById("userinfo")
		userinfo.innerHTML = `
			<div class="card">
				<div class="card-body">
					<div class="card-title display-3">${resData.username}</div>
					<div class="card-subtitle text-muted fs-5">
						ID: ${resData.id}<br>
						User creation: ${resData.created_on}
					</div>
					<p class="card-text fs-1">Credits: ${resData.credits}</p>
				</div>
				<div class="card-footer">
					<a href="#" class="btn "btn-secondary" id="edit">Edit</a>
				</div>
			</div>	
		`

		// function for edit button
		const edit = document.getElementById(`edit`)
		edit.addEventListener("click", (event) => {
			event.preventDefault()
			window.location.href = `edit.html`
		})
	}
	fetchMethod(currenturl + `/api/user/`, callback, "GET", null, localStorage.getItem("token"))

	// callback for user's characters
	const characterscallback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)
		const characters = document.getElementById("characters")

		// check if token is still valid/exists
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = "register.html"
			return
		}

		if (resStatus == 404) {
			characters.innerHTML = `<p class="display-4 text-secondary text-center">${resData.message}</p>`
			return
		}

		resData.forEach((character) => {
			const displayitem = document.createElement("div")
			displayitem.innerHTML = `
				<div class="card my-3">
					<div class="card-body">
						<img class="card-img-top" src="../media/${character.id}.png" alt="Character image">
						<h4 class="card-title fs-1">${character.name}</h4>
						<p class="fs-3">Rarity: ${character.rarity}</p>
						<p class="card-text fs-5">
							Attack method: ${character.type1}<br>
							Attack type: ${character.type2}
						</p>
					</div>
				</div>					
			`
			characters.appendChild(displayitem)
		})
	}
	fetchMethod(currenturl + `/api/user/characters`, characterscallback, "GET", null, localStorage.getItem("token"))
})