
export async function renderRegisterPage() {
	let html		= await fetch('pages/register/register.html');
	let htmlText	= await html.text();

	const element = document.querySelector('#loginOption');
	element.innerHTML = htmlText;
}

// document.addEventListener("click", async (e)=>{
// 	if (e.target.matches("a[href='#register']")) {
// 		console.log("register");
// 		let html = await fetch('pages/register/register.html');
// 		let htmlText = await html.text();

// 		document.getElementById("loginOption").innerHTML = htmlText;
// 	}
// });