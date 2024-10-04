// profileConfig.js
export async function renderProfileConfig() {
	const html		= await fetch('./profileConfig.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#DynamicContent');
	const mainStylesheet = document.querySelector('link[href="./styles/main.css"]');

	flexContainer = document.createElement("div");
	flexContainer.classList.add("flex-container");
	flexContainer.innerHTML = htmlText;
	profileConfigStylesheet = document.createElement("link");
	profileConfigStylesheet.rel = "stylesheet";
	profileConfigStylesheet.hrel = "./profileConfig.css";
	mainStylesheet.insertAdjacentElement("afterend", profileConfigStylesheet);
	await dynamicContent.appendChild(flexContainer);
}