var ball;

var database, position;

function setup(){
    //to establish the connection 
    database = firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //to read the data from database
    var pos = database.ref('ball/position');
    pos.on("value",read);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        write(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        write(1,0);
    }
    else if(keyDown(UP_ARROW)){
        write(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        write(0,+1);
    }
    drawSprites();
}

function write (x,y){
    //to write data in database
    database.ref('ball/position').set({
    x:ball.x+x,
    y:ball.y+y
    })
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function read(data){
    position = data.val()
    ball.x = position.x;
    ball.y = position.y;
}
