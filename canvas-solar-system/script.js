'use strict'

class TypeText{
    constructor(text){
        this.typeText(text)
    }

    _getRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    typeText(text){
        let tempIndex = 0
        let title = document.querySelector(".title")
    
        setInterval(()=>{
            if(tempIndex < text.length){
                title.textContent += text[tempIndex]
                tempIndex += 1
            }
        }, this._getRandom(100, 500))
    
        setInterval(()=> {
            return title.classList.toggle("cursor")
        }, Math.random() * (1000 - 500) + 500)
    }
}

class SolarSystem{

    constructor(){
        this.canvas = document.querySelector("#canvas")
        this.ctx = canvas.getContext('2d')
        this.ctx.font = "50px serif";

        this.canvas.width = window.innerWidth - 100
        this.canvas.height = window.innerHeight - 100

        this.cx = canvas.width / 2
        this.cy = canvas.height / 2

        this.planets = []
        this.stars = []

        this.createStarsLocation(70)
        this.refreshCanvas()
    }

    createStarsLocation(starCount){
        for(let i = 0; i < starCount; i++){
            this.stars.push(
                {
                    x: this._getRandom(0, this.cx * 2), 
                    y: this._getRandom(0, this.cy * 2), 
                    star_radius: this._getRandom(1, 4)
                }
            )
        }
    }

    _getRandom(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    refreshCanvas(){
        setInterval(() =>{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },1000/60)
    }
}

// class Star extends SolarSystem{
//     constructor(x, y, radius){
//         super()
//         this.x = x
//         this.y = y
//         this.radius = radius
//     }
// }


class Planet extends SolarSystem{

    constructor(radiusFromSun, color, velocity, size){
        super()
        this.radius = radiusFromSun
        this.color = color
        this.velocity = velocity
        this.size = size
        this.angle = 0

        // this.drawOrbitPath()
    }

    orbit(){
        
        this.angle += this.velocity
        let x = Math.cos(this.angle) * this.radius
        let y = Math.sin(this.angle) * this.radius
        
        this.ctx.beginPath()
        this.ctx.lineTo(this.cx + x, this.cy + y)
        this.ctx.stroke()
        this.ctx.arc(this.cx + x, this.cy + y, this.size, 0, Math.PI * 2)

        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2)
        this.ctx.strokeStyle = "white"
        this.ctx.stroke()


        window.requestAnimationFrame(() => this.orbit())
    }
}


class Init{

    constructor(){
        this.solarSystem = new SolarSystem()

        this.planetsData = {
            mercury: {
                color: "yellow",
                orbitRadius: 70,
                planetSize: 8,
                velocity: 0.04
            },
            venus: {
                color: "orange",
                orbitRadius: 110,
                planetSize: 10,
                velocity: 0.04
            },
            earth: {
                color: "green",
                orbitRadius: 170,
                planetSize: 15,
                velocity: 0.04
            },
            mars: {
                color: "red",
                orbitRadius: 240,
                planetSize: 12,
                velocity: 0.04
            },
        }
    }

    drawPlanets(){
        for(let [key, value] of Object.entries(this.planetsData)){
            let {color, orbitRadius, planetSize, velocity} = value
            let planet = new Planet(orbitRadius, color, velocity, planetSize)
            planet.orbit()
            this.solarSystem.planets.push(planet)
        }
    }

    drawStars(){
        // Drawing a sun, which is a star
        this.solarSystem.ctx.beginPath()
        this.solarSystem.ctx.arc(this.solarSystem.cx, this.solarSystem.cy, 40, 0, Math.PI * 2)
        this.solarSystem.ctx.fillStyle = "orangered"
        this.solarSystem.ctx.fill()
        this.solarSystem.ctx.closePath()
    
        this.solarSystem.stars.forEach(({x, y, star_radius}) => {
            this.solarSystem.ctx.beginPath()
            this.solarSystem.ctx.arc(x, y, star_radius, 0, Math.PI * 2 )
            this.solarSystem.ctx.fillStyle = "#fff"
            this.solarSystem.ctx.fill()
            this.solarSystem.ctx.closePath()
        })
        window.requestAnimationFrame(() => this.drawStars())
    }
}

let i = new Init()
i.drawPlanets()
i.drawStars()
let type = new TypeText("I am A web developer.")



