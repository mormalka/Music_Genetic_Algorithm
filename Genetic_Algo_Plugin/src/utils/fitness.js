import { Melody } from '../modules/melody'
import { scale } from '../index'

export class Fitness{

    static calcMelodyFitVal(melody){
        
        let sum = 0;
        
        for (let i = 0; i < 4; i++) {
            let currentTab = (melody.tabs)[i].notes

            // 4 notes in a tab
            for (let j = 0; j < 4; j++) {

                // get a current midi note
                let currentNote = currentTab[i]
                sum = sum + currentNote.midi 
            }

        }
        
        return sum;
    }
    //Calculates score according to sum of distances between every two notes
    //Max value is 1, Min value is 0
    static absoluteDistance(melody){

        let allNotes = melody.getAsNotesArray();
        let scaleSize = scale.length()
        let maxDistances = (scale[0] - scale[scaleSize-1]) * (scaleSize-1)
        let sumDistances = 0 ; 
        for(let i = 0 ; i < allNotes.length -1 ; i++){
            sumDistances = allNotes[i] - allNotes[i+1]

        }
        //min distance get high score
        return ((maxDistances - sumDistances) / maxDistances)

    }

    //Calculates score according to number of shows of the dominant notes of the scale
    //Max value is 1, Min value is 0
    static dominantNotesFreq(melody){

        let allNotes = melody.getAsNotesArray();

        let len = allNotes.length();
        let counter = 0

        let dominantNotesFreq = [] //stores the dominant nodes of the choosen scale
        for(let pos = 0 ; pos < scale.length() ; pos++){
            if( (pos % 7) == 0 || (pos % 7) == 4 ){
                dominantNotesFreq = dominantNotesFreq.concat(scale[pos])
            }
        }

        for(let pos = 0 ; pos < len ; pos++){
            for(let i = 0 ; i < dominantNotesFreq.length() ; i++)
                if(allNotes[pos] == dominantNotesFreq[i]){
                    counter = counter + 1 
                }
        }
        return (counter / len)

    }

    static notesDiversity(melody){


    }






}