import { Melody } from '../modules/melody'
import { Fitness } from './fitness'

export class GeneticMelodyGenerator{

    constructor(scale, populationSize){
        this.populationSize = populationSize

        // hard coding  major scale.
        // will be changed to input scale in the future.
        this.scale = [60, 62, 64, 65, 67, 69, 71, 72]

        this.population = this.generatePopulation(populationSize)

        this.NUMBER_OF_ITERATIONS = 100
    }

    run(){
        for(let i = 0 ; i < this.NUMBER_OF_ITERATIONS ; i++){
            this.culcMelodiesFitScore()
            this.createNewGeneration()
        }

        // return the melody with the maximum fitnessScore (!!! recheck the imlementetion of this line !!!)
        return Math.max(...this.population.map(melody => melody.fitnessScore))
    }
    
    generatePopulation(){
        let population = []
        for(let i = 0 ; i < this.populationSize ; i++){
            population.push(new Melody(this.scale))
        }
        return population
    }

    // TODO:
    createNewGeneration() {

    }

    // TODO:
    culcMelodiesFitScore() {
        this.population.forEach(melody => {
            let fitVal = Fitness.culcMelodyFitVal(melody)
            
            // TODO: set the fitnessValue attribute of the melody to 'fitval'

        })
    }
}