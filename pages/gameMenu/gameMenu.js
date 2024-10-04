// gameMenu.js
export async function renderGameMenu() {
	const html		= await fetch('./gameMenu.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#DynamicContent');
	const mainStylesheet = document.querySelector('link[href="./styles/main.css"]');

	flexContainer = document.createElement("div");
	flexContainer.classList.add("flex-container");
	flexContainer.innerHTML = htmlText;
	gameMenuStylesheet = document.createElement("link");
	gameMenuStylesheet.rel = "stylesheet";
	gameMenuStylesheet.hrel = "./gameMenu.css";
	mainStylesheet.insertAdjacentElement("afterend", gameMenuStylesheet);
	await dynamicContent.appendChild(flexContainer);
}