// LoginPage.js
import { Login42Api, getCookie, setCookie, getApiToken, checkApiToken} from "./LoginAPI.js";
export async	function renderLoginPage() {
    let res =  await fetch('pages/login/LoginPage.html');
	let ress = 	   await res.text();
	console.log(ress);
	return	ress;
}


document.addEventListener("click", (e)=>{
	console.log("user click on ", e.target, e.target.matches("a[href='#Login']"));
	if (e.target.matches("a[href='#Login']")) {
		let SessionCookie = getCookie('session');
		let codeParam = new URLSearchParams(window.location.search).get('code');
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
					window.location.href("http://localhost:8000/#gameMenu");
				}
			});
		}
		else if (codeParam != null)
		{
			console.log("codeParam found!!!");
			getApiToken(codeParam)
				.then(res => {
					setCookie('session', res.access_token, 1);
					window.location.href = "http://localhost:8000/#gameMenu";
			});

		}
		else
		{
			console.log("let's go Login!!!");
			console.log("session cookie not found!!!");
			document.getElementById("loginOption").innerHTML = `
			<li><a class="42login" id="42Login" href="#callback"> 42Login </a></li>
			<li><a> Normal Login </a></li>
			`;
		}
	}
	if (e.target.matches("a[href='#callback']"))
	{
		Login42Api();
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