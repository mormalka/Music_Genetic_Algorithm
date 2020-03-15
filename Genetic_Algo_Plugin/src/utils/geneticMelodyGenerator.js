import { Melody } from '../modules/melody'
import { calcMelodyFitVal } from './fitness'

export class GeneticMelodyGenerator{

    constructor(scale, populationSize){
        this.populationSize = populationSize

        // hard coding c major scale.
        // will be changed to input scale in the future.
        this.scale = [60, 62, 64, 65, 67, 69, 71, 72]

        //hard coding durations
        this.durations = [1, 0.5, 0.5, 0.25, 0.25, 0.25]

        this.population = this.generatePopulation(populationSize)

        this.NUMBER_OF_ITERATIONS = 100
    }

    run(){
        for(let i = 0 ; i < this.NUMBER_OF_ITERATIONS ; i++){
            this.calcMelodiesFitScore()
            this.createNewGeneration()
        }
        this.calcMelodiesFitScore()

        // return the melody with the maximum fitnessScore
        const maxMelody = this.population.reduce(function(prev, current) {
            return (prev.fitnessScore > current.fitnessScore) ? prev : current
        })

        return maxMelody
    }
    
    generatePopulation(){
        let population = []
        for(let i = 0 ; i < this.populationSize ; i++){
            population.push(new Melody(this.scale, this.durations))
        }
        return population
    }

     createNewGeneration() {
        this.population.sort((a,b) => {return b.fitnessScore - a.fitnessScore}) //sorting max to min score

        let newGeneration = this.generatePopulation(this.population.length)
        
        //init 1/2 of the population to be a permutaion of the first half maximum melodies 
        //NOTICE the other half of the new generation is random melodies
        for(let i = 0 ; i < (this.populationSize / 2) ; i++){ 
            let parentA =this.population[i]
            let parentB =this.population[i+1]

            let child = newGeneration[i]
             

            //intialize the first three tabs to be identical to parent A tabs, and the last same as parentB
            child.tabs[0] = parentA.tabs[0]
            child.tabs[1] = parentB.tabs[1]
            child.tabs[2] = parentA.tabs[2]
            child.tabs[3] = parentB.tabs[3]          
        }

        this.population = newGeneration //set the new genration to be the current population

    }

    calcMelodiesFitScore() {
        this.population.forEach(melody => {
            let fitVal = calcMelodyFitVal(melody)
            melody.setFitnessScore(fitVal)// set the fitnessValue attribute of the melody to 'fitval'

        })
    }
}