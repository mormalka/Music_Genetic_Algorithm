import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'

console.log("Start the plugin...");

// the scale here just for test perpuses. it will be located in the genetic class
const scale = [60, 62, 64, 65, 67, 69, 71, 72]
var midiChannel
var sequenceChannel
var run_btn

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
    run_btn = document.getElementById('run_and_play')
    run_btn.onclick = runAndPlay
}


function runAndPlay() {  
    //initialize a new genetic generator with a population of 100 melodies.
    const genetic = new GeneticMelodyGenerator('C', 100)
    console.log(genetic)

    // run the algorithm.
    //* returns the choosen melody.
    const resultMelody = genetic.run()
    console.log(resultMelody)

    // play the melody
    let notes = resultMelody.getAsNotesArray()
    let index = 0
    // setInterval(() => {
    //     if (index >= notes.length) return
    // }, 1000)

   // playNotes(notes, 0)
    // for(let i = 0 ; i < notes.length ; i++ ){
    //     midiChannel.postMessage({type: 'note-on', pitch: notes[i].midi, velocity: 100});
    //     await setTimeout(function(){
    //         console.log('sec')
    //     } ,1000)
    //     midiChannel.postMessage({type: 'note-off', pitch: notes[i].midi, velocity: 100});
    // }

    sequenceChannel.postMessage({type: 'play-pattern', sequence: MidiEvents})
    setTimeout(() => {sequenceChannel.postMessage({type: 'play-pattern', sequence: MidiEvents})}, 1000)
}

function playNotes(notes, index){
    if (index >= notes.length) return

    setTimeout( () => {

    }, 1000)
}

