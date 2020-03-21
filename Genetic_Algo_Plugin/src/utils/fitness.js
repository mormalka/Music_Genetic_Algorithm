import { fitnessWeights } from '../index'


//Calculates score according to sum of distances between every two notes
//Max value is 1, Min value is 0
function absoluteDistance(melody, scale){

    let allNotes = melody.getAsNotesArray()
    let scaleSize = scale.length
    let maxDistances = (scale[scaleSize-1]- scale[0]) * (scaleSize-1)
    let sumDistances = 0 ; 
    for(let i = 0 ; i < allNotes.length -1 ; i++){
            // we dont want the same note to repeat.
            if (allNotes[i].midi === allNotes[i+1].midi){
                sumDistances = sumDistances + 5; // we can panish with any big number. I chose 5. 
            }
            
            sumDistances = sumDistances + Math.abs(allNotes[i].midi - allNotes[i+1].midi)
    }
    //min distance get high score
    return ((maxDistances - sumDistances) / maxDistances)

}

//Calculates score according to number of shows of the dominant notes of the scale
//Max value is 1, Min value is 0
function dominantNotesFreq(melody, scale){

    let optimalFreq = 2/7
    let allNotes = melody.getAsNotesArray()
    let len = allNotes.length;
    let counter = 0

    let dominantNotesFreq = [] //stores the dominant nodes of the choosen scale
    for(let pos = 0 ; pos < scale.length ; pos++){
        if( (pos % 7) === 0){
            dominantNotesFreq = dominantNotesFreq.concat(scale[pos])
        }
    }
    for(let pos = 0 ; pos < len ; pos++){
        for(let i = 0 ; i < dominantNotesFreq.length ; i++){
            if(allNotes[pos].midi == dominantNotesFreq[i]){
                counter = counter + 1 
            }
        }
    }

    let freq = (counter / len)
    // we give high score for freq closer to optimalFreq
    if (freq < optimalFreq) return freq
    else return (1 - optimalFreq - freq)
}

function notesDiversity(melody, scale){

    let notesInMelody = new Set()
    let allNotes = melody.getAsNotesArray()
    for(let i = 0 ; i < allNotes.length ; i++){
        notesInMelody.add(allNotes[i].midi)
    }
    return (notesInMelody.size / allNotes.length)
}

// returns a value in range of 0-1
export function calcMelodyFitVal(melody, scale, fitnessWeights){
    let fitVal = (fitnessWeights[0] * absoluteDistance(melody, scale)) + (fitnessWeights[1] * dominantNotesFreq(melody, scale)) + (fitnessWeights[2] * notesDiversity(melody, scale))
    let maxVal = fitnessWeights.reduce((a, b) => a + b, 0)
    if(maxVal === 0) return 0
    return fitVal/maxVal
}