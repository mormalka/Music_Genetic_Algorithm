import {Tab} from './tab'
import {Note} from './note'

export class Melody {
    
    constructor(scale){
            
        this.tabs = []

        //create the tabs array:
        // 4 tabs in a melody
        for (let i = 0; i < 4; i++) {
            let newTab = new Tab();

            // 4 notes in a tab
            for (let j = 0; j < 4; j++) {

                // get a randon mini note
                let randNote = scale[Math.floor(Math.random() * scale.length)]
                newTab.addNote(new Note(randNote))
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

