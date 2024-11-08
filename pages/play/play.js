export async function renderPlay() {
	const html		= await fetch('pages/play/play.html');
	const htmlText	= await html.text();
    const dynamicContent = document.querySelector('#DynamicContent');
    
    dynamicContent.innerHTML = htmlText;
}