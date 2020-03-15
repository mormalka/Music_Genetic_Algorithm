import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'
import * as Tone from "tone";

console.log("Start the plugin...");

// the scale here just for test perpuses. it will be located in the genetic class
export const scale = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84]
const POPULATION_SIZE = 1000
var resultMelody
var run_btn
var play_btn

window.onload = () => {
    run_btn = document.getElementById('run_btn')
    play_btn = document.getElementById('play_btn')
    run_btn.onclick = run
    play_btn.onclick = play
}

function run() {  
    //initialize a new genetic generator with a population of 100 melodies.
    const genetic = new GeneticMelodyGenerator('C', POPULATION_SIZE)
    console.log(genetic)

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


