
var cols = 10 , rows = 20;
var board  = [];
var current;
var currentx ;
var currenty;
var newcurrentx , newcurrenty;
var score;
var shapes = [
  [1,1,1,1],
  [1,1,1,0
  ,1],
  [1,1,1,0
  ,0,0,1],
  [1,1,1,0
  ,0,1],
  [1,1,0,0,
   1,1],
  [1,1,0,0
  ,0,1,1],
  [0,1,1,0,
   1,1]
];


//line clearance
function line_clear(){
	for(var x=0;x<20;x++){
		var t=0;
		for(var y=0;y<10;y++){
			if(board[y][x] == 1){
				t++;
			}
		}
		if(t==10){
			score += 10;
			for(var y1 = 0;y1<10;y1++)board[y1][x]=0;

			for(var x1 = x ; x1>0; x1--){
				for(var y1 = 0 ; y1<10;y1++){
					board[y1][x1] = board[y1][x1-1];
					board[y1][x1-1] = 0;
				}
			}
		}
	}
}


//rotate_current

function rotate_current(current){
  var newcurrent = [];
  for(var x = 0 ;x<4;x++){
    newcurrent[x] = [];
    for(var y=0;y<4;y++){
       newcurrent[x][y] = current[y][3-x];
    }
  }
  return newcurrent;
}

function valid(currentx , currenty , rotated){
	for(var x = 0 ;x<4;x++){
    for(var y=0;y<4;y++){
		if(currentx + x < 10 && currentx + x >= 0 && currenty + y < 20){
        if(rotated[x][y] == 1 && board[currentx+x][currenty+y] == 1 )return false;
		}
	    else return false;
    }
  }
  return true;
}


// check validity

function validition_on_left(currentx , currenty , newcurrentx){
   for(var x=0;x<4;x++){
     for(var y=0;y<4;y++){
        if(newcurrentx + x >= 0){
          if(board[newcurrentx + x][currenty + y] == 1 && current[x][y] == 1)return false;
        }
        else if(newcurrentx + x < 0 && current[x][y] == 1)return false;
     }
   }
   return true;
}

function validition_on_right(currentx , currenty , newcurrentx){
   for(var x=0;x<4;x++){
     for(var y=0;y<4;y++){
        if(newcurrentx + x < 10){
          if(board[newcurrentx + x][currenty + y] == 1 && current[x][y] == 1)return false;
        }
        else if(newcurrentx + x >= 10 && current[x][y] == 1)return false;
     }
   }
   return true;
}

function validition_on_down(currentx , currenty , newcurrenty){
   for(var x=0;x<4;x++){
     for(var y=0;y<4;y++){
        if(newcurrenty + y < 20 && currentx +x >=0 && currentx +x <10 ){
          if(board[currentx + x][newcurrenty + y] == 1 && current[x][y] == 1)return false;
        }
        else if(newcurrenty + y >= 20 && current[x][y] == 1)return false;
     }
   }
   return true;
}

//validity finishes

function the_end(){
  for(var x = 0 ; x<10;x++){
    if(board[x][0] == 1)return true;
  }
  return false;
}
/*
window.addEventListener("load" , function(){
    
});
*/

//if  valid down movement not possible then freeze
function freeze(currentx , currenty){
     for(var x=0;x<4;x++){
       for(var y=0;y<4;y++){
         if(currentx + x >= 0 && currentx + x<10 && currenty + y<20){
          if(current[x][y] == 1)   board[currentx + x][currenty + y]  = current[x][y];
         }
       }
     }
	 line_clear();

  if(!the_end()) new_shapes();
  else setInterval(end , 0);
  
 
}

//freeze finish

//controlstart
 document.body.onkeydown  = function(e){
   var keys = {
	 27: 'esc',
     37: 'left',
     39: 'right',
     40: 'down',
     38: 'rotate'
   };
   if(typeof keys[e.keyCode] != 'undefined')   keypress(keys[e.keyCode]);

 }



//controlend
var n;

function new_shapes(){
	n = Math.floor(Math.random()*7);
   var shape = shapes[n];
   var i=0;
   current = [];
   for(var x = 0;x<4;x++){
     current[x] = [];
     for(var y = 0 ;y<4;y++){
       if(typeof shape[i]!='undefined')
        current[x][y] = shape[i];
        else current[x][y] = 0;
        i++;
     }
   }

   currentx = 5;
   currenty = 0;
}

function init(){
  score = 0;
  
  for(var x = 0;x<rows;x++){
    board[x] = [];
    for(var y=0;y<cols;y++){
      board[x][y] = 0;
      
    }
  }
}



function tick(){
  newcurrenty = currenty+1;
    if(  validition_on_down(currentx , currenty , newcurrenty)==1) currenty++;
    else freeze(currentx , currenty);
}

function keypress(key){
  switch(key){
    case 'left':
    newcurrentx = currentx-1;
      if(  validition_on_left(currentx , currenty , newcurrentx)==1)
         currentx--;
      break;
    case 'right':
    newcurrentx = currentx+1;
      if(  validition_on_right(currentx , currenty , newcurrentx)==1)
         currentx++;
      break;
    case 'down':
    newcurrenty = currenty+1;
      if(  validition_on_down(currentx , currenty , newcurrenty)==1)currenty++;
        else freeze(currentx , currenty);
      break;
    case 'rotate':
       var rotated = rotate_current(current);
        if(valid(currentx , currenty  , rotated))current = rotated;
      break;
  }
}

function end(){
	  c.font = "40px Georgia";
	c.fillText("THE END" , 80, 300);
}


	function wait(ms){
		//c.clearRect(0,0,300,650);
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
	  // c.font = "40px Georgia";
	//c.fillText("START" , 80, 300);
     end = new Date().getTime();
  }
}


setInterval(tick , 300);

init();
new_shapes();

//render
var canvas = document.getElementsByTagName('canvas')[0];
var c = canvas.getContext('2d');

var W = 300 , H = 600;
var cols = 10 , rows = 20;
var blocks_W = W/cols , blocks_H = H/rows;
 
function drawblock(x,y){
     c.fillRect(blocks_W*x , blocks_H*y , blocks_W -1, blocks_H-1);
     c.strokeRect(blocks_W*x , blocks_H*y , blocks_W-1 , blocks_H-1);
}

function render(){
  c.clearRect(0,0,300,650);
  c.beginPath();
  c.moveTo(0,600);
  c.lineTo(300,600);
  c.stroke();
  c.fillStyle = "green";
  c.strokeStyle = "black";
  for(var x=0;x<cols;x++){
  //  board[x] = [];
    for(var y=0;y<rows;y++){
      if(board[x][y]){
        drawblock(x,y);
     }
    //  c.strokeRect(blocks_W*x , blocks_H*y , blocks_W-1 , blocks_H-1);
      //console.log('x,y');
      //console.log(x);
      //console.log(y);
    }
  }

  c.fillStyle = "red";
  c.strokeStyle = "black";

  for(var x=0;x<4;x++){
//    current[x] = [];
    for(var y=0;y<4;y++){
      if(current[x][y]){
        drawblock(currentx + x , currenty + y);
     }
    }
  }
  c.font = "40px Georgia";
 c.fillText("Score :" ,0 , 635 );
 c.fillText( score , 150 , 635);
 
//document.getElementById("demo").innerHTML = score;
}

setInterval(render , 30 );
