// GameMenu.js
export async function renderGameMenu() {
	let html		= await fetch('pages/GameMenu/GameMenu.html');
	let htmlText	= await html.text();

	const element = document.querySelector('#DynamicContent');
	console.log(element.innerHTML);
	element.innerHTML = htmlText;
}