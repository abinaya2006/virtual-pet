//Create variables here
var  dog;
var dogImage,dogImage2;
var happyDog;
var database;
var foodS;
var foodStock;
var addFood,feedFood
var fedTime, lastFed,foodObj;


function preload()
{
  //load images here
dogImage=loadImage("dogImg.png");
dogImage2=loadImage("dogImg1.png");
milk=loadImage("bowl.png")

}

function setup() {
  
	createCanvas(1300, 580);


  database = firebase.database();

  ground=createSprite(200,600,5555,300)
  ground.shapeColor="lightgreen"

  dog=createSprite(1049,375);
  dog.addImage(dogImage);
  dog.scale = 0.3;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
 // foodStock.set(20);

food=new Food()

  fedTime=database.ref('fedTime')
  fedTime.on("value",function(data){
    fedTime=data.val()
  })

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  

 
 
  feedFood=createButton('Feed 🥛')
  feedFood.position(1000,100)
  feedFood.mousePressed(feedDog)
  addfood=createButton('add 🥛')
  addfood.position(900,100)
  addfood.mousePressed(addFood)

  bowl=createSprite(940,430)
  bowl.addImage(milk)
  bowl.scale=0.15

  input = createInput("Name of your dog");
  input.position(600,200)
  button = createButton('Play');
  button.position(650,240)
  greeting = createElement('h3');
  button.mousePressed(()=>{
    input.hide()
    button .hide()
    name = input.value();
    greeting.html("Hello I am your pet dog "+name+"🐶")
   greeting .position(500,100)
    
  })
 

}
function draw() 
{ background("#CAD9F1");
  
  currentTime = hour();

  food.display()


  drawSprites();
  fill ("red")
  textSize(30)
  if(fedTime>=12){
    text("last feed:"+fedTime%12 +"pm",350,30)
  }else if(fedTime==0){
    text("last fed: 12 am",350,30)
  }
  else{
    text("last feed: "+fedTime+"am",350,30)
  }
 

}
function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}



function feedDog()
{
    dog.addImage(dogImage2);
    foodS--;
  
    bowl.visible=true
    database.ref('/').update({
      Food : foodS
    })
    fedTime = hour(); 
}
function addFood()
{
  dog.addImage(dogImage);
  bowl.visible=false
  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
  
}



