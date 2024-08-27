//https://stackoverflow.com/questions/588040/window-onload-vs-document-onload
window.onload = firstApp()

function firstApp(){
	let app = document.getElementById('app');
	let LoginContent = `
		<div>
			<h1> Login </h1>
			<button onclick="Login42Api()"> Login </button>
		</div>
	`
	app.innerHTML = LoginContent;
}
//https://stackoverflow.com/questions/576535/cookie-path-and-its-accessibility-to-subfolder-pages
//https://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie-with-javascript
function	setCookie(name, value, cookieLifeDay, path = "/")
{
	if (cookieLifeDay > 0){
		let date = new Date(Date.now() + cookieLifeDay * 24 * 60 * 60 * 1000).toUTCString(); // or 864e5
		value = encodeURIComponent(value);
		document.cookie = `${name}=${value}; expires=${date}; path=${path}`;
		console.log(document.cookie);
	}
	else
	{
		console.log("cookieLifeDay must be greater than 0");
	}
}

function Login42Api(){

	let	uid42Api = "u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227";
	let redirect_uri = "http://localhost:5500/index.html";
	let SearchParams = new URLSearchParams
	({
		'client_id' 			: uid42Api,
		'redirect_uri' 			: redirect_uri,
		'state' 				: "a random string will create later",
		'response_type' 		: "code"
	});
	let Oauth42Uri = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227&redirect_uri=http%3A%2F%2Flocalhost%3A5500%2Findex.html&response_type=code`;
	console.log(Oauth42Uri);
	let requestHeader ={
		method : 'GET',
		redirect: 'manual',
	};
	console.log("here");
	fetch(Oauth42Uri, requestHeader)
	.then(response => {
		window.location.href = response.url
		if (!response.ok){
			throw new Error(response.statusText)
		}
		console.log('Login42Api')
		return response.json()
	})
	.catch(error => {
		console.log(error)
	});
}

function	getCookie(CookieName)
{
	console.log('getCookie');
	let keyName = CookieName + "=";
	console.log(document.cookie);
	let cookieArray = document.cookie.split(';');
	let targetCookie = cookieArray.find((cookie) => cookie.indexOf(keyName) === 0);
	if (targetCookie != null)
		return (decodeURIComponent(targetCookie.substring(keyName.length)));
	else
		return null;
}

function checkApiToken(token){
	let uid42Api = "u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227";
	let secret42Api = "";
	let requestUrl = "https://api.intra.42.fr/oauth/token";
	let requestHeader = {
		method : 'POST',
		headers: {
		}
	}
	let requestParams = new URLSearchParams({
		'grant_type' : 'authorization_code',
		'client_id' : uid42Api,
		'client_secret' : secret42Api,
		'code' : token,
		'redirect_uri' : "http://localhost:5500/index.html"
	}).toString();

	requestUrl = requestUrl + "?" + requestParams;
	console.log(`send the tooken in link = ${requestParams}`);
	fetch(requestUrl, requestHeader)
	.then(response => {
		if (!response.ok){
			throw new Error("cannot call api with code")
		};
		console.log('checkApiToken done');
		return response.json();
	})
	.catch(error => {
		console.log(error)
	});
}

var expireDay = 7;
var Urlparam = getCookie('code');
console.log(`get cookie = ${Urlparam}`);
if (Urlparam == null){
	Urlparam = new URLSearchParams(window.location.search).get('code');
	console.log(`find on Param = ${Urlparam}`);
	if (Urlparam != null){
		console.log(`set cookie = ${Urlparam}`);
		setCookie('code', Urlparam, expireDay);
		window.location.href = "http://localhost:5500/index.html";
	}
}
else{
	console.log(`find on Cookie = ${Urlparam}`);
	let respon = checkApiToken(Urlparam);
	console.log(respon);
}

