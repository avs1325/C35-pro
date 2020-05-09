//create variables
var database;
var yesButton, noButton;
var yesRecord, noRecord, totalRecord;
var yes, no, total;
var Yes, No, Total;
var gameState = 0;

function setup() {
  createCanvas(800,400);
  //initialize the firebase
  database = firebase.database();

  //create the buttons
  yesButton = createButton("YES");
  noButton = createButton("NO");

  //call values from the database
  yes = database.ref('records/yes');
  yes.on("value", readYes, showError);

  no = database.ref('records/no');
  no.on("value", readNo, showError);

  total = database.ref('records/total');
  total.on("value", readTotal, showError);
 
 
}

function draw() {
  background(255,255,0); 

  if (yesRecord != undefined && noRecord != undefined && totalRecord != undefined){

    yesButton.position(375, 200);
    noButton.position(425, 200);

    console.log(totalRecord, yesRecord, noRecord);
    //text("Should schools convert from regular textBooks to electronic textbooks?");

    if (gameState === 0){
      text("Should schools convert from regular textBooks to electronic textbooks?", 235, 175);

      noButton.mousePressed(function(){
        noButton.hide();
        yesButton.hide();

        totalRecord++
        noRecord++

        writeNo(yesRecord, noRecord, totalRecord);
        console.log("NO");
        gameState = 1;
      })

        yesButton.mousePressed(function(){
        yesButton.hide();
        noButton.hide();

        yesRecord++
        totalRecord++

        writeNo(yesRecord, noRecord, totalRecord);
        console.log("YES");
        gameState = 1;
        })
    }

    if (gameState === 1){
      text("Thank you for your response.", 10, 200)
      text("There have been " + totalRecord + " who have given their opinions on this matter and out of that " + yesRecord + " people agree with it and " + noRecord + " who disagree with it.", 10, 225);
    }
  }
}
function writeNo(yes, no, total){
  database.ref('records').set({
    'yes': yes,
    'no': no,
    'total': total
  })
}



function readYes(data){
  Yes = data.val();
  yesRecord = Yes;
}


function readNo(data){
  No = data.val();
  noRecord = No;
}


function readTotal(data){
  Total = data.val();
  totalRecord = Total;
}



function showError(){
  console.log("error in reading/ writing data base");
}
