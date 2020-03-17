import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'
import * as Tone from "tone";

console.log("Start the plugin...");

// the scale here just for test perpuses. it will be located in the genetic class
export const scale = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84]
var inputScale 
const POPULATION_SIZE = 100
var resultMelody
var gen_btn
var run_btn
var play_btn

// TODO: mor, this is the array you need to work with.
var fitnessWeights = []

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
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    inputScale = o.querySelector("label").innerHTML;
    console.log(inputScale)
    optionsContainer.classList.remove("active");
  });
});

function gen() {

  //initialize a new genetic generator with a population of 100 melodies.
  genetic = new GeneticMelodyGenerator('C', POPULATION_SIZE)
  console.log(genetic)
}

function run() {  
    // run the algorithm.
    //* returns the choosen melody.
    resultMelody = genetic.run()
    console.log(resultMelody)
}

function play() {
  // clear the last melody if there is one
  Tone.Transport.clear()

  if(resultMelody == undefined) {
    alert('Please Generate a melody first')
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


