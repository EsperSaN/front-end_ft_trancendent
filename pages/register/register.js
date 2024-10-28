export async function renderRegisterPage() {
	const html		= await fetch('pages/register/register.html');
	const htmlText	= await html.text();
	const menuElement = document.querySelector('.menu');
	const frameMenuElement = document.createElement("div");
	document.querySelector('#loginOption').remove();

	dynamicStyle.href = "pages/register/register.css";
	frameMenuElement.classList.add("container-sm");
	frameMenuElement.classList.add("frame");
	frameMenuElement.innerHTML = htmlText;
	menuElement.appendChild(frameMenuElement);
}