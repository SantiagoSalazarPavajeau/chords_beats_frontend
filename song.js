// import Chord from "./chord.js"

// export default 
class Song{
    constructor(name, chords, id){
        this.name = name
        this.chords = chords // create audios from chord with setter and getter methods
        this.id = id
        this.files = this.files()
        this.beat = this.beat()
        this.intervals = []

    }

    stop(){
        for( let interval of this.intervals){
            clearInterval(interval)
        }
    }

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

    playSong = () => {   
        let allAudios = document.querySelectorAll("audio")
            
        for(let chord of this.chords){
            chord.audio.pause()
            chord.audio.currentTime = 0
        }
        const songButtons = document.getElementsByClassName("song-button")
            for(let songButton of songButtons){
                songButton.disabled = true
            }
        document.getElementById("play").disabled = true
        
        let playAudio = (index) => {
                            return () => {
                                if (index < this.chords.length -1 ){
                                    this.chords[index].audio.currentTime = 0
                                    this.chords[index].audio.pause()
                                    index += 1
                                    this.chords[index].audio.play()
                                } else{
                                    clearInterval(playInterval)
                                    
                                    this.beat.pause()
                                    this.beat.currentTime = 0;
                                    const songButtons = document.getElementsByClassName("song-button")
                                    document.getElementById("play").disabled = false
                                    for(let songButton of songButtons){
                                        songButton.disabled = false
                                    }
                                    

                              
                                }
                                
                            }
                        }
            
        this.chords[0].audio.play()
        this.beat.play()
        
        let i = 0
        const playInterval = setInterval(playAudio(i), 2000)
        this.intervals.push(playInterval)

    }

    renderSongButton(){ //called on load and on save of song
    
        let songsCard = document.getElementById("songs")
        let songButton = document.createElement("button")
        let br = document.createElement("br")
        songButton.className = "song-button"
        songButton.innerText = this.name
        songButton.addEventListener("click", ()=> {
            
            const songButtons = document.getElementsByClassName("song-button")
            for(let songButton of songButtons){
                songButton.disabled = true
            }
            document.getElementById("play").disabled = true
            this.playSong()
            

        }) // add event listener to button to play song

        let deleteSongButton = document.createElement("button")
        deleteSongButton.className = "btn btn-dark btn-sm"
        deleteSongButton.innerText = " X"
        deleteSongButton.addEventListener("click", ()=> {
           if (confirm("Are you sure you want to delete this song?")){
                this.deleteSong(this)
                songButton.parentNode.removeChild(songButton)
                deleteSongButton.parentNode.removeChild(deleteSongButton)
                br.parentNode.removeChild(br)
           }else{
               alert("Close call!")
           }
        })

        
        songsCard.appendChild(songButton)
        songsCard.appendChild(deleteSongButton)
        songsCard.appendChild(br)

    }

    deleteSong(song){
        let deleteObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
  
        }
        return fetch(`${this.baseURL}/songs/${song.id}`, deleteObj)
            .then(resp => resp.json())
            .then(()=> {
                alert("Song deleted")
            }) 
            .catch(error => alert(`Couldn't delete song and ${error}`))
    }



}