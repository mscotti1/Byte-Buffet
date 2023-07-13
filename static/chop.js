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
// shapes.push( {x:200, y:50, width:100, height:100, color: 'red'})
// shapes.push( {x:50, y:25, width:100, height:100, color: 'blue'})


var Img = {};
Img.pan = new Image();
Img.pan.src = "../static/grilled.png";

cut_boxes = {}
cut_boxes_size = 0;

hit_box = function(id,x,y,width,height) {

    var self = {
		id:id,
		x:x,
		y:y,
		width:width,
		height:height,
		color:"red",
	};

    cut_boxes[id] = self;

}

generate_hit_boxes = function() {

    

    hit_box(997,350,200,25,25);
    hit_box(996,350,225,25,25);
    hit_box(995,350,250,25,25);
    hit_box(994,350,275,25,25);
    hit_box(993,350,300,25,25);
    hit_box(992,350,325,25,25);
    
    cut_boxes_size = 6;

}

generate_hit_boxes();

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
        image: Img.pan,
	};

    cutting_list[id] = self;
}


move_cutting_object = function() {
    for (var key in cutting_list) {
        cutting_list[key].x += 30;
    }
}


generate_cutting_object = function() {
    cutting_object(990,170,150,400,300);
}

generate_cutting_object();
console.log(cutting_list)

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
    remove = false;

    let index = 0
    for (var key in cut_boxes) {
        console.log(remove)
        var shape = cut_boxes[key]
        del = false;
        if (is_mouse_in_shape(startX,startY, shape)) {
            current_shape_index = index;
            is_dragging = true;
            del = true;
        }
        if (del) {
            console.log("here")
            delete cut_boxes[key];
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
    event.preventDefault();
    //console.log(event)
    startX = parseInt(event.clientX - offset_x)
    startY = parseInt(event.clientY - offset_y)
    remove = false;

    let index = 0
    for (var key in cut_boxes) {
        //console.log(remove)
        var shape = cut_boxes[key]
        del = false;
        if (is_mouse_in_shape(startX,startY, shape)) {
            current_shape_index = index;
            is_dragging = true;
            del = true;
        }
        if (del) {
            console.log("here")
            cut_boxes_size--;
            delete cut_boxes[key];
        }
        index++;
    }
    if (!is_dragging) {
        return
    }
    else {
        event.preventDefault();
        // let mouseX = parseInt(event.clientX - offset_x)
        // let mouseY = parseInt(event.clientY - offset_y)

        // let dx = mouseX - startX;
        // let dy = mouseY - startY;

        // let current_shape = shapes[current_shape_index];
        // current_shape.x += dx;
        // current_shape.y += dy;

        // draw_shapes();

        // startX = mouseX;
        // startY = mouseY;
    }
}


canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;




let draw_shapes = function() {
    context.clearRect(0,0, canvas_width, canvas_height);
    // for (let shape of shapes) {
    //     context.fillStyle = shape.color;
    //     context.fillRect(shape.x, shape.y, shape.width, shape.height)
    // }

    for (var key in cutting_list) {
        var shape = cutting_list[key]
        //console.log(shape)
        context.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
    }

    for (var key in cut_boxes) {
        var shape = cut_boxes[key]
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, shape.width, shape.height)
    }

    console.log(cut_boxes_size)
    if(cut_boxes_size == 0) {
        sliceNum++;
        move_cutting_object(sliceNum);
        cut_boxes_size = -1;
    }
}

let new_chop = function() {
    generate_hit_boxes();
}


update = function() {
    draw_shapes()
    
    if (sliceNum == 1) {
        window.location.href = "/cheese/serve"
    }
}

setInterval(update, 40)
setInterval(new_chop,3000);