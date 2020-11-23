// all fetch requests
// import Chord from "./chord.js"
// import Song from './song.js'


// TO IMPROVE PERFORMANCE CREATE AUDIO TAGS ONLY ON PLAY
// MOVE KEYS AND AUDIO TAGS TO INDEX.HTML INSTEAD OF CREATING THEM WITH JS DOM MANIPULATION


// export default 
class Adapter{
    constructor(){
        this.baseURL = "https://thawing-temple-12065.herokuapp.com/" // "http://localhost:3000"
        this.getSongs()
        this.allSongs = []
        this.handleChordButtons()
        this.handleKeyboardNotes()
        this.newSong = this.newSong()
        this.beatDropdown()
        this.renderPlayButton()
        this.renderPauseButton()
        this.saveSongButton()
        this.updateTrack()
    }


    getSongs(){
        return fetch(`${this.baseURL}/songs`)
                    .then(resp => resp.json())
                    .then((songs) => {
                        let loading = document.getElementById("loading")
                        loading.removeChild(loading.childNodes[0])
                        console.log(loading)
                        for(let song of songs.data){
                            let chordObjs = []
                            for(let chord of song.attributes.chords){
                                let newchord = new Chord(chord.name, chord.file)
                                chordObjs.push(newchord)
                            }
                            let songObj = new Song(song.attributes.name, chordObjs, song.id)

                            this.allSongs.push(songObj)
                        }
                        for(let song of this.allSongs){
                            
                            song.renderSongButton() // make this song.renderSongButton for example and other methods so classes take some of the code from the adapter
                        }
                        
                    })
                    .catch(error => alert(error))
    }

    handleChordButtons(){
        const chordButtons = document.querySelectorAll(".chord")
        for(let chordButton of chordButtons){
            chordButton.addEventListener("click", (e) =>{
                this.updateTrack()
                const audio = document.getElementById(chordButton.dataset.note)
                audio.play()
                const chordName = chordButton.innerText
                const newChord = new Chord(chordName, `assets/chords/${chordName}.wav`)
                this.newSong.chords.push(newChord) //add chord object to song object chords attribute
                this.updateTrack()
            })
        }
    }

    handleKeyboardNotes(){

        const synth = new Tone.Synth().toDestination();
        synth.oscillator.type = "fmsawtooth"
        synth.oscillator.modulationType = "triangle";

        document.addEventListener("keydown",  (e) => {

            switch (e.code) {
                case "ShiftLeft":
                  return synth.triggerAttackRelease("A1", "8n");
                case "KeyZ":
                  return synth.triggerAttackRelease("A#1", "8n");
                case "KeyX":
                  return synth.triggerAttackRelease("B1", "8n");
                case "KeyC":
                  return synth.triggerAttackRelease("C2", "8n");
                case "KeyV":
                  return synth.triggerAttackRelease("C#2", "8n");
                case "KeyB":
                  return synth.triggerAttackRelease("D2", "8n");
                case "KeyN":
                  return synth.triggerAttackRelease("D#2", "8n");
                case "KeyM":
                  return synth.triggerAttackRelease("E2", "8n");
                case "Comma":
                  return synth.triggerAttackRelease("F2", "8n");
                case "Period":
                  return synth.triggerAttackRelease("F#2", "8n");
                case "Slash":
                  return synth.triggerAttackRelease("G2", "8n");
                case "ShiftRight":
                  return synth.triggerAttackRelease("G#2", "8n");
                default:
                  return;
              }
        })

    }

    updateTrack(){
        let trackCard = document.getElementById("track") //this could go in new Song method
        while (trackCard.firstChild) {
            trackCard.firstChild.remove(); // remove all old chords and add new ones? what if i could only add the new one with an algo like in react
        }
        for (let newSongChord of this.newSong.chords){
            // console.log(newSongChord.name)
            let chordButtonTrack = document.createElement("button") //create these buttons from new song chords
            chordButtonTrack.className = "button btn-dark"
            chordButtonTrack.href = "#"
            chordButtonTrack.innerText = newSongChord.name
            let minus = document.createElement("span")
            minus.innerHTML = `<svg class="bi bi-dash-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>
                            </svg>`

            chordButtonTrack.appendChild(minus)
            trackCard.appendChild(chordButtonTrack)
            console.log(`Chord Objects: ${this.newSong.chords} before remove from track`) // audios before
            // console.log(`Audio Tags Before:${this.newSong.audios} before remove from track`) // audios before
            // // these could be refactored to be to get rid of apparent duplication of array functionality
            chordButtonTrack.addEventListener("click", (e)=>{
                // only use Song.chords as a source to the array of chords no files or audios on Song
                this.newSong.chords = this.newSong.chords.filter((chord)=>{return chord.edit_id !== newSongChord.edit_id})
                // console.log(`Chord Objects: ${this.newSong.chords} in newSong.chords after remove from track`)
                // this.newSong.audios  = this.newSong.audios.filter((audio)=> {return parseInt(audio.id) !== newSongChord.edit_id})// chords have different ids than audios
                console.log(`Audio Tags: ${this.newSong.chords} in newSong.audios after remove from track`)
                // bug in delete of 
                this.newSong.files  = []
                for(let chord of this.newSong.chords){
                    this.newSong.files.push(chord.file)
                }
                // console.log(this.newSong)
                // select all chord audios from document to control that they are updating correctly
                // const allChordAudiosInDom = document.querySelectorAll(".chord-audio")
                // console.log(allChordAudiosInDom) // no bug in creation of extra DOM chord audios it stays at 19
                newSongChord.audio.pause()
                newSongChord.audio.currentTime = 0
                chordButtonTrack.parentNode.removeChild(chordButtonTrack)
                this.updateTrack()
                
            })
        }
    }

    beatDropdown(){
        const dropdownMenu = document.getElementById("dropdown-menu")
        const dropdownButton = document.getElementById("dropdownMenuButton")
        const beats = ["Analog.wav", "Acoustic.wav", "Groovy.wav", "Hip.wav"]
        for(let beat of beats){
            let a = document.createElement("a")
            a.innerText = beat.substring(0, beat.length - 4)
            a.className = "dropdown-item"
            a.href = "#"
            dropdownMenu.appendChild(a)
            a.addEventListener("click", ()=>{
                document.getElementById("stop").click()
                const newBeat = document.createElement("audio")
                newBeat.src = `assets/beats/${beat}`
                this.newSong.beat = newBeat
                dropdownButton.innerText = beat.substring(0, beat.length - 4)
            })
        }

    }

    

    newSong(){ //catches new chords being added as well as name and returns a new song object
        let nameInput = document.getElementById("songName") // name to initialize object
        
        let chordData = [ "F.wav ", "C.wav ", "Em.wav ", "F.wav ", "F.wav ", "C.wav ", "Em.wav ", "F.wav "]// this is empty so no audios are created
        
        let chordObjs = []

        for(let string of chordData){
            chordObjs.push(new Chord(`${string.substring(0, string.length - 5)} `, `assets/chords/${string}`)) // # 3 creates random edit_id for chord buttons created on new song on load of track these chord buttons are stored in this.newSong
        } // the button on track

        let song = new Song(nameInput, chordObjs)


        nameInput.addEventListener("focus", (event)=>{
            if(nameInput.value === "**New Song Title**"){
                event.target.value = ""
            }
        })
        
        nameInput.addEventListener("input", (event)=>{ //set name property on input change
            song.name = event.target.value
        })

        return song;
    }



    

    renderPlayButton(){
        let trackBtns = document.getElementById("track-btns")
        let playButton = document.createElement("button")
        playButton.id = "play"
        playButton.innerHTML = `<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>`
        
        playButton.addEventListener("click", ()=> {
            //select all audios from the track card or use the song array
            this.updateTrack()
            this.newSong.playSong()
            
        }) // add event listener to button to play 
        trackBtns.appendChild(playButton)
    
    }

    renderPauseButton(){
        let trackBtns = document.getElementById("track-btns")
        let pauseButton = document.createElement("button")
        pauseButton.id = "stop"
        pauseButton.innerHTML = `<svg class="bi bi-stop-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                                </svg>`
        let allAudios = document.querySelectorAll("audio")
        pauseButton.addEventListener("click", ()=>{
            for(let audio of allAudios){
                audio.pause()
                audio.currentTime = 0
            }
            this.newSong.stop()

            for(let song of this.allSongs){
                song.stop()
                song.beat.pause()
                song.beat.currentTime = 0

            }
            const songButtons = document.getElementsByClassName("button btn-dark song")
            for(let songButton of songButtons){
                songButton.disabled = false
            }
            this.newSong.beat.pause()
            this.newSong.beat.currentTime = 0
            document.getElementById("play").disabled = false



          
        })
        trackBtns.appendChild(pauseButton)
    }
    
    saveSongButton(){
        let trackBtns = document.getElementById("track-btns")
        let saveButton = document.createElement("button")
        saveButton.innerText = "Save Song"
        saveButton.addEventListener("click", ()=>{
            
            if(typeof this.newSong.name === "object"){
                alert("First add a name to the song!")
            }else{
                this.saveSong(this.newSong)
            }
        })
        trackBtns.appendChild(saveButton)
    }

    saveSong(song){ 
        let postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                song: {
                    name: song.name, // returns name string from input
                    chords_attributes: song.chords //returns array of chord objects //need only an array of files
                }
            })
        }
        return fetch(`${this.baseURL}/songs`, postObj)
            .then(resp => resp.json())
            .then(json=> {
                let chordObjs=[]

                for(let chord of json.data.attributes.chords){
                    chordObjs.push(new Chord(chord.name, chord.file))
                }
                let song = new Song(json.data.attributes.name, chordObjs, json.data.id)
                this.allSongs.push(song)
                
                song.renderSongButton()
            }) 
            .catch(error => alert(`Cant render new song and ${error}`))
    }

    
  
    

    
    

}


