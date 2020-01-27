import { initialize } from '@muzilator/sdk';
import { GeneticMelodyGenerator } from './utils/geneticMelodyGenerator'

console.log("Start the plugin...");

// the scale here just for test perpuses. it will be located in the genetic class
const scale = [60, 62, 64, 65, 67, 69, 71, 72]

//initialize a new genetic generator with a population of 100 melodies.
const genetic = new GeneticMelodyGenerator('C', 100)

// run the algorithm.
//* returns the choosen melody.
const resultMelody = genetic.run()

// TEST PRINTS: 
console.log(genetic)


