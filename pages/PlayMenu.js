// PlayMenu.js

export function renderPlayMenu() {
    return `
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

            <ul>
                <li><a href="#PlayWithAi"> Play with AI </a></li>
                <li><a href="#PlayWithCat"> Play with Cat </a></li>
                <li><a href="#Back"> << Back </a></li>
            </ul>
        </div>
    `;
}