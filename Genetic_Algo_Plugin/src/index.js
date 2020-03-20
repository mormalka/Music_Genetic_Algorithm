import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'
import * as Tone from "tone";

console.log("Start the plugin...");

// will be filled by the range sliders
export var fitnessWeights = []

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
    // set the buttons
    gen_btn = document.getElementById('gen_btn')
    gen_btn.onclick = gen

    run_btn = document.getElementById('run_btn')
    run_btn.onclick = run

    play_btn = document.getElementById('play_btn')
    play_btn.onclick = play
    
    // set the range sliders
    let rangeSliders = document.getElementById('rage_sliders_form')
    for(let i = 0 ; i < rangeSliders.length ; i++) {
      let element = rangeSliders[i]
      if (element.localName !== "input") return
      fitnessWeights.push(element.valueAsNumber)
    }
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
  if(inputScale == undefined || scaleType == undefined) {
    alert('Please choose your melody settings first')
    return
  }
  console.log(inputScale + scaleType)
  genetic = new GeneticMelodyGenerator(inputScale, scaleType, POPULATION_SIZE, fitnessWeights)
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


