const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576
c.fillRect(0,0,canvas.width,canvas.height)



class Platform{
    constructor(positionX,positionY,width,height){
        this.positionX = positionX
        this.positionY = positionY
        this.width = width
        this.height = height
    }

    
       


    drawPlatform(){
        c.fillStyle = "#461670"
        c.fillRect(this.positionX,this.positionY,this.width,this.height)

        c.fillStyle = "#461670"
        c.fillRect(platformTwo.positionX,platformTwo.positionY,platformTwo.width,platformTwo.height)

        c.fillStyle = "#a313ad"
        c.fillRect(platformThree.positionX,platformThree.positionY,platformThree.width,platformFour.height)

        c.fillStyle = "#bd15a6"
        c.fillRect(platformFour.positionX,platformFour.positionY,platformFour.width,platformFour.height)

        
    }
}


const gravity = 5
class Background{
    constructor({position,imageSrc,scale = 1,framesMax = 1,offset ={x:0,y:0}  }){
        this.position = position 
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
       
    }



    draw(){
        c.drawImage(
            this.image,
           this.frameCurrent * (this.image.width / this.framesMax),
            0,
            
            this.image.width / this.framesMax,
            this.image.height,

        

                                                    // these 4 lines are the image crop only

            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width/this.framesMax) * this.scale,
            this.image.height*this.scale)
            this.framesElapsed += 1
            if(this.framesElapsed%this.framesHold === 0){
            if(this.frameCurrent < this.framesMax -1){
            this.frameCurrent+= 1
          
            }else{
                this.frameCurrent = 0
            }
        }
    }

}



class Player extends Background{
    constructor({position, velocity ,imageSrc,scale = 1,framesMax = 1, offset ={x:0,y:0}},s){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            
            

        })
        
  
        this.velocity = velocity
        this.height = 150
        this.color = "red"
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.s = s

        

        for(var sprite in this.s){
            s[sprite].image  = new Image()
            s[sprite].image.src = s[sprite].imageSrc
           
        }
        console.log(this.s)
    }   

    
    move(){
       player.draw()
       
        player.position.x += player.velocity.x
        player.position.y += player.velocity.y


      
        if(player.position.y + this.height + player.velocity.y <= canvas.height-110){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0 
        }
        

    }


}


let player = new Player({
    position: {
        x:100,
        y:25
    },
    velocity: {
        x:0,
        y:10
    },
    imageSrc: "./img/Sprites/Idle.png",
    framesMax: 8,
    scale:2.3,
    offset:{
        x:130,
        y:59
    },
    s:{ Idle:{
        imageSrc: "./img/Sprites/Idle.png",
        framesMax: 8
    },
    
}

    

 
})

let background = new Background({
    position:{
        x:0,
        y:0,
    },
    imageSrc: "./img/background.png"
})


let shop = new Background({
    position:{
        x:600,
        y:133,
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6
})
console.log(player.s)

let platform = new Platform(170,240,150,27)
let platformTwo = new Platform(300,340,150,20)
let platformThree = new Platform(490,250,220,20)
let platformFour = new Platform(650,90,280,25)







document.addEventListener("keydown",function(e){
    console.log(e.key)
    let key = e.key
    if(key == 'a'){
        //player.image = player.sprites.Run.image
        player.velocity.x = -10
        
    }else if(key == 'd'){
        player.velocity.x = 10

    }else if(key == 'w'){
        player.velocity.y = -60
    }

})

document.addEventListener("keyup",function(e){
    let key = e.key
    if(key == 'a'){
        player.velocity.x = 0
    }else if(key == 'd'){
        player.velocity.x = 0

    }else if(key == 'w'){
        player.velocity.y = 0
    }
    
})

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width,canvas.height)
    background.draw()
    //shop.draw()
    player.move()
   
    platform.drawPlatform()
    //console.log('ag')


       
    if(player.position.y + player.height <= platform.positionY && player.position.y + player.height + player.velocity.y >= platform.positionY && player.position.x+ 50 + player.velocity.y >= platform.positionX&& player.position.x <= platform.positionX + platform.width){
        console.log("YES!")
        player.velocity.y = 0
    }else if(player.position.y + player.height <= platformTwo.positionY && player.position.y + player.height + player.velocity.y >= platformTwo.positionY && player.position.x+ 50 + player.velocity.y >= platformTwo.positionX&& player.position.x <= platformTwo.positionX + platformTwo.width){
        player.velocity.y = 0
    }else if(player.position.y + player.height <= platformThree.positionY && player.position.y + player.height + player.velocity.y >= platformThree.positionY && player.position.x+ 50 + player.velocity.y >= platformThree.positionX&& player.position.x <= platformThree.positionX + platformThree.width){
        player.velocity.y = 0
    }else if(player.position.y + player.height <= platformFour.positionY && player.position.y + player.height + player.velocity.y >= platformFour.positionY && player.position.x+ 50 + player.velocity.y >= platformFour.positionX&& player.position.x <= platformFour.positionX + platformFour.width){
        player.velocity.y = 0
    }
   
}
 //  main game loop

 animate()