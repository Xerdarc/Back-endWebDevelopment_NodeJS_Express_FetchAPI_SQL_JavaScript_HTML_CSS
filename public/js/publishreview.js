document.addEventListener("DOMContentLoaded", function () {
	const reviewform = document.getElementById("reviewform")

	const callback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)

		if (resStatus == 201) {
			reviewform.reset()
			alert("Review successfully published.")
			location.reload() // reloads the current page
		}
		else {
			const warningcard = document.getElementById("warningcard")
			const warningtext = document.getElementById("warningtext")
			if (resStatus == 400) {
				warningcard.classList.remove("d-none")
				warningtext.innerText = resData.message
				return
			}
		}
	}

	reviewform.addEventListener("submit", function (event) {
		event.preventDefault()

		const review = document.getElementById("writereview").value
		const stars = document.getElementById("stars").value[0] // range values are always returned an array
		const starrating = parseInt(stars) + 1 // the first step is 0, so add 1 to all steps so the range is 1-5
		const data = {
			review: review,
			stars: starrating
		}
		fetchMethod(currenturl + `/api/review`, callback, "POST", data, localStorage.getItem("token"))
	})
})