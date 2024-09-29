//https://stackoverflow.com/questions/588040/window-onload-vs-document-onload
//https://stackoverflow.com/questions/576535/cookie-path-and-its-accessibility-to-subfolder-pages
//https://stackoverflow.com/questions/4825683/how-do-i-create-and-read-a-value-from-cookie-with-javascript

export function getApiToken(token){
	let url = `http://127.0.0.1:8000/auth/callback?code=${token}`;
	let res = fetch(url)
	.then(response => {
		if (!response.ok){
			throw new Error(response.statusText)
		}
		return response.json();
	})
	.catch(error => {
		console.log(error)
		return null;
	});
	return res;
}

export async function Login42Api(){
	let Oauth42Uri = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8aa7d1799d4b4847f8c1284abe03fb14a44fce8c230bb53da7a86efcb26ae227&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_type=code`;
	console.log("Oauth42Uri = " + Oauth42Uri);
	let requestHeader ={
		method : 'GET',
		redirect: 'manual',
	};
	fetch(Oauth42Uri, requestHeader)
	.then(response => {
		window.location.href = response.url
		if (!response.ok){
			throw new Error(response.statusText)
		}
		console.log(response.json());
		return response.json()
	})
	.catch(error => {
		console.log(error)
	});
}

// export function checkApiToken(token){
// 	let url = "https://api.intra.42.fr/v2/me";
// 	let requestHeader ={
// 		method : 'GET',
// 		headers: {
// 			'Authorization': `Bearer ${token}`
// 		}
// 	};
// 	let res = fetch(url, requestHeader).then(response => {
// 		if (!response.ok){
// 			throw new Error(response.statusText)
// 		}
// 		return response.json();
// 	}).catch(error => {
// 		console.log(error)
// 		return null;
// 	});
// 	return res;
// }

// var expireDay = 7;
// var Urlparam = getCookie('code');
// console.log(`get cookie = ${Urlparam}`);
// if (Urlparam == null){
// 	Urlparam = new URLSearchParams(window.location.search).get('code');
// 	console.log(`find on Param = ${Urlparam}`);
// 	if (Urlparam != null){
// 		console.log(`set cookie = ${Urlparam}`);
// 		setCookie('code', Urlparam, expireDay);
// 		window.location.href = "http://localhost:5500/index.html";
// 	}
// }
// else{
// 	console.log(`find on Cookie = ${Urlparam}`);
// 	let respon = checkApiToken(Urlparam);
// 	console.log(respon);
// }