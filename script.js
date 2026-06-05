const game = document.getElementById("game");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const moto = document.getElementById("moto");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let score = 0;
let speed = 5;
let gameRunning = false;
let motoX = 150;

const lanes = [30, 150, 270];
const cars = [];

startBtn.addEventListener("click", startGame);

function startGame(){
    menu.style.display = "none";
    game.style.display = "block";

    gameRunning = true;

    setInterval(createCar, 1000);
    requestAnimationFrame(updateGame);
}

document.addEventListener("keydown",(e)=>{

    if(!gameRunning) return;

    if(e.key === "ArrowLeft"){
        motoX -= 120;
    }

    if(e.key === "ArrowRight"){
        motoX += 120;
    }

    if(motoX < 30) motoX = 30;
    if(motoX > 270) motoX = 270;

    moto.style.left = motoX + "px";
});

game.addEventListener("touchstart",(e)=>{

    if(!gameRunning) return;

    const touchX = e.touches[0].clientX;

    if(touchX < window.innerWidth/2){
        motoX -= 120;
    }else{
        motoX += 120;
    }

    if(motoX < 30) motoX = 30;
    if(motoX > 270) motoX = 270;

    moto.style.left = motoX + "px";
});

function createCar(){

    if(!gameRunning) return;

    const car = document.createElement("div");

    car.classList.add("car");
    car.innerHTML = "🚗";

    const lane =
        lanes[Math.floor(Math.random()*lanes.length)];

    car.style.left = lane + "px";
    car.style.top = "-80px";

    game.appendChild(car);

    cars.push(car);
}

function updateGame(){

    if(!gameRunning) return;

    cars.forEach((car,index)=>{

        let top =
        parseInt(car.style.top);

        top += speed;

        car.style.top = top + "px";

        const carRect =
        car.getBoundingClientRect();

        const motoRect =
        moto.getBoundingClientRect();

        if(
            carRect.left < motoRect.right &&
            carRect.right > motoRect.left &&
            carRect.top < motoRect.bottom &&
            carRect.bottom > motoRect.top
        ){
            endGame();
        }

        if(top > 700){
            car.remove();
            cars.splice(index,1);

            score++;
            scoreText.innerHTML =
            "Pontos: " + score;

            if(score % 10 === 0){
                speed++;
            }
        }
    });

    requestAnimationFrame(updateGame);
}

function endGame(){

    gameRunning = false;

    game.style.display = "none";
    gameOverScreen.style.display = "block";

    finalScore.innerHTML =
    "Pontuação Final: " + score;
}
