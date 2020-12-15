// import Chord from "./chord.js"

// export default 
class Song{
    constructor(name, chords, id){
        this.name = name
        this.chords = chords // create audios from chord with setter and getter methods
        this.baseURL = "https://thawing-temple-12065.herokuapp.com/" // "http://localhost:3000"
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
        let songContainer = document.createElement("div")
        songContainer.className = "song-container"
        let songsCard = document.getElementById("songs")
        let songButton = document.createElement("button")
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
        deleteSongButton.className = "delete-song"
        deleteSongButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                      </svg>`
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

        songContainer.appendChild(songButton)
        songContainer.appendChild(deleteSongButton)
        songsCard.appendChild(songContainer)

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