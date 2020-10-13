// export default 
class Chord{
    constructor(name, file){
        this.name = name
        this.file = file
        this.edit_id = Math.floor(Math.random() * Math.random() * 1000)
        // this.audio = document.getElementById(this.name)
        // this.audio = this.audio()
    }

    audio(){
        let audio = document.createElement("audio") // move this to the constructor and make Chord.audioTag the audio tag
        audio.src = this.file  // make this Chord.audio.src 
        audio.id = this.edit_id // make this Chord.audio.id
        audio.className = "chord-audio" //  Chord.audio.className
        return audio; // Chord.audio will return the audio tag with all the configu
    }

    // we have to make the chord button as well

}




