
export async function renderRegisterPage() {
	let res =  await fetch('pages/register/register.html');
	let ress = 	await res.text();
	console.log(ress);
	return	ress;
}

// document.addEventListener("click", async (e)=>{
// 	if (e.target.matches("a[href='#register']")) {
// 		console.log("register");
// 		let html = await fetch('pages/register/register.html');
// 		let htmlText = await html.text();

// 		document.getElementById("loginOption").innerHTML = htmlText;
// 	}
// });