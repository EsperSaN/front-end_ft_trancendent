import { Component } from "../../Component.js";

const name = "game-play-page";

const componentStyle = `
    #pong {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: calc(100vw / 2);
        max-height: 100vh;
        max-width: calc(100vh * 2);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(255, 255, 255, 0.5);
    }
    #pong button {
        padding: 10px;
        font-size: 20px;
        align-self: center;
        position: absolute;
    }
    #pong-game {
        width: 100%;
        height: 100%;
    }
`;

export class GamePlayPage extends Component { 
  constructor() {
    super(componentStyle);
  }

  render() {
    return ` 
    <div id='pong'>
        <canvas id="pong-game"></canvas>
    </div>
    <p id="data"></p>
    `;
  }

  postCreate() {

    function scaleValue(canvasToScaleIn, value)
    {
        console.log(`canvas width : ${canvasToScaleIn.width} canvas height : ${canvasToScaleIn.height}`);
        console.log(`value : ${value}`);
        let widthRatio = canvasToScaleIn.width / 800;
        let heightRatio = canvasToScaleIn.height / 400;
        let Drawratio = value * Math.min(widthRatio, heightRatio);
        return Drawratio;
    }
    
    function resizeCanvas(element) {
        let container = element.parentElement;
        let targetAspectRatio = 2 / 1;
        
        let containerWidth = container.clientWidth;
        let containerHeight = container.clientHeight;
        let containerRatio = containerWidth / containerHeight;
        
        let newWidth, newHeight;
        
        if (containerRatio > targetAspectRatio) {
            newHeight = containerHeight;
            newWidth = newHeight * targetAspectRatio;
        } else {
            newWidth = containerWidth;
            newHeight = newWidth / targetAspectRatio;
        }
        
        element.width = newWidth;
        element.height = newHeight;
        
        element.style.width = `${newWidth}px`;
        element.style.height = `${newHeight}px`;
    }
    
    class CircleObject
    {
        constructor(canvas, x, y, radius, color, image)
        {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.posX = x;
            this.posY = y;
            this.radius = radius;
            this.color = color;
            this.image = image;
        }
    
        draw()
        {
            let radToDraw = scaleValue(this.canvas, this.radius);
            let xToDraw = scaleValue(this.canvas, this.posX);
            let yToDraw = scaleValue(this.canvas, this.posY);
            // this.ctx.beginPath();
            let imageToDraw = new Image();
            imageToDraw.src = this.image;
            imageToDraw.onload = () => {
                console.log(`image ${this.image} loaded`);
                console.log(`x : ${xToDraw} y : ${yToDraw} rad : ${radToDraw}\n on canvas x : ${this.canvas.width} y : ${this.canvas.height}`);
                this.ctx.drawImage(imageToDraw, xToDraw - radToDraw, yToDraw - radToDraw, (radToDraw  * 2) , (radToDraw  * 2 ) );
            }
            // this.ctx.arc(xToDraw, yToDraw, radToDraw, 0, Math.PI * 2); // full circle
            // this.ctx.strokeStyle = this.color;
            // this.ctx.lineWidth = 2;
            // this.ctx.stroke();
        }
    }
    
    class PongGame
    {
        constructor(ParentElement ,elementName)
        {
            this.parentElement = document.getElementById(ParentElement);
            this.canvas = document.getElementById(elementName);
            this.dataBox = document.getElementById("data");
            this.ctx = this.canvas.getContext('2d');
            this.settingData = null;
            this.currentState = null;
            this.webSocketConnection = null;
            // this.playerPicUrl = window.Images.getFile("player.png");
            // this.opponentPicUrl = window.Images.getFile("opponent.png");
            // this.ballPicUrl = window.Images.getFile("ball.png");
            this.init();
            this.key = {
                "UP" : false,
                "DOWN" : false,
            }
        }
    
        putbutton()
        {
            let button = document.createElement("button");
            button.classList.add("btn", "btn-success");
            button.textContent = "~Ready!~";
            button.onclick = () => {
                this.webSocketConnection.send(JSON.stringify({
                    "type": "queue"
                }));
                this.webSocketConnection.send(JSON.stringify({
                    "type": "connected"
                }));
                button.remove();
                this.run();
            }
            this.parentElement.appendChild(button);
        }
    
        init()
        {
            this.setUpWebsocket();
            resizeCanvas(this.canvas);
            this.putbutton();
        }
    
        draw()
        {
            var playerPicUrl = "Src/Images/file/player.png";
            var ballPicUrl = "Src/Images/file/ball.png";
            var opponentPicUrl = "Src/Images/file/player.png";
            if (this.currentState != null)
            {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                let leftPaddle = new CircleObject(this.canvas,
                    this.currentState.paddles.left.x, 
                    this.currentState.paddles.left.y, 
                    this.currentState.paddles.left.radius, "red",
                    playerPicUrl
                );
                let rightPaddle = new CircleObject(this.canvas,
                    this.currentState.paddles.right.x, 
                    this.currentState.paddles.right.y, 
                    this.currentState.paddles.right.radius, "blue",
                    opponentPicUrl
                    );
                let ball = new CircleObject(this.canvas, 
                    this.currentState.ball.x , 
                    this.currentState.ball.y , 
                    this.currentState.ball.radius, "green",
                    ballPicUrl);
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "black";
                this.ctx.beginPath();
                this.ctx.moveTo(this.canvas.width / 2, 0);
                this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
                this.ctx.stroke();
                leftPaddle.draw();
                rightPaddle.draw();
                ball.draw();
            }
        }
    
        setUpWebsocket()
        {
            this.webSocketConnection = new WebSocket(`ws://127.0.0.1:25566/ws/matchmaking/`);
            this.webSocketConnection.onopen = function() {
            }
    
            this.webSocketConnection.onmessage = (e) => {
                let recieveData =  JSON.parse(e.data);
                this.dataBox.innerHTML = e.data + "\nKey up : " + this.key.UP+ "\nKey Down : " + this.key.DOWN;
                if (recieveData.type === "connected") {

                }
                if (recieveData.type === "game_setting") {
                    this.settingData = recieveData.setting;
                }
                if (recieveData.type === "queue_ready") {
                }
                if (recieveData.type === "waiting") {
                }
    
                if (recieveData.type === "game_start") {
                    this.webSocketConnection.send(JSON.stringify({
                        "type": "game_start",
                        "game_id": recieveData.game_id
                    }));
                }
                if (recieveData.type === "game_state") {
                    this.game_id = recieveData.game_id;
                    this.currentState = recieveData.state;
    
                }
            }
        }
    
    
        eventListener()
        {
            document.addEventListener('keydown', (e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") 
                {
                    e.preventDefault();
                }
    
                if(e.key === "ArrowUp")
                {
                    this.key.UP = true;
                }
                if(e.key === "ArrowDown")
                {
                    this.key.DOWN = true;
                    // this.webSocketConnection.close()
                }
            });
    
            document.addEventListener('keyup', (e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") 
                {
                    e.preventDefault();
                }
    
                if(e.key === "ArrowUp")
                {
                    this.key.UP = false;
                }
                if(e.key === "ArrowDown")
                {
                    this.key.DOWN = false;
                }
            });
        }
    
        run()
        {
            this.eventListener();
            this.webSocketConnection.send(JSON.stringify({
                "type": "player_input",
                "game_id": this.game_id,
                "inputs": this.key
            }));
            this.draw();
            requestAnimationFrame(this.run.bind(this));
        }
    }
    
    let pongGame = new PongGame('pong','pong-game');
  }

}

customElements.define(name, GamePlayPage);