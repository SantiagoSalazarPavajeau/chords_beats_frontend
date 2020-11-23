// import * as Tone from 'tone'

class Keyboard{
    constructor(name, file){
        this.name = name
        this.file = file
    }

    audio(){


        let audio = document.createElement("audio")
        audio.src = this.file
        return audio;
    }
    
}