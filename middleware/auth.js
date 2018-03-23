export default function ({app, redirect, route}) {
	if (!app.$cookies.get('session')) {
		if (app.$cookies.get('refresh')) {
			redirect('/login-handler/refresh')
		} else {
			redirect('/login')
		}
	}
}
