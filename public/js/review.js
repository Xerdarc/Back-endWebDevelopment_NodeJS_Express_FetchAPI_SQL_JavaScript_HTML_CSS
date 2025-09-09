document.addEventListener("DOMContentLoaded", function () {
	// get reviews
	const callback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)

		// ensure token is valid/exists
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `register.html`
			return
		}

		const reviews = document.getElementById("reviews")
		if (resStatus == 404) {
			reviews.innerHTML = `<p class="text-secondary fs-3 text-center">${resData.message}</p>`
			return
		}

		resData.forEach((review) => {
			const displayitem = document.createElement("div")
			displayitem.innerHTML = `
				<div class="card my-4">
					<div class="card-body">
						<div class="card-title fs-3"><pre>${review.username}	${review.stars} star(s)</pre></div>
						<div class="card-subtitle text-secondary mb-3">Published on ${review.created_on}</div>
						<p class="card-text fs-5">${review.review}</p>
					</div>
				</div>		
			`
			reviews.appendChild(displayitem)
		})
	}
	fetchMethod(currenturl + `/api/review`, callback, "GET", null, localStorage.getItem("token"))
})