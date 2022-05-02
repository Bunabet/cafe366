/**
 *  AUTH
 * v 0.1.1
 * 2019-2022
 * */

import auth0 from "auth0-js"

export const browser_is = typeof window !== "undefined"
 
const tokens = {
	idToken: false,
	accessToken: false,
}
 
let user = {}
 
export const auth_token_is = () => {
	return tokens.idToken !== false
}
 
 const auth = browser_is ? 
 	new auth0.WebAuth({
			domain: process.env.AUTH0_DOMAIN,
			clientID: process.env.AUTH0_CLIENTID,
			redirectUri: process.env.AUTH0_CALLBACK,
			responseType: "token id_token",
			scope: "openid profile email",
		}) : {}
 
	export const login = () => {
		if (!browser_is) {
			return;
		}
	auth.authorize();
}
 
export const logout = () => {
	tokens.accessToken = false;
	tokens.idToken = false;
	user = {};
	window.localStorage.setItem("isLoggedIn", false);
 
	auth.logout({
		returnTo: window.location.origin,
	})
}
 
 // cb is for callback
 const set_session = (cb = () => {}) => (err , authResult) => {
	 if (err) {
		 if (err.error === "login_required") {
			 login()
		 }
	 }
	 if (authResult && authResult.accessToken && authResult.idToken) {
		 tokens.idToken = authResult.idToken
		 tokens.accessToken = authResult.accessToken
 
		 auth.client.userInfo(tokens.accessToken, (_err, userProfile) => {
			 user = userProfile
			 window.localStorage.setItem("isLoggedIn", true)
 
			 cb()
		 })
	 }
 }
 
 export const check_session = callback => {
	 const isLoggedIn = window.localStorage.getItem("isLoggedIn")
	 if (isLoggedIn === "false" || isLoggedIn === null) {
		 callback()
	 }
	 const protectedRoutes = [`/user/account`, `/user/callback`];
	 const isProtectedRoute = protectedRoutes
		 .map(route => window.location.pathname.includes(route))
		 .some(route => route)
	 if (isProtectedRoute) {
		 auth.checkSession({}, set_session(callback))
	 }
 }
 
 // export const use_authentication = () => {
 //   auth.parseHash(set_session())
 // }
 
 export const get_profile = () => {
	 return user
 }
 