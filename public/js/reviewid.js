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

		const reviews = document.getElementById("reviews")
		if (resStatus == 404) {
			reviews.innerHTML = `${resData.message}`
			return
		}

		resData.forEach((review) => {
			const displayitem = document.createElement("div")
			displayitem.innerHTML = `
				<div class="card my-4">
					<div class="card-body">
						<div class="card-title fs-5 text-secondary">${review.created_on}</div>
						<p class="card-text fs-3">${review.stars} star(s)</p>
						<p class="card-text fs-4">${review.review}</p>
					</div>
					<div class="card-footer">
						<a href="#" class="btn btn-secondary me-3" id="edit-${review.id}">Edit this review</a>
						<a href="#" class="btn btn-danger" id="delete-${review.id}">Delete</a>
					</div>
				</div>		
			`
			reviews.appendChild(displayitem)

			// delete review function
			const deletereview = document.getElementById(`delete-${review.id}`)
			deletereview.addEventListener("click", (event) => {
				event.preventDefault()
				const deletecallback = (resStatus, resData) => {
					console.log(resStatus)
					console.log(resData)
					window.alert("Review successfully deleted.")
					window.location.reload()
				}
				fetchMethod(currenturl + `/api/review/${review.id}`, deletecallback, "DELETE", null, localStorage.getItem("token"))
			})

			// edit review function
			const editreview = document.getElementById(`edit-${review.id}`)
			editreview.addEventListener("click", (event) => {
				event.preventDefault()
				window.location.href = `editreview.html?review_id=${review.id}`
			})
		})
	}
	fetchMethod(currenturl + `/api/review/user`, callback, "GET", null, localStorage.getItem("token"))
})