window.addEventListener('beforeinstallprompt', function (e) {
	e.userChoice.then(function (choiceResult) {
		window.$nuxt.$ga.event('InstallBanner', choiceResult.outcome)
	})
})
