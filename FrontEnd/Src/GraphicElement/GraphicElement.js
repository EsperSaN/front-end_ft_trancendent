export class GraphicElement {

    #filePaths;

    constructor () {
        this.#filePaths = ["./file/1.png",
                        "./file/2.png", 
                        "./file/3.png",
                        "./file/4.png",
                        "./file/5.png",
                        "./file/6.png",
                        "./file/7.png",
                        "./file/8.png",
                        "./file/9.png",
                        "./file/10.png",
                        "./file/11.png",
                        "./file/12.png", 
                        "./file/13.png",
                        "./file/14.png",
                        "./file/15.png",
                        "./file/16.png",
                        "./file/17.png",
                        "./file/18.png",
                        "./file/19.png",
                        "./file/BackGroundVideo.mp4",
                        "./file/MeowBackGroundSong.mp3",
                        "./file/MeowPongTitle.png"
        ];
    }

    loadFilesToLocalStorage() {
        for (let i = 0; i < this.#filePaths.length; i++) {
            const path = this.#filePaths[i];
            const filename = path.split("/").pop();
            localStorage.setItem(filename, path);
        }
    }

    getGraphicElement(filename) {
        const file = localStorage.getItem(filename);
        return file;
    }
}