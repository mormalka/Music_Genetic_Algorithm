import {Tab} from './tab'
import {Note} from './note'

export class Melody {
    
    constructor(scale, durations){
            
        this.tabs = []

        //create the tabs array:
        // 6 tabs in a melody
        for (let i = 0; i < 6; i++) {
            let newTab = new Tab();

            // 4 notes in a tab
            for (let j = 0; j < 4; j++) {
                // generate a random Note
                let randNote = scale[Math.floor(Math.random() * Math.random() * Math.random() * scale.length)]
                let randDuration = durations[Math.floor(Math.random() * durations.length)]
                newTab.addNote(new Note(randNote, randDuration))
            }

            this.tabs.push(newTab)
        }

        this.fitnessScore = 0 // defult value
    }

    getAllTabs(){
        return this.tabs
    }

    getAsNotesArray(){
        let res = []
        for(let i = 0 ; i < this.tabs.length ; i++){
           res = res.concat(this.tabs[i].notes)
        }
        return res
    }

    getAsToneJsObjArray(){
        let notes = this.getAsNotesArray();
        let res = []
        let currTime = 0

        for(let i = 0; i < notes.length ; i++){
            res.push(
                { 
                  time : currTime,
                  note : notes[i].literal,
                  dur : notes[i].duration,
                })
            currTime = currTime + notes[i].duration
        }

        return res
    }



    setFitnessScore(score){
        this.fitnessScore = score;
    }

    printTabsArray(){  
        for (let i = 0; i < 4; i++) {
            let tab = (this.tabs)[i].notes
            console.log("[")
            // 4 notes in a tab
            for (let j = 0; j < 4; j++) {

                let note = tab[i]
                console.log(", " + note.midi)
            }

            console.log("]")
        }
    }

}

