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

	const createAccountButton = document.querySelector('.btn.btn-primary');
	createAccountButton.addEventListener('click', createAccount);
}

async function createAccount() {
	const username = document.getElementById("usernameInput").value;
	const email = document.getElementById("emailInput").value;
	const password = document.getElementById("passwordInput").value;
	const confirmpassword = document.getElementById("confirmPasswordInput").value;

	console.log("username: " + username);
	console.log("email: " + email);
	console.log("password: " + password);
	console.log("confirmpassword: " + confirmpassword);
}