
export async function renderRegisterPage() {
	const html		= await fetch('pages/register/register.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#loginOption');
	const dynamicStyle = document.querySelector('#dynamicStyle');
	const backButton = document.createElement("div");

	dynamicStyle.href = "pages/register/register.css";
	dynamicContent.innerHTML = htmlText;
}

// document.addEventListener("click", async (e)=>{
// 	if (e.target.matches("a[href='#register']")) {
// 		console.log("register");
// 		let html = await fetch('pages/register/register.html');
// 		let htmlText = await html.text();

// 		document.getElementById("loginOption").innerHTML = htmlText;
// 	}
// });