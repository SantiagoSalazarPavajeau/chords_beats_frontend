class Chord{
    constructor(name, file){
        this.name = name
        this.file = file
        this.edit_id
    }

    audio(){
        let audio = document.createElement("audio")
        audio.src = this.file
        audio.id = this.name
        return audio;
    }



}




