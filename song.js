// import Chord from "./chord.js"

// export default 
class Song{
    constructor(name, chords, id){
        this.name = name
        this.chords = chords // create audios from chord with setter and getter methods
        this.id = id
        this.files = this.files()
        this.beat = this.beat()
        if (this.chords.length > 0){
            this.audios = this.audios()
        }
    }

    audios(){ //needs to delete audios when delete chords
        let audios = []
        
            for(let chord of this.chords){ 
                audios.push(chord.audio()) // creates audios from chords
        }
        return audios;
    }

    // set chords(chord){
    //     this.audios.push(chord.audio()) // creates audios from chords
    // }

    addChord(chord){
        if (this.chords.length > 0){
            this.chords = []
        }
        this.chords.push(chord)
    }

    beat(){
        const beat = document.createElement("audio")

        beat.src = "assets/beats/Analog.wav"
        return beat;
    }

    chordObjects(){
        let chordObjs = []
        for(let chord of this.chords){
            chordObjs.push(new Chord(chord.name, chord.file))
        }
        return chordObjs;
    }

    files(){
        let files = []
        for(let chord of this.chords){
            files.push(chord.file)
        }
        return files;
    }

    // renderSongButton(){ //called on load and on save of song
    
    //     let songsCard = document.getElementById("songs")
    //     let songButton = document.createElement("button")
    //     let br = document.createElement("br")
    //     songButton.className = "button btn-dark song"
    //     songButton.innerText = this.name
    //     songButton.addEventListener("click", ()=> {
            
    //         const songButtons = document.getElementsByClassName("button btn-dark song")
    //         for(let songButton of songButtons){
    //             songButton.disabled = true
    //         }
    //         document.getElementById("play").disabled = true
    //         this.adapter.playSong()
            

    //     }) // add event listener to button to play song

    //     let deleteSongButton = document.createElement("button")
    //     deleteSongButton.className = "btn btn-dark btn-sm"
    //     deleteSongButton.innerText = " X"
    //     deleteSongButton.addEventListener("click", ()=> {
    //        if (confirm("Are you sure you want to delete this song?")){
    //             this.adapter.deleteSong(this)
    //             songButton.parentNode.removeChild(songButton)
    //             deleteSongButton.parentNode.removeChild(deleteSongButton)
    //             br.parentNode.removeChild(br)
    //        }else{
    //            alert("Close call!")
    //        }
    //     })

        
    //     songsCard.appendChild(songButton)
    //     songsCard.appendChild(deleteSongButton)
    //     songsCard.appendChild(br)

    // }

  

    // updateAudios(){
    //     let audios = []
    //     for(let chord of this.chords){
    //         let audio = document.createElement("audio")
    //         audio.src = chord.file
    //         audios.push(audio)
    //     }
    //     return audios;
    // } 

}