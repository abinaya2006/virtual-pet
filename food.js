class Food{

  constructor(){
    this.foodStock; 
    this.lastFed;

    this.image=loadImage("bowl.png")

  }

  getFoodStock(){
    return this.foodStock;
  }

  updateFoodStock(foodStock){
    this.foodStock = foodStock;
  }

  deductFoodStock(){
    if(this.foodStock > 0)
    {
        this.foodStock = this.foodStock-1;
    }
  }

  getFedTime(fedTime)
  {
      this.fedTime = fedTime;
  }

  display(){

    var x=80,y=100;

    imageMode (CENTER)
   
  

    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){

        if(i%10==0){
          x=80;
          y=y+50;

        }

        image(this.image,x,y,50,50)
       
        x=x+40
      }
    }
  }
}