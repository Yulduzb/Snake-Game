const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");


let gameOver=false;
let foodX,foodY;
let snakeX=5,snakeY=10;
let snakeBody=[];
let velocityX=0, velocityY=0;
let setIntervalId;
let score=0;

//local storage den high scoru alir
let highScore=localStorage.getItem("high-score") || 0;
highScoreElement.innerText=`High Score: ${highScore}`;

//food yerini şekide değiştirmek için fonksiyon
const changeFoodPosition=()=>{
    foodX=Math.floor(Math.random()*30)+1;  
    foodY=Math.floor(Math.random()*30)+1;         //üretilen 0ve 1haric sayılari 30e çarpar,yuvarlar  ve 1 ile 29 arasındeki sayılara1 ekler 

}
 
const handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("Game Over!  Press OK to replay..." );
    location.reload();
}



// klavye olayı tetiklendiğinde "x" ve "y" yönlerini değiştiren bir fonksiyonu
const changeDirection = (e) => {
   if(e.key==="ArrowUp" && velocityY != 1){
    velocityX=0;   //Yatay hızı sıfırlar, yani yılan yatayda hareket etmez.
    velocityY=-1;
   }else if(e.key==="ArrowDown" && velocityY != -1){
    velocityX=0;
    console.log(velocityX);
    velocityY=1;
   }else if(e.key==="ArrowLeft" && velocityX != 1){
    velocityX=-1;
    velocityY=0;
   } else if(e.key==="ArrowRight" && velocityX != -1){
    velocityX=1;
    velocityY=0;
   }
   
}


controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
})




const initGame=()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`; 

if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition();
    snakeBody.push([foodX,foodY]);  //snakeBody ye yeni bir hücre ekler. Bu hücre, yılanın yem yediği hücredir. [foodX, foodY] ifadesi, yeni yem konumunu temsil eder 
    score++;


    highScore=score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText=`Score: ${score}`;
   

   
}


//Bu döngü, yılanın son hücresinden başlayarak tüm hücreleri bir
// öncekine kopyalar. Bu, yılanın vücudunu hareket ettirir.
for(let i=snakeBody.length-1;i>0;i--){
    snakeBody[i]=snakeBody[i-1];
    // Her döngü adımında, mevcut yılan hücresinin 
    //değeri, bir önceki hücrenin değeriyle değiştirilir.
}




  snakeBody[0]=[snakeX,snakeY];   //yılanın başının yeni bir pozisyonunu snakeX ve snakeY değerleriyle günceller. 


    snakeX+=velocityX;
    snakeY+=velocityY;
  

    //eğer yılan duvara çarparsa gameover true olur
if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
    gameOver=true;
}


    for(let i=0;i<snakeBody.length;i++){
          //grid-area özelliği, bu öğenin ızgara düzenindeki yerini satır/sütun değerleriyle belirler. 
        htmlMarkup+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`; 


        //Bu koşul ifadesi, yılanın başının (snakeBody[0][0] ve snakeBody[0][1]) yılanın vücudu içindeki
        // diğer hücrelere (snakeBody[i][0] ve snakeBody[i][1]) çarpıp çarpmadığını kontrol eder.
            if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                gameOver=true
            }                                                                                               
        playBoard.innerHTML=htmlMarkup;
    }
   
}
changeFoodPosition();
setIntervalId=setInterval(initGame,150);

document.addEventListener("keydown",changeDirection);