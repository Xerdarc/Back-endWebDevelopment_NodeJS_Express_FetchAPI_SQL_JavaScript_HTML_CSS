document.addEventListener("DOMContentLoaded", function () {
	const callback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)

		// only show the navbar if the user is logged in (has token)
		const shownavbar = document.getElementById("shownavbar")
		const space = document.getElementById("space")
		const token = localStorage.getItem("token")
		if (token) {
			shownavbar.classList.remove("d-none")
			space.classList.remove("d-none")
		}

		const characters = document.getElementById("characters")
		resData.forEach((character) => {
			const displayitem = document.createElement("div")
			displayitem.className = "col-lg-4 col-md-6 col-sm-12"
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
	fetchMethod(currenturl + `/api/character`, callback)
})