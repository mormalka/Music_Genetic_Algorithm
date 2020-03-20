import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'
import * as Tone from "tone";

console.log("Start the plugin...");

// the scale here just for test perpuses. it will be located in the genetic class
export const scale = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84]

// TODO: mor, this is the array you need to work with.
export var fitnessWeights = [0.25, 0.25, 0.5]

// init global variables
var inputScale 
var scaleType
const POPULATION_SIZE = 100
var resultMelody
var gen_btn
var run_btn
var play_btn
let genetic

window.onload = () => {
    gen_btn = document.getElementById('gen_btn')
    run_btn = document.getElementById('run_btn')
    play_btn = document.getElementById('play_btn')
    gen_btn.onclick = gen
    run_btn.onclick = run
    play_btn.onclick = play
}

//dropdown 
const selected = document.getElementsByClassName("selected");
const optionsContainer = document.getElementsByClassName("options-container");

const optionsList1 = document.querySelectorAll(".dd1");
const optionsList2 = document.querySelectorAll(".dd2");


for (let i = 0 ; i < selected.length ; i++ ){
  selected[i].addEventListener("click", () => {
    optionsContainer[i].classList.toggle("active");
  });
}
optionsList1.forEach(o => {
  o.addEventListener("click", () => {
    selected[0].innerHTML = o.querySelector("label").innerHTML;

    // this is where we get the data
    inputScale = o.querySelector("label").innerHTML;
    console.log('selected scale: ' + inputScale)

    optionsContainer[0].classList.remove("active");
  });
});

optionsList2.forEach(o => {
  o.addEventListener("click", () => {
    selected[1].innerHTML = o.querySelector("label").innerHTML;

    // this is where we get the data
    scaleType = o.querySelector("label").innerHTML;
    console.log('selected scale type: ' + scaleType)

    optionsContainer[1].classList.remove("active");
  });
});

// Range Sliders logic 



//initialize a new genetic generator with a population of 100 melodies.
function gen() {  
  console.log(inputScale + scaleType)
  genetic = new GeneticMelodyGenerator(inputScale, scaleType, POPULATION_SIZE)
  console.log(genetic)
}

// run the genetic algorithm.
//* returns the choosen melody.
function run() {  
  if(genetic == undefined) {
    alert('Please Generate an initial population of melodies first')
    return
  }

    resultMelody = genetic.run()
    console.log(resultMelody)
}

//play the result melody
function play() {
  // clear the last melody if there is one
  Tone.Transport.clear()

  if(resultMelody == undefined) {
    alert('You need to first run the genetic algorithm in order to play the resulting melody.')
    return
  }

  var synth = new Tone.Synth().toMaster()

  //pass in an array of events
  var part = new Tone.Part(function(time, event){
    //the events will be given to the callback with the time they occur
    synth.triggerAttackRelease(event.note, event.dur, time)
  },
  resultMelody.getAsToneJsObjArray())

  //start the part at the beginning of the Transport's timeline
  part.start(0)

  // play
  Tone.Transport.toggle()

}


