// profileConfig.js
export async function renderProfileConfig() {
	const html		= await fetch('pages/profileConfig/profileConfig.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#DynamicContent');
	const mainStylesheet = document.querySelector('link[href="./styles/main.css"]');

	document.querySelector(".flex-container").remove();
	const flexContainer = document.createElement("div");
	flexContainer.classList.add("flex-container");
	flexContainer.innerHTML = htmlText;
	document.getElementById("dynamicStyle").remove();
	const profileConfigStylesheet = document.createElement("link");
	profileConfigStylesheet.rel = "stylesheet";
	profileConfigStylesheet.href = "./pages/profileConfig/profileConfig.css";
	profileConfigStylesheet.id = "dynamicStyle";
	mainStylesheet.insertAdjacentElement("afterend", profileConfigStylesheet);
	dynamicContent.appendChild(flexContainer);
}