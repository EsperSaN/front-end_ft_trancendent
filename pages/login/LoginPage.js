// LoginPage.js
import { Login42Api, getCookie, setCookie, getApiToken, checkApiToken} from "./LoginAPI.js";

export async	function renderLoginPage() {
    let html		= await fetch('pages/login/LoginPage.html');
	let htmlText	= await html.text();
	
	const DynamicContent = document.getElementById('DynamicContent');
	DynamicContent.innerHTML = htmlText;
}


document.addEventListener("click", (e)=>{
	if (e.target.matches("a[href='#42Login']")) {
		let SessionCookie = getCookie('session');
		console.log("SessionCookie = " + SessionCookie);
		let codeParam = new URLSearchParams(window.location.search).get('code');
		console.log("codeParam = " + codeParam);
		if (SessionCookie != null)
		{
			checkApiToken(SessionCookie).then(res => {
				if (res == null)
				{
					console.log("session cookie not error!!!");
					setCookie("session", "", 0);
				}
				else
				{
					console.log("session cookie found!!!");
					window.location.href = "http://localhost:8000/#gameMenu";
				}
			});
		}
		else if (codeParam != null)
		{
			console.log("codeParam found!!!");
			getApiToken(codeParam)
				.then(res => {
					setCookie('session', res.access_token, 1);
					console.log(res);
					window.location.href = "http://localhost:8000/#gameMenu";
			});

		}
		else
		{
			Login42Api();
		}
	}
	// if (e.target.matches("a[href='#logout']"))
	// {
	// 	checkApiToken(getCookie('session')).then(res => {
	// 		if (res != null)
	// 		{
	// 			setCookie("session", "", 0);
	// 		}
	// 		window.location.href = "http://localhost:8000/#Login";
	// 	});
	// }
})