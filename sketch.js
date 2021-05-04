//inspired by https://www.atchareeya-j.com/post/dmx-hue-controller

var url = '192.168.2.142'; // the hub IP address
var username = 'LgPDQOgAPIbkFYMExjQrhk02YfLlrijaoBijJX0o'; 

// fill in your Hub-given username var resultDiv;
var dimmer; 
var lightNumber = 11;

var sequenceName = 'sequenceName';
var iflightup = false;
let timer = 15;
let a = 6;
let count = 0;
let button1;
let start = false;
let if1 = false; //All off
let if2 = false; //all up
let if3 = false; //Walk&openning
let if4 = false; //blue/purple flash
let if5 = false; //highlight face
let if6 = false; //walk&openning2
let if7 = false; //Changing CT
let if8 = false; //walk & openning (off)Changing CT (off)
let x = 10;
let timeInterval = 3000; //every 2 seconds as a Interval

function setup() {
  createCanvas(400,600);
  

  var offButton = createButton("OFF"); //light off all lights
  offButton.size(100, 100);
  offButton.style('color:white');
  offButton.position(10, x);
  offButton.mouseClicked(lightOff);
  offButton.style('background-color:#B10808');

  var onButton = createButton("ON"); //light up all lights
  onButton.size(100, 100);
  onButton.style('color:white');
  onButton.position(120, x);
  onButton.mouseClicked(lightUp);
  onButton.style('background-color:#1B9316');


  var seq2Button = createButton("PURPLE"); //light up all lights
  seq2Button.size(100, 100);
  seq2Button.style('color:white');
  seq2Button.position(10, x + 110);
  seq2Button.mouseClicked(color_purple);
  seq2Button.style('background-color:#7F25BB');

  

  var seq4Button = createButton("COOL"); //light up all lights
  seq4Button.size(100, 100);
  seq4Button.style('color:white');
  seq4Button.position(10, x + 220);
  seq4Button.mouseClicked(color_cool);
  seq4Button.style('background-color:#2027AC');

  var seq5Button = createButton("WARM"); //light up all lights
  seq5Button.size(100, 100);
  seq5Button.style('color:white');
  seq5Button.position(120, x + 220);
  seq5Button.mouseClicked(color_warm);
  seq5Button.style('background-color:#805111');
  
  /*
  slider = createSlider(0, 65000, 100);
  slider.position(10, x + 320);
  slider.style('width', '200px');
  let val = slider.value();
  hue_change(val);
  */
  
  connect();
}

function draw() {
  
  background(0);

}
/*
this function makes the HTTP GET call to get the light data:
HTTP GET http://your.hue.hub.address/api/username/lights/
*/
function connect() {
  url = "https://192.168.2.142/api/KZcGiCQg7eRHA6rqMoTMBdjMkoFjSHYX0FHDcXV0/lights/";
  httpDo(url, 'GET', getLights);
}

/*
this function uses the response from the hub
to create a new div for the UI elements
*/
function getLights(result) {
  //resultDiv.html(result);
}

function hue_change(val){
  var lightState = { // make a JSON object with it
    hue: val,
    on: true
  }
  
  // make the HTTP call with the JSON object:
  
    setLight(lightNumber, lightState);
}

function lightOff() {

  if1 = true;
  if2 = false;
  if3 = false;
  if4 = false;
  if5 = false;
  if6 = false;
  if7 = false;
  if8 = false;
  
  
  var lightState = { // make a JSON object with it
    //  bri: brightness,
    on: false
  }
  // make the HTTP call with the JSON object:
  
    setLight(lightNumber, lightState);

}

/*
0:30 - Model first reveal moment, (all lights on)
No colored lights
White bulbs (0, cold)
60% brightness
Winter themed
*/

function lightUp() {
  
  var brightness = 255; // get all lights light up 
  var lightState = {
    bri: brightness,
    on: true,
    hue:23000
  }
  // make the HTTP call with the JSON object:
 
    setLight(lightNumber, lightState);
  
}

function ifStart() {
  if (this.checked()) {
    start = true;
  } else {
    start = false;
    count = 0;
  }
}

function iflightoffChecked() {
  iflightup = false;
}

function iflightupChecked() {
  iflightup = true;
}

//PURPLE
function color_purple() {
  if4 = true;
  if2 = false;
  if3 = false;
  if1 = false;
  if5 = false;
  if6 = false;
  if7 = false;
  if8 = false;
  
  var lightState = {
    hue: 50431
    //on: true
  }
  // make the HTTP call with the JSON object:
 
    setLight(lightNumber, lightState);
}

//COOL
function color_cool() {

  
  var lightState3 = { // Top SR blue 41579
    bri: 255,
    sat: 255,
    hue: 41579
    //on: true
  }
  setLight(lightNumber, lightState3);
  

}
//purple flash
function color_warm() {

  var lightState = { // make a JSON object with it
    bri: 0,
    //on: true
  }
  setLight(lightNumber, lightState);

  var lightState2 = { // Back SL bri:255
    bri: 255,
    ct: 153
    //on: true
  }
  setLight(lightNumber, lightState2);

  var lightState3 = { // Top SR blue 50431
    bri: 255,
    sat: 255,
    hue: 255,
    on: true
  }
  setLight(lightNumber, lightState3);

  

  
}





function setLight(whichLight, data) {
  var path = url + whichLight + '/state/';

  var content = JSON.stringify(data); // convert JSON obj to string

  httpDo(path, 'PUT', content, 'text', getLights); //HTTP PUT the change
}