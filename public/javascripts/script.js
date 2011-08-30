/*$(document).ready(function(){
  var socket = io.connect();

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  canvas.height = 400;
  canvas.width = 800;

  ctx.fillStyle = 'solid';
  ctx.strokeStyle = '#ecd018';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  socket.on('draw', function(data){
	  draw(data.x, data.y, data.type);
  });

  function draw(x, y, type){
	  if (type === 'dragstart'){
		  ctx.beginPath();
		  return ctx.moveTo(x, y);
  	}
    else if (type === 'drag'){
	    ctx.lineTo(x, y);
	    return ctx.stroke();
    }
    else{
	    return ctx.closePath();
    }
  }
});*/
(function() {
  var App;
  App = {};
  /*
  	Init 
  */
  App.init = function() {
    App.canvas = document.getElementById('canvas');
    App.canvas.height = 400;
    App.canvas.width = 800;
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#ECD018";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    App.socket = io.connect('http://50.22.248.74:9980');
    App.socket.on('draw', function(data) {
      return App.draw(data.x, data.y, data.type);
    });
    App.draw = function(x, y, type) {
      if (type === "dragstart") {
        App.ctx.beginPath();
        return App.ctx.moveTo(x, y);
      } else if (type === "drag") {
        App.ctx.lineTo(x, y);
        return App.ctx.stroke();
      } else {
        return App.ctx.closePath();
      }
    };
  };
  /*
  	Draw Events
  */
  $('canvas').live('drag dragstart dragend', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $(this).offset();
    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    App.draw(x, y, type);
    App.socket.emit('drawClick', {
      x: x,
      y: y,
      type: type
    });
  });
  $(function() {
    return App.init();
  });
}).call(this);