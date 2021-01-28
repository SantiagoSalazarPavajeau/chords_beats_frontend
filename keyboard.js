
class Keyboard{
    constructor(name, file){
        this.name = name
        this.file = file
        // handleKeyboardNotes()
    }

    audio(){
        let audio = document.createElement("audio")
        audio.src = this.file
        return audio;
    }

    
    
}