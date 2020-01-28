import { Melody } from '../modules/melody'

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
}