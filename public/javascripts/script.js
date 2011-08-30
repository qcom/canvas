$(document).ready(function(){
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

  socket.on('alert', function(){
	  alert('lol alert');
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

  $('#canvas').live('drag dragstar dragend', function(e){
	  var type = e.handleObj.type;
	  var offset = $(this).offset();
	  e.offsetX = e.layerX - offset.left;
	  e.offsetY = e.layerY - offset.top;
	  var x = e.offsetX;
	  var y = e.offsetY;	
	  draw(x, y, type);
	  socket.emit('drawClick', {
		  x: x,
		  y: y,
		  type: type
  	});
  });
});