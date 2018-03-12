export default function ({app, query, redirect}) {
	if (!app.$cookies.get('session') && !query.search) {
		redirect('/login')
	}
}
