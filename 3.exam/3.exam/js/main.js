let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d'); 

//Billdere
let floor = new Image(); 
floor.src= 'images/game/floor.png'; 

let wall = new Image(); 
wall.src= 'images/game/wall.png'; 

let player = new Image(); 
player.src= 'images/game/player.png'; 

let goal = new Image(); 
goal.src= 'images/game/goal.png'; 

let finalGoal = new Image(); 
finalGoal.src= 'images/game/goal.png'; 

let wcpaper = new Image(); 
wcpaper.src= 'images/game/wcpaper.png'; 

let puddel = new Image(); 
puddel.src= 'images/game/puddel.png'; 

let dead = new Image(); 
dead.src= 'images/game/dead.png'; 

let mask = new Image(); 
mask.src= 'images/game/mask.png'; 

let angry = new Image(); 
angry.src= 'images/game/angry.png'; 

let enemy = new Image(); 
enemy.src= 'images/game/enemy.png'; 
 

//Multidimensional array hvor de 3 levels er i 
let levels = [
    [   
        [0,1,0,0,0,7,0,0,0,1,0,0],
        [0,1,0,4,1,1,0,1,1,1,4,0],
        [0,1,0,0,0,1,0,1,0,0,0,0],
        [1,1,1,1,1,1,0,1,0,1,1,3],
        [0,0,0,0,1,1,1,1,0,1,0,0],
        [1,1,4,0,0,1,1,0,0,1,0,4],
        [1,0,0,0,1,1,1,0,1,1,0,1],
        [1,0,1,1,1,0,1,0,0,1,1,1],
        [1,0,0,0,4,0,1,1,1,1,0,0],
        [2,1,1,0,0,0,1,0,0,1,1,1],
        [0,0,1,1,1,1,1,1,0,0,0,4],
        [1,1,1,0,0,0,0,1,1,1,0,0] 
    ],
    [
        [2,1,1,1,1,1,1,1,0,1,1,1],
        [1,0,0,0,0,0,0,1,0,1,0,0],
        [1,1,1,4,0,1,1,1,0,5,0,1],
        [0,0,0,0,0,1,0,1,0,4,0,1],
        [1,1,1,1,0,4,0,1,1,1,0,1],
        [0,0,0,1,1,1,0,1,0,0,0,5],
        [0,1,0,0,0,0,0,1,0,1,1,1],
        [0,5,1,1,1,1,1,1,0,4,0,1],
        [0,1,1,0,0,0,0,1,0,0,0,1],
        [0,0,1,0,4,0,1,1,1,0,1,1],
        [4,0,1,0,1,0,0,0,1,1,1,0],
        [1,1,1,1,1,5,1,0,3,0,1,0]
    ],
    [
        [6,0,0,0,0,1,1,1,5,0,4,1],
        [2,1,1,1,1,1,0,1,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,6,0,1],
        [1,0,1,1,1,1,1,1,0,1,1,1],
        [1,1,1,1,0,0,1,0,0,1,0,1],
        [0,0,0,0,0,6,1,1,1,1,4,5],
        [8,0,1,1,1,0,1,0,0,0,1,0],
        [1,0,1,0,1,0,1,1,4,0,1,0],
        [1,0,1,0,1,0,0,0,0,0,1,0],
        [1,1,1,0,1,0,1,1,1,1,1,0],
        [6,0,1,0,1,0,0,1,0,1,0,0],
        [0,4,1,0,1,1,1,1,0,1,1,4]
        ] 
]

//Variabler til nyt level
let levelStart = 0;
let maze = levels[levelStart];

//Andre varibels
let tileSize = 40;                               //Størrelsen af de enkle tiles
let empty=[];                                    //Tomt array 
let result;                                      //Resultat besked
let htmlText = document.querySelector('#moves'); //Henter id'et fra html
let moves = 100;                                 //Antal træk man starter med
let oneMove = 1;                                 //Antal træk man midster pr ryk 
let extraPoints = 100;                           //Antal ekstra træk man får ved at komme til et nyt level
let y = 0;                                       //Værdien af y
let x = 0                                        //Værdien af x                         
let playerPosition = {x:0, y:0};                 //Spillerns possition
let karenEnemy = 0;                              //fjende
let enemyWalk = setInterval(enemyMove, 1000);    //Player movement speed

//Lyde
function walk(){
    let gameSound = new Audio('gamesounds/walk.mp3');
    gameSound.play();}

function bump(){
    let gameSound = new Audio('gamesounds/headbump.mp3');
    gameSound.play();}

function point(){
    let gameSound = new Audio('gamesounds/point.mp3');
    gameSound.play();}

function finish(){
    let gameSound = new Audio('gamesounds/goal.mp3');
    gameSound.play();}

function lose(){
    let gameSound = new Audio('gamesounds/lose.mp3');
    gameSound.play();}

function fall(){
    let gameSound = new Audio('gamesounds/fall.mp3');
    gameSound.play();}

function mad(){
    let gameSound = new Audio('gamesounds/angry.mp3');
    gameSound.play();}    

//Function der tegner spillet med de givende tiles
function drawMaze(){
    for(y = 0; y<maze.length; y++){
      for(x = 0; x<maze[y].length; x++){
        if(maze[y][x] === 0){ //Wall
            ctx.drawImage(wall,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 1){ //Floor
            ctx.drawImage(floor,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 2){ //Player
            playerPosition = { y, x}; 
            ctx.drawImage(player,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 3){ //Goal
            ctx.drawImage(goal,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 4){ //Toilet Paper
            ctx.drawImage(wcpaper,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 5){ //Puddel
            ctx.drawImage(puddel,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 6){ //Mask
            ctx.drawImage(mask,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if (maze[y][x] === 7){//Enemy
            ctx.drawImage(enemy, x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === 8){ //Final goal
            ctx.drawImage(finalGoal,x*tileSize,y*tileSize,tileSize,tileSize);
        }
      }
    }
}

window.addEventListener("keydown", (e)=>{
movesCountdown();
switch(e.keyCode){

    case 37: // left
    if(maze[playerPosition.y][playerPosition.x -1] === 1){          //Tjekker om tilen = 1 (Gulv)
       maze[playerPosition.y ][playerPosition.x -1] = 2             //Tilen med playern
       maze[playerPosition.y ][playerPosition.x] = 1                //Tilen med playern skifter plads med gulvet
       drawMaze();                                                  //Tegner mazen igen efter der bliver bevæget på playern
       walk();                                                      //Kalder på funktioen som spiller en lyd 
    }else if(maze[playerPosition.y][playerPosition.x -1] === 0){    
        bump();                                                     
        missedPaper();                                              
    }else if(maze[playerPosition.y][playerPosition.x -1] === 3){
        maze[playerPosition.y][playerPosition.x -1] =2;             
        maze[playerPosition.y][playerPosition.x] =1;       
        toiletPaper();                                              
        nextLevel();                                                            
    }else if(maze[playerPosition.y][playerPosition.x -1] === 4){    
        point();                                                    
        maze[playerPosition.y][playerPosition.x -1] =2;             
        maze[playerPosition.y][playerPosition.x] =1;                
        drawMaze();   
    }else if(maze[playerPosition.y][playerPosition.x -1] === 5){    
        fall();                                                    
        maze[playerPosition.y][playerPosition.x -1] =2;             
        maze[playerPosition.y][playerPosition.x] =1;                
        fallPuddel();
    }else if(maze[playerPosition.y][playerPosition.x -1] === 6){                                                      
        maze[playerPosition.y][playerPosition.x -1] =2;             
        maze[playerPosition.y][playerPosition.x] =1;                
        putMaskOn();
        mad();
    }else if(maze[playerPosition.y][playerPosition.x -1] === 7) {
        maze[playerPosition.y][playerPosition.x -1] = 7; 
        maze[playerPosition.y][playerPosition.x] = 1; 
        enemyDeath();
    }else if(maze[playerPosition.y][playerPosition.x-1] === 8){
        maze[playerPosition.y][playerPosition.x-1] =2;             
        maze[playerPosition.y][playerPosition.x] =1; 
        win();
    }
    break; 

    case 38: // up
    if(maze[playerPosition.y -1][playerPosition.x] === 1){
       maze[playerPosition.y -1 ][playerPosition.x] = 2
       maze[playerPosition.y ][playerPosition.x] = 1
       drawMaze();
       walk();
    }else if(maze[playerPosition.y-1][playerPosition.x] === 0){
        bump();
        missedPaper(); 
    }else if(maze[playerPosition.y-1][playerPosition.x] === 3){
        maze[playerPosition.y-1][playerPosition.x] =2;             
        maze[playerPosition.y][playerPosition.x] =1;       
        toiletPaper();                                              
        nextLevel();  
    }else if(maze[playerPosition.y-1][playerPosition.x] === 4){
        point();
        maze[playerPosition.y-1][playerPosition.x] =2;
        maze[playerPosition.y][playerPosition.x] =1;
        drawMaze();
    }else if(maze[playerPosition.y-1][playerPosition.x] === 5){
        fall();
        maze[playerPosition.y -1][playerPosition.x] =2;
        maze[playerPosition.y][playerPosition.x] =1;
        fallPuddel();
    }else if(maze[playerPosition.y-1][playerPosition.x] === 6){                                                     
        maze[playerPosition.y-1][playerPosition.x] =2;             
        maze[playerPosition.y][playerPosition.x] =1;                
        putMaskOn();
        mad();
    }else if(maze[playerPosition.y -1][playerPosition.x] === 7) {
        maze[playerPosition.y -1][playerPosition.x] = 7; 
        maze[playerPosition.y][playerPosition.x] = 1; 
        enemyDeath();
    }else if(maze[playerPosition.y-1][playerPosition.x] === 8){
        maze[playerPosition.y -1][playerPosition.x] =2;             
        maze[playerPosition.y][playerPosition.x] =1; 
        win();
    }
    break; 

    case 39: // right
    if(maze[playerPosition.y][playerPosition.x +1] === 1){
       maze[playerPosition.y ][playerPosition.x +1] = 2
       maze[playerPosition.y ][playerPosition.x] = 1
       drawMaze();
       walk();
    }else if(maze[playerPosition.y][playerPosition.x +1] === 0){
        bump();
        missedPaper(); 
    }else if(maze[playerPosition.y][playerPosition.x +1] === 3){
        maze[playerPosition.y][playerPosition.x +1] =2;             
        maze[playerPosition.y][playerPosition.x] =1;       
        toiletPaper();                                              
        nextLevel();  
    }else if(maze[playerPosition.y][playerPosition.x +1] === 4){
        point();
        maze[playerPosition.y][playerPosition.x +1] =2;
        maze[playerPosition.y][playerPosition.x] =1;
        drawMaze();
    }else if(maze[playerPosition.y][playerPosition.x +1] === 5){
        fall();
        maze[playerPosition.y][playerPosition.x +1] =2;
        maze[playerPosition.y][playerPosition.x] =1;
        fallPuddel();
    }else if(maze[playerPosition.y][playerPosition.x +1] === 6){           
        maze[playerPosition.y][playerPosition.x +1] =2;             
        maze[playerPosition.y][playerPosition.x] =1;                
        putMaskOn();
        mad();
    }else if(maze[playerPosition.y][playerPosition.x +1] === 7) {
        maze[playerPosition.y][playerPosition.x +1] = 7; 
        maze[playerPosition.y][playerPosition.x] = 1; 
        enemyDeath();
    }else if(maze[playerPosition.y][playerPosition.x+1] === 8){
        maze[playerPosition.y][playerPosition.x+1] =2;             
        maze[playerPosition.y][playerPosition.x] =1; 
        win();
    }
    break; 

    case 40: // down
    if(maze[playerPosition.y+1][playerPosition.x] === 1){
       maze[playerPosition.y+1 ][playerPosition.x] = 2
       maze[playerPosition.y ][playerPosition.x] = 1
       drawMaze();
       walk();
    }else if(maze[playerPosition.y+1][playerPosition.x] === 0){
        bump();
        missedPaper(); 
    }else if(maze[playerPosition.y+1][playerPosition.x] === 3){
        maze[playerPosition.y+1][playerPosition.x] =2;             
        maze[playerPosition.y][playerPosition.x] =1;       
        toiletPaper();                                              
        nextLevel();  
    }else if(maze[playerPosition.y+1][playerPosition.x] === 4){
        point();
        maze[playerPosition.y+1][playerPosition.x] =2;
        maze[playerPosition.y][playerPosition.x] =1;
        drawMaze();
    }else if(maze[playerPosition.y+1][playerPosition.x] === 5){
        fall();
        maze[playerPosition.y+1][playerPosition.x] =2;
        maze[playerPosition.y][playerPosition.x] =1;
        fallPuddel();
    }else if(maze[playerPosition.y+1][playerPosition.x] === 6){                                                       
        maze[playerPosition.y+1][playerPosition.x] =2;             
        maze[playerPosition.y][playerPosition.x] =1;                
        putMaskOn();
        mad();
    }else if(maze[playerPosition.y +1][playerPosition.x] === 7) {
        maze[playerPosition.y +1][playerPosition.x] = 7; 
        maze[playerPosition.y][playerPosition.x] = 1; 
        enemyDeath();
    }else if(maze[playerPosition.y +1][playerPosition.x] === 8){
        maze[playerPosition.y +1][playerPosition.x] =2;             
        maze[playerPosition.y][playerPosition.x] =1; 
        win();
    }
    break; 
}
})
//Funktion hvor fjenden beværger sig op og ned på banen
function enemyMove(){                                  
    karenEnemy++;                                      
    if (karenEnemy < 7){                               
        for(y = 0; y<maze.length; y++){                
            for(x = 0; x<maze[y].length; x++){         
                if (maze[y][x] == 7){                  
                    if(maze[y + 1][x] == 1){          
                        maze[y + 1][x] = 7;            
                        maze[y][x] = 1;                
                    } else if (maze[y + 1][x] == 2){   
                        maze[y + 1][x] = 7;            
                        maze[y][x] = 1;                
                    }
                    drawMaze();
                }
            }
        }
    } else if (karenEnemy < 13){
        for(y = 0; y<maze.length; y++){
            for(x = 0; x<maze[y].length; x++){
                if (maze[y][x] == 7){
                    if(maze[y - 1][x] == 1){
                        maze[y - 1][x] = 7;
                        maze[y][x] = 1; 
                    } else if (maze[y - 1][x] == 2){
                        maze[y - 1][x] = 7;
                        maze[y][x] = 1;
                    }
                    drawMaze();
                }
            }
        }
    }else if (karenEnemy < 19){
        for(y = 0; y<maze.length; y++){
            for(x = 0; x<maze[y].length; x++){
                if (maze[y][x] == 7){
                    if(maze[y + 1][x] == 1){
                        maze[y + 1][x] = 7;
                        maze[y][x] = 1;
                    } else if (maze[y + 1][x] == 2){
                        maze[y + 1][x] = 7;
                        maze[y][x] = 1;
                    }
                    drawMaze();
                }
            }
        }
    }else if (karenEnemy < 25){
        for(y = 0; y<maze.length; y++){
            for(x = 0; x<maze[y].length; x++){
                if (maze[y][x] == 7){
                    if(maze[y - 1][x] == 1){
                        maze[y - 1][x] = 7;
                        maze[y][x] = 1; 
                    } else if (maze[y - 1][x] == 2){
                        maze[y - 1][x] = 7;
                        maze[y][x] = 1;
                    }
                    drawMaze();
                }
            }
        }
    }else if (karenEnemy < 31){
        for(y = 0; y<maze.length; y++){
            for(x = 0; x<maze[y].length; x++){
                if (maze[y][x] == 7){
                    if(maze[y + 1][x] == 1){
                        maze[y + 1][x] = 7;
                        maze[y][x] = 1;
                    } else if (maze[y + 1][x] == 2){
                        maze[y + 1][x] = 7;
                        maze[y][x] = 1;
                    }
                    drawMaze();
                }
            }
        }
    }
}

//Funktion der køre hvis du går ind i karen(enemy)
function enemyDeath(){                             
    clearInterval(enemyWalk);                
    result = "You ran into another karen, you got in to a figth and was kicked out of the store"    
    setTimeout(theEnd, 100);                 
}

//Function der tjekker om du har fået alt toilet papir for at gå vidre til næste level
function toiletPaper(){                      
    for(y = 0; y<maze.length; y++){          
        for(x = 0; x<maze[y].length; x++){  
            if (maze[y][x] === 4){           
            empty = [y,x]; break;            
            }
        }
    }
    if(typeof empty[0] == "undefined"){      //Tjekker om om alt toilet papiert er samlet op
        finish();                            //Lyd
    }else {
        lose();                              //Lyd
        result="Sorry, you dind't get enough toliet paper to survive the pandemic.";
        setTimeout(theEnd, 100);
    }
}

//Function der tjekker om du har fået alt toilet papir
function win(){                      
    for(y = 0; y<maze.length; y++){ 
        for(x = 0; x<maze[y].length; x++){
            if (maze[y][x] === 4){          
            empty = [y,x]; break;
            }
        }
    }
    if(typeof empty[0] == "undefined"){      //Tjekker om om alt toilet papiert er samlet op
        finish();                            //Lyd
        result = "Congratulation Karen.. You got enough toilet paper to get through the pandemic (and years to come) with " + moves + " moves to spare.";
        setTimeout(theEnd, 100);
    }else {
        lose();                              //Lyd
        result="Sorry, you dind't get enough toliet paper to survive the pandemic.";
        setTimeout(theEnd, 100);
    }
}

//Funktion når playern går ind i en toilet papirs tile
function missedPaper() {                                                                          
    wcpaper.src = floor.src;                 //Skifter toilet papir tile til floor tile
    drawMaze();                              //Tegner mazen igen med de nye tiles
    result = "God dammit Karen!! You went the wrong way and missed out on all the toilet paper!"
    setTimeout(theEnd, 100);                 //setTimeout gør at man får en besked, tiden er sat til 100 så lyden spiller før alerten
}

//Funktion når playern går ind i en puddel tile
function fallPuddel() {                      
    player.src = dead.src;                   //Skifter player tile til til dead player tile
    puddel.src = floor.src;                  //Skifter duddel tile til floor tile
    drawMaze();
    result = "Hmm.. Sanitizing is important, i don't about sanitizing the floor though, it could be slippery?"
    setTimeout(theEnd, 100);
}

//Funktion når playern går ind i en mask tile
function putMaskOn() {                       
    player.src = angry.src;                  //Skifter player tile til angry player tile
    drawMaze();
    result = "A face mask? Ha! do you really think Karen wants to where a mask? No no no, try agian!"
    setTimeout(theEnd, 100);
}

//Countdown 
function movesCountdown(){                                         
    moves -= oneMove;                        //Tager et move(fra orginal 100) hver gang du bevæger dig
    htmlText.innerHTML = moves;              //Sætter information ind i html filen
    if (moves <= 0) {                        //Hvis der ikke er flere moves(<= betyder mindre eller ligmed)
        lose();                              //Lyd
        result = "You are out of moves and soon toilet paper too!" 
        setTimeout(theEnd, 100);
    }
}

//Funktion der føre playern til det næste level 
function nextLevel(){
    moves+=extraPoints;                      //Giver ekstra point/moves når man kommer til det næste level 
    levelStart++;                            //Køre vidre i arrayt til det næste level
    maze = levels[levelStart];
    drawMaze();
}

//Sult funktion
function theEnd(){         
    alert(result);                           //En alert der kommer frem med resultatet
    location.reload();                       //Reloader siden efterfølgende
}

window.addEventListener("load", drawMaze);
window.addEventListener("load", movesCountdown);