document.addEventListener("DOMContentLoaded", function () {
	// callback for checking if user has enough credits
	const callback = (resStatus, resData) => {
		console.log(resStatus)
		console.log(resData)

		// ensure token is valid/exists
		if (resStatus == 401) {
			localStorage.removeItem("token")
			window.location.href = `register.html`
			return
		}

		// redirects user if credits is insufficient
		if (resStatus == 400) {
			alert(resData.message + " At least 100 credits are needed for one pull.")
			window.location.href = `profile.html`
			return
		}

		// Show credits owned if no error
		else {
			const credsowned = document.getElementById("credsowned")
			credsowned.innerHTML = `Credits:<br>${resData.credits}`
		}
	}
	fetchMethod(currenturl + `/api/character/credits`, callback, "GET", null, localStorage.getItem("token"))

	// ========== functions for wheel ==========
	const container = document.querySelector(".container") // selects a class instead of an ID
	const button = document.getElementById("pull")
	const segments = container.children

	let rotation = 0 // keeps track of how much the wheel has turned to extract the result later

	button.onclick = function () { // when the button is clicked
		const spinamount = Math.ceil(Math.random() * 2000); // wheel will spin by a random amount, can change
		rotation += spinamount 
		container.style.transform = "rotate(" + spinamount + "deg)"; // dynamically creats a string based on the spinamount

		// calculate the segment it was landed on
		const normalrotation = rotation % 360 // remainder of the division of 360
		const angle = 360 / 9 // 9 segments
		let result = Math.floor((((360 - normalrotation) % 360) + angle * 0.5) / angle) // adjusting for offset
		result = result % segments.length // makes sure the result is not out of range (0-8)

		// Show result and call fetchMethod after spin finishes (everything must be inside the setTimeout function) so it runs after
		setTimeout(() => {
			alert("You got: " + segments[result].textContent) // extracts the result of the spin by taking the result and comparing it to the segment that matches it

			const data = {
				character_name: segments[result].textContent
			}
			console.log(data)
			const callback = (resStatus, resData) => {
				console.log(resStatus)
				console.log(resData)

				if (resStatus == 201) {
					window.location.href = `profile.html`
				}
				else {
					alert(resData)
					return
				}
			}
			fetchMethod(currenturl + `/api/character`, callback, "POST", data, localStorage.getItem("token"))
		}, 6000) // delay for 6 seconds
	}
})