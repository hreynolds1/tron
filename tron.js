function randint(low, high) {
    return Math.round((Math.random() * (high-low))+low)
}
speed=1
gamegrid=document.getElementById("game")
gridarray=new Array(50)
function restartgame(){
    blueline=document.getElementsByClassName('blue')
    redline=document.getElementsByClassName('red')
    Array.prototype.forEach.call(redline, ele => {
        ele.classList.value=""
    })
    Array.prototype.forEach.call(blueline, ele => {
        ele.classList.value=""
    })
    setTimeout(function() {player1=new player("red",9,24,1,"right",gridarray[4][54])},1000)
    setTimeout(function() {player2=new player("blue",89,24,1,"left",gridarray[4][44])},1000)
    clearInterval(movep1)
    clearInterval(movep2)
    movep1=setInterval(function() {player1.move()},(100/speed))
    movep2=setInterval(function() {player2.move()},(100/speed))
}
function opposite(item,array,opposite){
    return array[opposite.indexOf(item)];
}
class player{
    constructor(colour,x,y,playernum,direction,display,alive=true){
        this.colour=colour
        this.x=x
        this.y=y
        this.playernum=playernum
        this.alive=alive
        this.direction=direction
        this.display=display
        this.score=0
    }
    move(){
        if (this.alive){
            switch(this.direction){
                case "left":
                    this.x-=1
                    break;
                case "right":
                    this.x+=1
                    break;
                case "up":
                    this.y-=1
                    break;
                case "down":
                    this.y+=1
                    break;
                default:
                    break;
            }
            switch(true){
                case this.y<0 || this.y>49 || this.x<0 || this.x>99:
                    this.die()
                    break;
                case gridarray[this.y][this.x].classList.value!="":
                    this.die()
                    console.log(gridarray[this.y][this.x].classList)
                    break;
                default:
                    gridarray[this.y][this.x].classList.add(this.colour)
                    break;
            }
        }
    }
    die(){
        console.log("you suck idiot")
        player1.alive=false
        player2.alive=false
        this.line=document.getElementsByClassName(this.colour)
        for (x in this.line){
            restartgame()
        }
        this.display.innerHTML=parseInt(this.display.innerHTML)+1
        console.log(this.display)
    }
}
for (i=0;i<50;i++){
    newrow=[]
    for (x=0;x<100;x++){
        newele=document.createElement("DIV")
        gamegrid.appendChild(newele)
        newele.innerHTML=""
        newrow.push(newele)
    }
    gridarray[i]=newrow
    /*if (randint(0,5)==0){
        newele.classList.add("blue")
    }*/
}
gridarray[4][54].innerHTML="0"
gridarray[4][54].id="p1display"
gridarray[4][44].innerHTML="0"
gridarray[4][44].id="p2display"
player1=new player("red",9,24,1,"right",gridarray[4][54])
player2=new player("blue",89,24,1,"left",gridarray[4][44])
movep1=setInterval(function() {player1.move()},(100/speed))
movep2=setInterval(function() {player2.move()},(100/speed))
document.addEventListener("keydown", event => {
    switch(event.keyCode){
        case 37:
            player2.direction="left"
            break;
        case 39:
            player2.direction="right"
            break;
        case 38:
            player2.direction="up"
            break;
        case 40:
            player2.direction="down"
            break;
        case 65:
            player1.direction="left"
            break;
        case 68:
            player1.direction="right"
            break;
        case 87:
            player1.direction="up"
            break;
        case 83:
            player1.direction="down"
            break;
    }
})