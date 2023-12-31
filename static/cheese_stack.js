let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = 750;
canvas.height = 500;

let canvas_width = canvas.width;
let canvas_height = canvas.height;
let offset_x;
let offset_y;

let get_offset = function () {
  let canvas_offsets = canvas.getBoundingClientRect();
  offset_x = canvas_offsets.left;
  offset_y = canvas_offsets.top;
};

get_offset();
window.onscroll = function () {
  get_offset();
};
window.onresize = function () {
  get_offset();
};
window.onresize = function () {
  get_offset();
};

var Img = {};
Img.bread = new Image();
Img.bread.src = "../static/bread.jpg";
Img.american = new Image();
Img.american.src = "../static/american.jpg";
Img.pepperjack = new Image();
Img.pepperjack.src = "../static/pepperjack.jpg";
Img.provolone = new Image();
Img.provolone.src = "../static/provolone.jpg";

let shapes = [];
let current_shape_index = null;
let is_dragging = false;
let startX;
let startY;

let stacked = 0;



shapes.push({
  x: 50,
  y: 50,
  width: 150,
  height: 150,
  color: "red",
  image: Img.american,
  moveable: true,
});
shapes.push({
  x: 50,
  y: 150,
  width: 150,
  height: 150,
  color: "blue",
  image: Img.pepperjack,
  moveable: true,
});
shapes.push({
  x: 50,
  y: 250,
  width: 150,
  height: 150,
  color: "red",
  image: Img.provolone,
  moveable: true,
});
shapes.push({
    x: 400,
    y: 150,
    width: 200,
    height: 200,
    color: "red",
    image: Img.bread,
    moveable: true,
  });


cutting_list = {};
sliceNum = 0;
breadKey = 999;

cutting_object = function (id, x, y, width, height) {
  var self = {
    id: id,
    x: x,
    y: y,
    width: width,
    height: height,
    color: "grey",
    image: Img.bread,
  };

  cutting_list[id] = self;
};

move_cutting_object = function () {
  for (var key in cutting_list) {
    cutting_list[key].x += 30;
  }
};

generate_cutting_object = function () {
  cutting_object(breadKey, 200, 150, 200, 200);
};

generate_cutting_object();

let shape_in_shape = function (square1, square2) {
  x1 = square1.x;
  y1 = square1.y;
  width1 = square1.width;
  height1 = square1.height;

  x2 = square2.x;
  y2 = square2.y;
  width2 = square2.width;
  height2 = square2.height;

  // Checking for collision in x-axis
  if (x1 < x2 + width2 && x1 + width1 > x2) {
    // Checking for collision in y-axis
    if (y1 < y2 + height2 && y1 + height1 > y2) {
      return true; // Collision detected
    }
  }
  return false;
};

let is_mouse_in_shape = function (x, y, shape) {
  let shape_left = shape.x;
  let shape_right = shape.x + shape.width;
  let shape_top = shape.y;
  let shape_bottom = shape.y + shape.height;

  if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
    return true;
  }

  return false;
};

let mouse_down = function (event) {
  event.preventDefault();
  console.log(event);
  startX = parseInt(event.clientX - offset_x);
  startY = parseInt(event.clientY - offset_y);

  let index = 0;
  for (let shape of shapes) {
    if (is_mouse_in_shape(startX, startY, shape)) {
      current_shape_index = index;
      is_dragging = true;
      return;
    }
    index++;
  }
};

let mouse_up = function (event) {
  if (!is_dragging) {
    return;
  }
  event.preventDefault();
  for (let shape of shapes) {
    if (shape.moveable && shape_in_shape(shape, cutting_list[breadKey])) {
      shape.moveable = false;
      stacked++;
    }
  }
  is_dragging = false;
};

let mouse_out = function (event) {
  if (!is_dragging) {
    return;
  }

  event.preventDefault();
  is_dragging = false;
};

let mouse_move = function (event) {
  if (!is_dragging) {
    return;
  } else {
    event.preventDefault();
    let mouseX = parseInt(event.clientX - offset_x);
    let mouseY = parseInt(event.clientY - offset_y);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let current_shape = shapes[current_shape_index];
    if (current_shape.moveable) {
        current_shape.x += dx;
        current_shape.y += dy;
      }

    draw_shapes();

    startX = mouseX;
    startY = mouseY;
  }
};

canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;

let draw_shapes = function () {
  context.clearRect(0, 0, canvas_width, canvas_height);

  for (var key in cutting_list) {
    var shape = cutting_list[key];
    context.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
  }

  for (let shape of shapes) {
    context.drawImage(shape.image, shape.x, shape.y, shape.width, shape.height);
  }

  if(stacked == 4) {
    window.location.href = "../cheese/pan"
  }
};

draw_shapes();

setInterval(draw_shapes, 40);
