let fill = document.getElementById("game_fill")
let info = fill.getContext("2d")

let food_label=document.getElementById("food_label")

food_label.textContent = `Еды съедено: ${0}` // при 

let GR = 32        
let GRID_SIZE = 16 

let sx = 0            
let sy = 0 

let dx = 0               
let dy = 0

let food_list=[]

let tail_parts=[[sx, sy]]

for (let i=0; i<20; ++i){
    food_list.push([Math.floor(Math.random()*GRID_SIZE+0.5), Math.floor(Math.random()*GRID_SIZE+0.5)])
}


function main() {
    info.fillStyle = "rgb(0, 0, 0)";
    info.fillRect(0, 0, 512, 512);


    sx += dx;
    sy += dy;


    if (sx < 0) sx = GRID_SIZE - 1;
    if (sx >= GRID_SIZE) sx = 0;
    if (sy < 0) sy = GRID_SIZE - 1;
    if (sy >= GRID_SIZE) sy = 0;


    for (let i=0; i<food_list.length; ++i){
        if ((food_list[i][0]== sx) && (food_list[i][1] == sy)){
            tail_parts.push(food_list[i])
            food_list.splice(i,1)
            i-=1
            continue
        }

        info.fillStyle="rgb(255, 0, 0)"
        info.fillRect(food_list[i][0] * GR, food_list[i][1] * GR, 28, 28)
    }


    for (let j=tail_parts.length-1; j>0; --j){
        tail_parts[j]=tail_parts[j-1]

        if (sx==tail_parts[j][0] && sy==tail_parts[j][1]){
            tail_parts.splice(j, tail_parts.length-j)
            continue
        }

        info.fillStyle="rgb(255, 238, 0)"
        info.fillRect(tail_parts[j][0] * GR, tail_parts[j][1] * GR, 28, 28)
    }
    tail_parts[0]=[sx, sy]


    info.fillStyle = "rgb(255, 238, 0)";
    info.fillRect(sx * GR, sy * GR, 28, 28);



}

setInterval(main, 100);


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