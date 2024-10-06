// gameMenu.js

export async function renderGameMenu() {
	const html		= await fetch('pages/gameMenu/gameMenu.html');
	const htmlText	= await html.text();
	const dynamicContent = document.querySelector('#DynamicContent');
	const mainStylesheet = document.querySelector('link[href="./styles/main.css"]');
	const flexContainer = document.createElement("div");
	const gameMenuStylesheet = document.createElement("link");

	flexContainer.classList.add("flex-container");
	flexContainer.innerHTML = htmlText;
    const profileImage = flexContainer.querySelector('#profileImage');
	const profileName = flexContainer.querySelector('#profileName');
	const profileDataString = localStorage.getItem('profileData');
	const profileData = await JSON.parse(profileDataString);
    profileImage.src = profileData.profile;
	profileName.innerHTML = profileData.username;
	gameMenuStylesheet.href = "./pages/gameMenu/gameMenu.css";
	gameMenuStylesheet.rel = "stylesheet";
	gameMenuStylesheet.id =	"dynamicStyle"; 
	mainStylesheet.insertAdjacentElement("afterend", gameMenuStylesheet);
	document.getElementById("loginOption").remove();
	document.getElementById("MeowPongTitle").remove();
	dynamicContent.appendChild(flexContainer);
}