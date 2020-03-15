import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'
import * as Tone from "tone";

console.log("Start the plugin...");

// the scale here just for test perpuses. it will be located in the genetic class
export const scale = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84]
var resultMelody
var midiChannel
var sequenceChannel
var run_btn
var play_btn

const MidiEvents = [
    {
      "type": "note-on",
      "pitch": 60,
      "velocity": 100,
      "timestamp": 0
    }, 
    {
      "type": "note-on",
      "pitch": 64,
      "velocity": 100,
      "timestamp": 0
    }, 
    {
      "type": "note-on",
      "pitch": 67,
      "velocity": 100,
      "timestamp": 0
    },
    {
      "type": "note-off",
      "pitch": 60,
      "velocity": 100,
      "timestamp": 0.5
    }, 
    {
      "type": "note-off",
      "pitch": 64,
      "velocity": 100,
      "timestamp": 0.5
    }, 
    {
      "type": "note-off",
      "pitch": 67,
      "velocity": 100,
      "timestamp": 0.5
    }
  ]


// initialize the midiChannel
window.addEventListener('load', () => {
    async function init() {
      var platform = await initialize()
      midiChannel = await platform.createChannel('midi')
      sequenceChannel = await platform.createChannel('sequence')

      midiChannel.start()
      sequenceChannel.start()
    }
    init()
  })
window.onload = () => {
    run_btn = document.getElementById('run_btn')
    play_btn = document.getElementById('play_btn')
    run_btn.onclick = run
    play_btn.onclick = play
}


function run() {  
    //initialize a new genetic generator with a population of 100 melodies.
    const genetic = new GeneticMelodyGenerator('C', 100)
    console.log(genetic)

    // run the algorithm.
    //* returns the choosen melody.
    resultMelody = genetic.run()
    console.log(resultMelody)
}

function play(){

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


