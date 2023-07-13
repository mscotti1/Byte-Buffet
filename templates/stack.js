let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth - 30;
canvas.height = window.innerHeight - 10;

canvas.style.border = '5px solid red'

let canvas_width = canvas.width;
let canvas_height = canvas.height;
let offset_x;
let offset_y;

let get_offset = function() {
    let canvas_offsets = canvas.getBoundingClientRect();
    offset_x = canvas_offsets.left;
    offset_y = canvas_offsets.top;
}

get_offset();
window.onscroll = function() { get_offset(); }
window.onresize = function() { get_offset(); }
window.onresize = function() { get_offset(); }

let shapes = [];
let current_shape_index = null;
let is_dragging = false
let startX;
let startY;
shapes.push( {x:200, y:150, width:100, height:100, color: 'red'})
shapes.push( {x:200, y:300, width:100, height:100, color: 'blue'})
shapes.push( {x:200, y:450, width:100, height:100, color: 'red'})
shapes.push( {x:200, y:600, width:100, height:100, color: 'blue'})



cutting_list = {}
sliceNum = 0;

cutting_object = function(id,x,y,width,height) {
    var self = {
		id:id,
		x:x,
		y:y,
		width:width,
		height:height,
		color:"grey",
	};

    cutting_list[id] = self;
}


move_cutting_object = function() {
    for (var key in cutting_list) {
        cutting_list[key].x += 30;
    }
}


generate_cutting_object = function() {
    cutting_object(990,400,325,200,200);
}

generate_cutting_object();




let is_mouse_in_shape = function(x,y,shape) {
    let shape_left = shape.x
    let shape_right = shape.x + shape.width;
    let shape_top = shape.y;
    let shape_bottom = shape.y + shape.height

    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
        return true;
    }

    return false;
}

let mouse_down = function(event) {
    event.preventDefault();
    console.log(event)
    startX = parseInt(event.clientX - offset_x)
    startY = parseInt(event.clientY - offset_y)

    let index = 0
    for (let shape of shapes) {
        if (is_mouse_in_shape(startX,startY, shape)) {
            current_shape_index = index;
            is_dragging = true;
            return;

        }
        index++;
    }
}


let mouse_up = function(event) {
    if (!is_dragging) {
        return;
    }

    event.preventDefault();
    is_dragging = false;
}

let mouse_out = function(event) {
    if (!is_dragging) {
        return;
    }

    event.preventDefault();
    is_dragging = false;
}

let mouse_move = function(event) {
    if (!is_dragging) {
        return
    }
    else {
        event.preventDefault();
        let mouseX = parseInt(event.clientX - offset_x)
        let mouseY = parseInt(event.clientY - offset_y)

        let dx = mouseX - startX;
        let dy = mouseY - startY;

        let current_shape = shapes[current_shape_index];
        current_shape.x += dx;
        current_shape.y += dy;

        draw_shapes();

        startX = mouseX;
        startY = mouseY;
    }
}


canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;




let draw_shapes = function() {
    context.clearRect(0,0, canvas_width, canvas_height);

    for(var key in cutting_list) {
        var shape = cutting_list[key]
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, shape.width, shape.height)
    }

    for (let shape of shapes) {
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, shape.width, shape.height)
    }
}

draw_shapes();


setInterval(draw_shapes, 40)