// FIT2102 2018 Assignment 1
// https://docs.google.com/document/d/1woMAgJVf1oL3M49Q8N3E1ykTuTu5_r28_MQPVS5QIVo/edit?usp=sharing

function pong() {
  // Inside this function you will use the classes and functions 
  // defined in svgelement.ts and observable.ts
  // to add visuals to the svg element in pong.html, animate them, and make them interactive.
  // Study and complete the tasks in basicexamples.ts first to get ideas.

  // You will be marked on your functional programming style
  // as well as the functionality that you implement.
  // Document your code!  
  // Explain which ideas you have used ideas from the lectures to 
  // create reusable, generic functions.


  //The ideas that I used from the lecture is to create Observables which is Functional Programming rather
  //than using if and else statement which is not efficient enough. The ideas involved using Observable.map
  //.flatmap , .filter and etc
  //In this function pong, we would create a full functional pong game.

  
  function Paddle1(){
  //This function is used to create the paddle and move the paddle up and down using your own mouse. 
  // The ideas that I used from the lecture  is how to use oversable to use the  mouse movement to move the paddle.
  //As we can see, when we use call the Observable, we must determine what mouse event that want to execute and the
  // mouse event that I used is called the mouse move event
  // When I move my mouse, the paddle would move at the same time

  //This part of the code is to create a new element call the rectangle
    const 
    svg = document.getElementById("canvas")!,
    svgRect=svg.getBoundingClientRect()
    const
    rect = new Elem(svg, 'rect')
            .attr('x', 20)    .attr('y', 300)
            .attr('width', 10).attr('height', 70)
            .attr('fill', 'blue');
    
  //This part of the code is to use mouse to control the paddle. After determining, I would return the rect (paddle) to be used 
  //in the following function. The changes that I made from the basicexample.ts is to modify the dragRectangle code which uses 
  //mousedown and later mouseup for the event but as for my case I only use mousemove event to move the paddle
    Observable.fromEvent<MouseEvent>(svg, "mousemove")
        .map(({clientY}) => ({y: clientY }))
        .filter(({y})=> ((Number(y)+Number(rect.attr('height'))-svgRect.top<=600) &&Number(y)-svgRect.top>=0))
    .subscribe(({y})=>rect.attr('y', Number(y)-Number(rect.attr('height'))/2-svgRect.top))
  return rect
  
}
  function Paddle2(){
  //This function is used to create the paddle and move the paddle up and down using your own mouse. 
  // The ideas that I used from the lecture  is how to use oversable to use the  mouse movement to move the paddle.
  //As we can see, when we use call the Observable, we must determine what mouse event that want to execute and the
  // mouse event that I used is called the mouse move event
  // When I move my mouse, the paddle would move at the same time

  //This part of the code is to create a new element call the rectangle. We would not need to do any mouse event here
  //as this paddle will be controlled by the AI(we will see soon below). We still return the rect1 (paddle) to be used later 
  // in the other function
  const
  svg = document.getElementById("canvas")!,
  
    rect1= new Elem(svg, 'rect')
    .attr('x', 560)    .attr('y', 300)
    .attr('width', 10).attr('height', 70)
    .attr('fill', 'red')
  return rect1
  }

  function balltoAIlvl1(ballvelocityx:number,computerspeed1:number){
  //This part of the function is used to create the ball, divider, player score, AI score, playerscore board, AI score board
  //and the PLAYER and AI text when they win
  //This function is the most important function as we would create an Observable to observe the ball movement throughout the whole game.
  //Furthermore, it is used to observe the ball when in contact with the paddle and how we wants to ball to be reflected or probably refracted
  //In the ball Observable, it also tracks the score of the players and AI and display their score when either of them
  //reach 11 first. 

  //This part of the code is to create a divider which is the middle line of the canvas
    const
    svg=document.getElementById("canvas")!
  const
    divider = new Elem(svg, 'rect')
  .attr('x', 300)    .attr('y', 0)
  .attr('width', 5).attr('height', 600)
  .attr('fill', 'grey');;
    
  // This part of the code is to create the ball. All the attributes set for the ball is shown below
    const
    circle  = new Elem(svg, 'circle')
    .attr('cx', 300)    
    .attr('cy', 310)
    .attr('r',5)
    .attr('fill', 'white');
  
  //This part of the code is to create the player score. All the attributes set for the player score is shown below
    let
    scoreplayer= new Elem(svg,'text')
    .attr('x',150)
    .attr('y',100)
    .attr('font-family','Courier New')
    .attr('fill','blue')
    .attr('font-size',30)

  //This part of the code is to create the AI score. All the attributes set for the AI score is shown below
    let
    scoreAI= new Elem(svg,'text')
    .attr('x',440)
    .attr('y',100)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)
    
  //This part of the code is to create the player text. All the attributes set for the player text is shown below
    let playerboard=new Elem(svg,'text')
    .attr('x',50)
    .attr('y',50)
    .attr('font-family','Courier New')
    .attr('fill','blue')
    .attr('font-size',30)

    //This part of the code is to create the AI text. All the attributes set for the AI text is shown below
    let AIboard=new Elem(svg,'text')
    .attr('x',370)
    .attr('y',50)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)

    //This part of the code is to create a text when the player wins the game. All the attributes set for the player text is shown below
    let playerwin=
    new Elem(svg,'text')
    .attr('x',70)
    .attr('y',300)
    .attr('font-family','Courier New')
    .attr('fill','blue')
    .attr('font-size',30)

    //This part of the code is to create a text when the AI wins the game. All the attributes set for the AI text is shown below.
    let aiwin=
    new Elem(svg,'text')
    .attr('x',400)
    .attr('y',300)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)
    
    //This part of the code is to create a text when the AI wins
    let refreshboard1=
    new Elem(svg,'text')
    .attr('x',315)
    .attr('y',320)
    .attr('font-family','Courier New')
    .attr('fill','pink')
    .attr('font-size',15)

    //This part of the code is to create a text when player wins
    let refreshboard2=
    new Elem(svg,'text')
    .attr('x',15)
    .attr('y',320)
    .attr('font-family','Courier New')
    .attr('fill','pink')
    .attr('font-size',15)

    //All the variables are being set here
   
    AIboard.elem.textContent="AI score"
    playerboard.elem.textContent= "Player score"
    scoreplayer.elem.textContent="0"
    scoreAI.elem.textContent="0"
    let playerscore=0
    let AIscore =0
    let rect1=Paddle1()
    let rect2=Paddle2()
    //Math.random() is used here to  only generate positive or negative numbers
    let ballvelocityy=Math.random()*2-1
    let computerspeed=2
    

    // This part of the code is where the Observable starts where we determine how the ball would move in the canvas.
    //Observable.interval(1) means in every 1 milli seconds, it will execute the code continuously until a certain condition
    let ballmove= Observable.interval(1)
    
    //This code is to reset the position of the ball whenever the player or AI score a point.
    ballmove.filter(({})=>Number(circle.attr('cx'))>600 || Number(circle.attr('cx'))<0)
    .subscribe(()=>{circle.attr('cx',300)
                    circle.attr('cy',310)})

    //This code shows that the ball is moving to the right whenever it resets
    ballmove
    .subscribe(({})=>{
                            circle.attr('cy',(Number(circle.attr('cy'))+ballvelocityy))
                            circle.attr('cx',(Number(circle.attr('cx'))+ballvelocityx))
              })
    
   
    // This code is used for paddle 1 (Players paddle) where the ball meets the  player paddle (-velocity) it will change the velocity of the ball to - and - = +,
    // where the ball will move to the right. There are lots of subtraction of radius of the ball that we see below which is used to obtain the most left side of the ball.
    //There are some additional of width of the paddle to obtain the right side of the rectangle
    //To summarise the code, when the position of the ball>paddle, it would change the direction of the ball
    //Some boundry cases are used below

    ballmove
      .filter(({})=> ((Number(circle.attr('cx')))-(Number(circle.attr('r')))>0  && (Number(circle.attr('cx')))-(Number(circle.attr('r'))) <600) && (ballvelocityx<0))
      .filter(()=> (Number(circle.attr('cx'))) > (Number(rect1.attr('x')))+Number(rect1.attr('width')))
      .filter(()=> (Number(circle.attr('cx')) - Number(circle.attr('r'))) < (Number(rect1.attr('x')))+Number(rect1.attr('width')))
      //The code below portrays that when the paddle move down and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the right
      .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r'))) > (Number(rect1.attr('y'))))
      //The code below portrays thats when the paddle move up and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the right
      .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r'))) < (Number(rect1.attr('y'))) + Number(rect1.attr('height')))
      .subscribe(({})=>{  
                circle.attr("fill",'blue')
                          ballvelocityx=-ballvelocityx
                          ballvelocityy=Math.random()*2-1})
   
   
    // This code is used for paddle 2(AI paddle) where the ball meets the  AI paddle (+velocity) it will change the velocity of the ball to + and - = -,
    // where the ball will move to the left. There are lots of addition of radius of the ball that we see below which is used to obtain the most right side of the ball.
    //There are no need of additional of width of the paddle to obtain the left side of the rectangle
    //To summarise the code, when the position of the ball>paddle, it would change the direction of the ball
    //Some boundry cases are used below
    ballmove
    .filter(({})=>ballvelocityx>0)
    .filter(()=> (Number(circle.attr('cx')))<(Number(rect2.attr('x'))))
       .filter(()=> (Number(circle.attr('cx'))+Number(circle.attr('r')))>(Number(rect2.attr('x')))) 
       //The code below portrays thats when the paddle move up and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the left
       .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r')))>(Number(rect2.attr('y'))))
       //The code below portrays that when the paddle move down and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the left
        .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r')))<(Number(rect2.attr('y'))+Number(rect2.attr('height'))))
      //When the ball in contact with the paddle, it would generate a random number to determine the position of the ball
      .subscribe(({})=>{  
                          circle.attr("fill",'red')
                          ballvelocityx=-ballvelocityx
                          ballvelocityy=Math.random()*2-1})
    
    // AI move
    // This code is to make the paddle follow the velocity of the ball a.k.a AI where the computer would play the game with player.
        ballmove.
     filter(({})=>(Number(rect2.attr('y')))+(Number(rect2.attr('height'))/2)> Number(circle.attr('cy')))
    .filter(({})=>(Number(rect2.attr('y'))>0 && Number(rect2.attr('y'))<600))
     .subscribe(({})=> {
             rect2.attr('y',Number(rect2.attr('y'))-computerspeed1)})
    
    ballmove
    .filter(({})=>(Number(rect2.attr('y')))+(Number(rect2.attr('height'))/2)< Number(circle.attr('cy')))
     .subscribe(({})=> {
             rect2.attr('y',Number(rect2.attr('y'))+computerspeed1)}) 

    
   
    
    //This code is for when the ball touch the bottom border of the canvas. It has the same concept with how the ball move to the right
    // but the this time the ball move from the bottom to the top.There are some boundary cases that we do here which it must always
    //be in the range of the canvas
    ballmove
    .filter(({})=> (Number(circle.attr('cy')))+(Number(circle.attr('r'))/2)>0)
    .filter(({})=>(Number(circle.attr('cy')))+(Number(circle.attr('r'))/2) >600)
    .subscribe(({})=>{
                
                ballvelocityy=-ballvelocityy
                })

     //This code is for when the ball touch the top border of the canvas. It has the same concept with how the ball move to the right
    // but the this time the ball will move from the top to the bottom. There are some boundary cases that we do here which it must always
    //be in the range of the canvas
    ballmove
    .filter(({})=> (Number(circle.attr('cy')))-(Number(circle.attr('r'))/2)<0)
    .filter(({})=>(Number(circle.attr('cy')))-(Number(circle.attr('r'))/2) <600)
    .subscribe(({})=>{
             
                ballvelocityy=-ballvelocityy})
      
      
     //This part of the code is when the AI score, it would increase the score board of the AI
      //I divide it by 1/5 because all of this condition go through 5 times so we divide it by 5 and round it off to 1
     ballmove
     .filter(()=> AIscore<=11)
     .filter(({})=> (Number(circle.attr('cx')))+(Number(circle.attr('r'))/2) >600)
      .subscribe(({})=>{scoreplayer.elem.textContent=String(Math.round(AIscore=AIscore+1/5))
        


      })
        //This part of the code is when the player score, it would increase the score board of the player
      //I divide it by 1/5 because all of this condition go through 5 times so we divide it by 5 and round it off to 1         
     ballmove
     .filter(()=> playerscore<=11)
     .filter(({})=> (Number(circle.attr('cx')))-(Number(circle.attr('r'))/2)<1  || (Number(circle.attr('cx')))+(Number(circle.attr('r'))/2) >600 && (ballvelocityx<0))
    
      .subscribe(({})=>{scoreAI.elem.textContent=String(Math.round(playerscore=playerscore+1/5))
        
        
     })
     //This part of the code is when the AI reach 11 points and it would reset everything.
     //The setTimeout is to reload the page 5 seconds after the game is won
    ballmove
    .filter(({})=> (Number(scoreAI.elem.textContent)===11))
    .subscribe(({})=>{
      computerspeed=0
      computerspeed1=0
      aiwin.elem.textContent="AI win"
      ballvelocityx=0
      ballvelocityy=0
      rect1.elem.remove()
      rect2.elem.remove()
      circle.elem.remove()
      refreshboard1.elem.textContent= "The page will refresh in 5 secs"
      setTimeout("location.reload(true);",5000)
      })
      
      //This part of the code is when the player reach 11 points and it would reset everything.
     //The setTimeout is to reload the page 5 seconds after the game is won
      ballmove.filter(({})=> (Number(scoreplayer.elem.textContent)===11))
    .subscribe(({})=>{
      computerspeed=0
      computerspeed1=0
      playerwin.elem.textContent="Player win"
      rect1.elem.remove()
      rect2.elem.remove()
      circle.elem.remove()
      ballvelocityx=0
      ballvelocityy=0
      refreshboard2.elem.textContent= "The page will refresh in 5 secs"
      setTimeout("location.reload(true);",5000)

    return ballvelocityx
    })
  }

  
  function balltoAIlvlGodlike(ballvelocityx:number,computerspeed1:number){
    //This part of the function is used to create the ball, divider, player score, AI score, playerscore board, AI score board
  //and the PLAYER and AI text when they win
  //This function is the most important function as we would create an Observable to observe the ball movement throughout the whole game.
  //Furthermore, it is used to observe the ball when in contact with the paddle and how we wants to ball to be reflected or probably refracted
  //In the ball Observable, it also tracks the score of the players and AI and display their score when either of them
  //reach the highest score in 100 seconds


  // This part of the code is to create the ball. All the attributes set for the ball is shown below
    const
    svg=document.getElementById("canvas")!
    const
    circle  = new Elem(svg, 'circle')
    .attr('cx', 300)    
    .attr('cy', 310)
    .attr('r',5)
    .attr('fill', 'white');

  //This part of the code is to create the player score. All the attributes set for the player score is shown below
    let
    scoreplayer= new Elem(svg,'text')
    .attr('x',150)
    .attr('y',100)
    .attr('font-family','Courier New')
    .attr('fill','blue')
    .attr('font-size',30)

  //This part of the code is to create the AI score. All the attributes set for the AI score is shown below
    let
    scoreAI= new Elem(svg,'text')
    .attr('x',440)
    .attr('y',100)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)
    
  //This part of the code is to create the player text. All the attributes set for the player text is shown below 
    let playerboard=new Elem(svg,'text')
    .attr('x',50)
    .attr('y',50)
    .attr('font-family','Courier New')
    .attr('fill','blue')
    .attr('font-size',30)
    
  //This part of the code is to create the AI text. All the attributes set for the AI text is shown below
    let AIboard=new Elem(svg,'text')
    .attr('x',370)
    .attr('y',50)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)

   //This part of the code is to create a text when the player wins the game. All the attributes set for the player text is shown below
    let playerwin=
    new Elem(svg,'text')
    .attr('x',200)
    .attr('y',300)
    .attr('font-family','Courier New')
    .attr('fill','blue')
    .attr('font-size',30)
    
  //This part of the code is to create a text when the AI wins the game. All the attributes set for the AI text is shown below.
    let aiwin=
    new Elem(svg,'text')
    .attr('x',230)
    .attr('y',300)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)

  //This part of the code is to create a text when the AI and player have the same score
    let tiebreaker=new Elem(svg,'text')
    .attr('x',200)
    .attr('y',300)
    .attr('font-family','Courier New')
    .attr('fill','red')
    .attr('font-size',30)

  //This part of the code is to create a text when the page is gonna refresh
  let refreshboard=new Elem(svg,'text')
  .attr('x',170)
  .attr('y',330)
  .attr('font-family','Courier New')
  .attr('fill','pink')
  .attr('font-size',15)


  //This are all the variables declared below
    AIboard.elem.textContent="AI score"
    playerboard.elem.textContent= "Player score"
    scoreplayer.elem.textContent="0"
    scoreAI.elem.textContent="0"
    let playerscore=0
    let AIscore =0
    let rect1=Paddle1()
    let rect2=Paddle2()
    
    let ballvelocityy=3
    let computerspeed=2
   
  //This is the timer text attribute I created to display the time
    let timer=
    new Elem(svg,'text')
    .attr('x',290)
    .attr('y',120)
    .attr('font-family','Courier New')
    .attr('fill','pink')
    .attr('font-size',30)
    
    //This is the timer function where I set a timer for the players and AI to complete.
  //The timer that I set is in random seconds. The side which has the higher point wins,
  //This timer works by setting observable which has interval of 1 seconds and will decrement
  //the "watch1" by 1.
     let watch1=Math.round(Math.random()*100 -1)
    let observewatch=
    Observable.interval(1000)
    .filter(()=>watch1>=0)
    .map(()=>watch1=watch1-1)
    .subscribe(()=> timer.elem.textContent=String(watch1))

    
     // This part of the code is where the Observable starts where we determine how the ball would move in the canvas.
    //Observable.interval(5) means in every 5 milli seconds, it will execute the code continuously until a certain condition
    let ballmove= Observable.interval(5)
    
    //This code is to reset the position of the ball whenever the player or AI score a point.
    ballmove.filter(({})=>Number(circle.attr('cx'))>600 || Number(circle.attr('cx'))<0)
    .subscribe(()=>{circle.attr('cx',300)
                    circle.attr('cy',310)})
    
    //This code shows that the ball is moving to the right whenever it resets
    ballmove
    .subscribe(({})=>{
                            circle.attr('cy',(Number(circle.attr('cy'))+ballvelocityy))
                            circle.attr('cx',(Number(circle.attr('cx'))+ballvelocityx))
                            
              })
    
    
     // This code is used for paddle 1 (Players paddle) where the ball meets the  player paddle (-velocity) it will change the velocity of the ball to - and - = +,
    // where the ball will move to the right. There are lots of subtraction of radius of the ball that we see below which is used to obtain the most left side of the ball.
    //There are some additional of width of the paddle to obtain the right side of the rectangle
    //To summarise the code, when the position of the ball>paddle, it would change the direction of the ball
    //Some boundry cases are used below
    ballmove
      .filter(({})=> ((Number(circle.attr('cx')))-(Number(circle.attr('r')))>0  && (Number(circle.attr('cx')))-(Number(circle.attr('r'))) <600) && (ballvelocityx<0))
      
      .filter(()=> (Number(circle.attr('cx'))) > (Number(rect1.attr('x')))+Number(rect1.attr('width')))
      .filter(()=> (Number(circle.attr('cx')) - Number(circle.attr('r'))) < (Number(rect1.attr('x')))+Number(rect1.attr('width')))
      //The code below portrays that when the paddle move down and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the right
      .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r'))) > (Number(rect1.attr('y'))))
      //The code below portrays thats when the paddle move up and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the right
      .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r'))) < (Number(rect1.attr('y'))) + Number(rect1.attr('height')))
      //I would random the ballvelocity of y to make the ball bounce in a direction that we cannot predict
      .subscribe(({})=>{  
                circle.attr("fill",'blue')
                
                          ballvelocityx=-ballvelocityx
                          ballvelocityy=Math.random()*4-2})
   
     // This code is used for paddle 2(AI paddle) where the ball meets the  AI paddle (+velocity) it will change the velocity of the ball to + and - = -,
    // where the ball will move to the left. There are lots of addition of radius of the ball that we see below which is used to obtain the most right side of the ball.
    //There are no need of additional of width of the paddle to obtain the left side of the rectangle
    //To summarise the code, when the position of the ball>paddle, it would change the direction of the ball
    //Some boundry cases are used below
    ballmove
    .filter(({})=>ballvelocityx>0)
    .filter(()=> (Number(circle.attr('cx')))<(Number(rect2.attr('x'))))
       .filter(()=> (Number(circle.attr('cx'))+Number(circle.attr('r')))>(Number(rect2.attr('x'))))
       //The code below portrays thats when the paddle move up and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the left
       .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r')))>(Number(rect2.attr('y'))))
         //The code below portrays that when the paddle move down and not touching the ball, the ball can pass through
      //If we dont set this condition, when the ball >paddle, it would bounce back to the left
        .filter(()=> (Number(circle.attr('cy'))+Number(circle.attr('r')))<(Number(rect2.attr('y'))+Number(rect2.attr('height'))))
         //I would random the ballvelocity of y to make the ball bounce in a direction that we cannot predict
      .subscribe(({})=>{  
                          circle.attr("fill",'red')
                          
                          ballvelocityx=-ballvelocityx
                          ballvelocityy=Math.random()*4-2})
    
     
    // This code is to make the paddle follow the velocity of the ball a.k.a AI where the computer would play the game with player.
    ballmove.
     filter(({})=>(Number(rect2.attr('y')))+(Number(rect2.attr('height'))/2)> Number(circle.attr('cy')))
    .filter(({})=>(Number(rect2.attr('y'))>0 && Number(rect2.attr('y'))<600))
     .subscribe(({})=> {
             rect2.attr('y',Number(rect2.attr('y'))-computerspeed1)})
    
    ballmove
    .filter(({})=>(Number(rect2.attr('y')))+(Number(rect2.attr('height'))/2)< Number(circle.attr('cy')))
    
     .subscribe(({})=> {
             rect2.attr('y',Number(rect2.attr('y'))+computerspeed1)}) 

   
    //This code is for when the ball touch the bottom border of the canvas. It has the same concept with how the ball move to the right
    // but the this time the ball move from the bottom to the top.There are some boundary cases that we do here which it must always
    //be in the range of the canvas
    ballmove
    .filter(({})=> (Number(circle.attr('cy')))+(Number(circle.attr('r'))/2)>0)
    .filter(({})=>(Number(circle.attr('cy')))+(Number(circle.attr('r'))/2) >600)
    //At this case I would randomise the ball velocity of x so we would not predict where the ball gonna bounce either to the player or the AI
    .subscribe(({})=>{
                ballvelocityx=Math.random()*4-2
                ballvelocityy=-ballvelocityy
                })
  
    //This code is for when the ball touch the top border of the canvas. It has the same concept with how the ball move to the right
    // but the this time the ball will move from the top to the bottom. There are some boundary cases that we do here which it must always
    //be in the range of the canvas
    ballmove
    .filter(({})=> (Number(circle.attr('cy')))-(Number(circle.attr('r'))/2)<0)
    .filter(({})=>(Number(circle.attr('cy')))-(Number(circle.attr('r'))/2) <600)
    //At this case I would randomise the ball velocity of x so we would not predict where the ball gonna bounce either to the player or the AI
    .subscribe(({})=>{
                ballvelocityx=Math.random()*4-2
                ballvelocityy=-ballvelocityy})
      
    
    //This part of the code is when the AI score, it would increase the score board of the AI
    //I divide it by 1/5 because all of this condition go through 5 times so we divide it by 5 and round it off to 1
    
     ballmove
     .filter(({})=> (Number(circle.attr('cx')))+(Number(circle.attr('r'))/2) > 600 )
      .subscribe(({})=>{scoreplayer.elem.textContent=String(Math.round(AIscore=AIscore+1/5))
        


      })
    //This part of the code is when the player score, it would increase the score board of the player
      //I divide it by 1/5 because all of this condition go through 5 times so we divide it by 5 and round it off to 1    
     ballmove
     .filter(({})=> (Number(circle.attr('cx')))-(Number(circle.attr('r'))/2)<1  || (Number(circle.attr('cx')))+(Number(circle.attr('r'))/2) >600 && (ballvelocityx<0))

      .subscribe(({})=>{scoreAI.elem.textContent=String(Math.round(playerscore=playerscore+1/5))
        })
     
    //This part of the code is to determine that AI will win and it would reset everything.
     //The setTimeout is to reload the page 5 seconds after the game is won
   ballmove
   .filter(({})=> Number(scoreAI.elem.textContent)>=0)
   .filter(({})=>watch1<0)
    .filter(({})=> ((Number(scoreAI.elem.textContent)> Number(scoreplayer.elem.textContent))))
    .subscribe(({})=>{
      timer.elem.remove()
      computerspeed=0
      computerspeed1=0
      aiwin.elem.textContent="AI WIN!"
      ballvelocityx=0
      ballvelocityy=0
      rect1.elem.remove()
      rect2.elem.remove()
      circle.elem.remove()
      refreshboard.elem.textContent="The page will fresh in 5 secs"
      setTimeout("location.reload(true);",5000)
     
      clearTimeout()
      })
    //This part of the code is to determine that player will win and it would reset everything.
     //The setTimeout is to reload the page 5 seconds after the game is won
      ballmove.filter(({})=> (Number(scoreplayer.elem.textContent)>Number(scoreAI.elem.textContent)))
      .filter(({})=>watch1<0)
      .filter(({})=> Number(scoreplayer.elem.textContent)>=0)
    .subscribe(({})=>{
      timer.elem.remove()
      computerspeed=0
      computerspeed1=0
      playerwin.elem.textContent="PLAYER WIN!"
      setTimeout("location.reload(true);",5000)
      rect1.elem.remove()
      rect2.elem.remove()
      circle.elem.remove()
      refreshboard.elem.textContent="The page will fresh in 5 secs"
      ballvelocityx=0
      ballvelocityy=0
      clearTimeout()
    })
     //This part of the code is to compare the score of the AI with the player and if it is a tie, it would execute this code
     //The setTimeout is to reload the page 5 seconds after the game is won
     ballmove
     .filter(({})=> Number(scoreplayer.elem.textContent)>=0 && Number(scoreAI.elem.textContent)>=0)
     .filter(({})=>watch1<0)
     .filter(({})=> (Number(scoreplayer.elem.textContent)===Number(scoreAI.elem.textContent)))
    .subscribe(({})=>{
      timer.elem.remove()
      computerspeed=0
      computerspeed1=0
      tiebreaker.elem.textContent="TIE BREAKER!"
      setTimeout("location.reload(true);",5000)
      rect1.elem.remove()
      rect2.elem.remove()
      circle.elem.remove()
      refreshboard.elem.textContent="The page will fresh in 5 secs"
      ballvelocityx=0
      ballvelocityy=0
      clearTimeout()
    return ballvelocityx
     
    })
  }

//This code to call the function above when the button is clicked in the webpage
const
svg1=document.getElementById('BalltoAI')!
Observable.fromEvent<MouseEvent>(svg1,"click")
.subscribe(()=>{ balltoAIlvl1(1,0.75) 
})

const
svg2=document.getElementById('BalltoAI2')!
Observable.fromEvent<MouseEvent>(svg2,"click")
.subscribe(()=>{ balltoAIlvl1(2,0.7) 
})

const
svg3=document.getElementById('BalltoAI3')!
Observable.fromEvent<MouseEvent>(svg3,"click")
.subscribe(()=>{ balltoAIlvl1(3,0.7) 
})

const
svg4=document.getElementById('BalltoAI4')!
Observable.fromEvent<MouseEvent>(svg4,"click")
.subscribe(()=>{ balltoAIlvlGodlike(3,1.5) 
})


}


  // the following simply runs your pong function on window load.  Make sure to leave it in place.
if (typeof window != 'undefined')
  window.onload = ()=>{
    pong()
    
    

  }

 

 