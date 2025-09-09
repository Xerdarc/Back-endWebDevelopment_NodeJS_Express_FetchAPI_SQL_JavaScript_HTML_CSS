document.addEventListener("DOMContentLoaded", function () {
	url = new URL(document.URL)
	const urlparams = url.searchParams
	const review_id = urlparams.get("review_id")

	// display single review
	const callback = (resStatus, resData) => {
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `register.html`
			return
		}

		console.log(resStatus)
		console.log(resData)

		const currentreview = document.getElementById("currentreview")
		currentreview.innerHTML = `<pre>${resData.review} 	(${resData.stars} star(s))</pre>`
	}
	fetchMethod(currenturl + `/api/review/${review_id}`, callback, "GET", null, localStorage.getItem("token"))

	// edit review
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
				window.alert("Review updated successfully.")
				window.location.href = `review.html`
			}
			else {
				warningcard.classList.remove("d-none")
				warningtext.innerText = resData.message
				return
			}	
		}
		const review = document.getElementById("edit").value
		const stars = document.getElementById("stars").value[0] // range values are always returned an array
		const starrating = parseInt(stars) + 1 // the first step is 0, so add 1 to all steps so the range is 1-5
		const data = {
			review: review,
			stars: starrating
		}
		fetchMethod(currenturl + `/api/review/${review_id}`, callback, "PUT", data, localStorage.getItem("token"))
	})
})