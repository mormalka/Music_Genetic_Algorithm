import { Melody } from '../modules/melody'
import { calcMelodyFitVal } from './fitness'

export class GeneticMelodyGenerator{

    constructor(scalePitch, scaleType, populationSize, fitnessWeights){
        this.populationSize = populationSize
        this.fitnessWeights = fitnessWeights
        this.scale = this.generateScale(scalePitch, scaleType)
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

        // twik the melody to start and end with the root note 
        let tabsLen = maxMelody.tabs.length
        let numOfNotesInLastTab = maxMelody.tabs[tabsLen-1].notes.length
        maxMelody.tabs[0].notes[0].setMidi(this.scale[0])
        maxMelody.tabs[ tabsLen-1 ].notes[ numOfNotesInLastTab-1 ].setMidi(this.scale[0])

        return maxMelody
    }
    
    generatePopulation(){
        let population = []
        for(let i = 0 ; i < this.populationSize ; i++){
            population.push(new Melody(this.scale, this.durations))
        }
        return population
    }

    generateScale (scalePitch, scaleType) {
        let scale = []

        let rootMidi = 60 + this.literalToMidiDic[scalePitch]
        scale.push(rootMidi)

        let startIndex;
        if( scaleType === 'Major') startIndex = 0
        else if (scaleType === 'Minor') startIndex = 5
        else return []

        let prevMidiNote = rootMidi
        for(let i = 0 ; i < 14 ; i++) {
            let curMidiNote =  prevMidiNote + this.scaleGaps[ (startIndex + i) % this.scaleGaps.length ]  
            scale.push(curMidiNote)
            prevMidiNote = curMidiNote
        }

        return scale
    }

     createNewGeneration() {
        this.population.sort((a,b) => {return b.fitnessScore - a.fitnessScore}) //sorting max to min score
        let halfSize = this.population.length / 2
        let newGeneration = []
        
        //init 1/2 of the population to be a permutaion of the first half maximum melodies 
        //NOTICE the other half of the new generation is random melodies
        for(let i = 0 ; i < this.population.length ; i = i+2){ 
            let parentA =this.population[i]
            let parentB =this.population[i+1]

            let child = new Melody(this.scale, this.durations)

            // we will take tabs in even indexes from parent A
            // and tabs in odd indexes from parent B
            for(let j = 0 ; j < child.tabs.length ; j++){
                if (j%2 === 0) child.tabs[j] = parentA.tabs[j]
                else child.tabs[j] = parentB.tabs[j]
            }
            
            newGeneration.push(child)
        }

       
        for(let i = 0 ; i < (halfSize) ; i++){ 
            let parentA =this.population[i]
            let parentB =this.population[i + 1]

            let child = new Melody(this.scale, this.durations)

            //debbug
            if(i == 48){
                i = i
            }

            try {
             // we will take tabs in even indexes from parent B
            // and tabs in odd indexes from parent A
                for(let j = 0 ; j < child.tabs.length ; j++){
                    if (j%2 === 0) child.tabs[j] = parentB.tabs[j]
                    else child.tabs[j] = parentA.tabs[j]
                }

            } catch (error) {
                console.log(error)
            }
            
            
            newGeneration.push(child)
        }

        this.population = newGeneration //set the new genration to be the current population

    }

    calcMelodiesFitScore() {
        this.population.forEach(melody => {
            let fitVal = calcMelodyFitVal(melody, this.scale, this.fitnessWeights)
            melody.setFitnessScore(fitVal)// set the fitnessValue attribute of the melody to 'fitval'
        })
    }
}

GeneticMelodyGenerator.prototype.literalToMidiDic = {
    'C' : 0,
    'C#' : 1,
    'D' : 2,
    'E' : 3,
    'F' : 4,
    'F#' : 5,
    'G' : 6,
    'G#' : 7,
    'A' : 8,
    'A#' : 9,
    'B' : 10,
    'B#' : 11,
}

GeneticMelodyGenerator.prototype.scaleGaps = [2, 2, 1, 2, 2, 2, 1]

