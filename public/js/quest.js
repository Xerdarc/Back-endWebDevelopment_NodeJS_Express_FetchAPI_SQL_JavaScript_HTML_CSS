// the only purpose this page serves is to manage quests
document.addEventListener("DOMContentLoaded", function () {
	url = new URL(document.URL)
	const urlparams = url.searchParams
	const quest_id = urlparams.get("quest_id")

	if (!localStorage.getItem("token")) { // alternative way to check if token is valid
		window.location.href = `index.html`
		return
	}

	if (quest_id == 1) {
		window.location.href = `vulnerabilities.html`
	}
	if (quest_id == 2 || quest_id == 3) {
		window.location.href = `reports.html`
	}
	if (quest_id == 4) {
		const callback = (resStatus, resData) => {
			if (resStatus == 401) {
				localStorage.removeItem("token")
				window.location.href = `index.html`
			}
			if (resStatus == 200) {
				alert("User has earned 20 credits!")
				window.location.href = `quests.html`
			}
			else {
				alert(`${resData.message}`)
				return
			}
		}
		fetchMethod(currenturl + `/api/quest`, callback, "PUT", null, localStorage.getItem("token"))
	}
})