export default function ({app, query, redirect, route}) {
	if (!app.$cookies.get('session') && !query.search) {
    if (app.$cookies.get('refresh')) {
		  redirect('/login-handler/refresh')
    } else {
      redirect('/login')
    }
  } else if (route.name === 'login') {
    redirect('/')
  }
}
