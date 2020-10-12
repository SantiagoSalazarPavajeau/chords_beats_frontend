// export default 
class Chord{
    constructor(name, file){
        this.name = name
        this.file = file
        this.edit_id = Math.floor(Math.random() * Math.random() * 1000)
        // this.audio = this.audio()
    }

    audio(){
        let audio = document.createElement("audio")
        audio.src = this.file
        audio.id = this.edit_id
        audio.className = "chord-audio"
        return audio;
    }

}




