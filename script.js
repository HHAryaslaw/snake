let fill = document.getElementById("game_fill")
let info = fill.getContext("2d")

let food_label=document.getElementById("food_label")

food_label.textContent = `Еды съедено: ${0}` // при 

let bite_sound=document.getElementById("bite_sound")


let foodEaten = 0

let GR = 32        
let GRID_SIZE = 16 


let frames=0


let sx = 0            
let sy = 0 

let dx = 0               
let dy = 0

let food_list=[]

let tail_parts=[[sx, sy]]

for (let i=0; i<20; ++i){
    food_list.push([Math.floor(Math.random()*GRID_SIZE), Math.floor(Math.random()*GRID_SIZE)])
}


function main() {


    sx += dx;
    sy += dy;


    if (sx < 0) sx = GRID_SIZE - 1;
    if (sx >= GRID_SIZE) sx = 0;
    if (sy < 0) sy = GRID_SIZE - 1;
    if (sy >= GRID_SIZE) sy = 0;


    for (let i=1; i < tail_parts.length; ++i){
        if (tail_parts[i][0] == sx && tail_parts[i][1] == sy){
            tail_parts.splice(i, tail_parts.length-i)
            break
        }
        
    }

    let ate = false
    for (let i=0; i<food_list.length; ++i){
        if ((food_list[i][0]== sx) && (food_list[i][1] == sy)){
            bite_sound.currentTime = 0
            bite_sound.play()

            ate = true
            foodEaten++
            food_label.textContent = `Еды съедено: ${foodEaten}`
            food_list.splice(i,1)
            food_list.push([Math.floor(Math.random()*GRID_SIZE), Math.floor(Math.random()*GRID_SIZE)])
            break
        }
    }

    tail_parts.unshift([sx, sy])

    if (!ate){
        tail_parts.pop()
    }

    info.clearRect(0, 0, 512, 512);

    info.fillStyle = "rgba(0, 0, 0, 0.3)";
    info.fillRect(0, 0, 512, 512);


    for (let i = 0; i < food_list.length; i++) {
        info.fillStyle = "rgb(255, 0, 0)";
        info.fillRect(food_list[i][0] * GR, food_list[i][1] * GR, 28, 28);
    }


    for (let i = 0; i<tail_parts.length; ++i){
        info.fillStyle = "rgb(255, 238, 0)";
        info.fillRect(tail_parts[i][0] * GR, tail_parts[i][1] * GR, 28, 28)
    }


    ++frames


}

setInterval(main, 62.5);


document.addEventListener("keydown", function(event) {

    event.preventDefault();

    switch(event.key) {
        case "w":
        case "W":
            if (dy !== 1) { 
                dx = 0;
                dy = -1;
            }
            break;
        case "s":
        case "S":
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case "a":
        case "A":
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case "d":
        case "D":
            if (dx !== -1) { 
                dx = 1;
                dy = 0;
            }
            break;
    }
});