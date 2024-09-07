// GameMenu.js
import { getCookie, checkApiToken , setCookie} from "../login/LoginAPI.js";

export async function renderGameMenu() {
	let SessionCookie = getCookie('session');
	let data = await checkApiToken(SessionCookie).then(res => {{
		if (res == null)
		{
			console.log("session cookie not error!!!");
			setCookie("session", "", 0);
		}
		return res;
	}});
	if (data == null)
	{
		window.location.href = "http://localhost:8000/#login";
	}
	console.log(data);
    return `
	    <link href="./pages/GameMenu/GameMenu.css" rel="stylesheet">
        <video autoplay loop muted id = "video-background">
            <source src = "./GraphicElement/BackGroundVideo.mp4" type="video/mp4" />
        </video>

        <!-- audio background -->
        <!-- <audio autoplay loop hidden>
            <source src="../GraphicElement/BackgroundMusic.mp3" type="audio/mp3">
            Your browser does not support the audio element.
        </audio> -->

        <!-- button menu -->

        <div class = "menu">

            <img id = "MeowPongTitle" src="./GraphicElement/MeowPongTitle.png">
			<div id="mainMenu">
				<div id="playerData">
					<img src="${data.image.versions.small}" id="intraPhoto">
					<h2>${data.login}</h2>

				</div>
				<div id="optionMenu">
            		<ul>
                		<li><a href="#playMenu">Play</a></li>
                		<li><a href="#optionMenu">Option</a></li>
                		<li><a href="#logout"> Logout</a></li>
            		</ul>
				</div>
			</div>
        </div>
    `;
}