export async function renderLoginAsGuest() {
	const html		= await fetch('pages/loginAsGuest/loginAsGuest.html');
	const htmlText	= await html.text();
	const menuElement = document.querySelector('.menu');
	const frameMenuElement = document.createElement("div");
	const loginOption = document.querySelector('#loginOption');

	if (loginOption) {
		loginOption.remove();
	}
	dynamicStyle.href = "pages/loginAsGuest/loginAsGuest.css";
	frameMenuElement.classList.add("container-sm");
	frameMenuElement.classList.add("frame");
	frameMenuElement.innerHTML = htmlText;
	menuElement.appendChild(frameMenuElement);
}
