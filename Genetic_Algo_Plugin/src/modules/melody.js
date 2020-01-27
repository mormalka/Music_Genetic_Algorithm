import {Tab} from './tab'
import {Note} from './note'

export class Melody {
    
    constructor(scale){
        this.tabs = []
        this.fitnessScore = 0

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
    }

    getAllTabs(){
        return this.tabs
    }

}

