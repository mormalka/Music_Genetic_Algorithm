export class Note {
    constructor(midi, duration){
        this.midi = midi;
        this.duration = duration; 
        this.literal = this.dic[midi % 12] + (Math.floor(midi/12)-1)
    }
}

Note.prototype.dic = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'E',
    4: 'F',
    5: 'F#',
    6: 'G',
    7: 'G#',
    8: 'A',
    9: 'A#',
    10: 'B',
    11: 'B#'
}

