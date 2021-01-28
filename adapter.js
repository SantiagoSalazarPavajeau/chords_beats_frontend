
class Adapter{
    constructor(){
        getSongs()
        handleChordButtons()
        onButton()
        this.allSongs = []
        this.newSong = this.newSong()
        this.keyboard = new Keyboard()
        this.beatDropdown()
        this.renderPlayButton()
        this.renderPauseButton()
        this.saveSongButton()
        this.updateTrack()
    }

    updateTrack(){
        let trackCard = document.getElementById("track") 
        while (trackCard.firstChild) {
            trackCard.firstChild.remove(); 
        }
        for (let newSongChord of this.newSong.chords){
            let chordButtonTrack = document.createElement("button")
            chordButtonTrack.className = "chord-in-song-button"
            chordButtonTrack.href = "#"
            chordButtonTrack.innerText = newSongChord.name
            let minus = document.createElement("span")
            minus.innerHTML = `<svg class="bi bi-dash-square-fill" width="14px" height="14px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>
                            </svg>`

            chordButtonTrack.appendChild(minus)
            trackCard.appendChild(chordButtonTrack)

            chordButtonTrack.addEventListener("click", (e)=>{

                this.newSong.chords = this.newSong.chords.filter((chord)=>{return chord.edit_id !== newSongChord.edit_id})

                this.newSong.files  = []
                for(let chord of this.newSong.chords){
                    this.newSong.files.push(chord.file)
                }

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
        const beats = ["No Beat    ", "Analog.wav", "Acoustic.wav", "Groovy.wav", "Hip.wav"]
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
        playButton.className = "playback-button"
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
        pauseButton.className = "stop-button"
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
            const songButtons = document.getElementsByClassName("song-button")
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
        let nsContainer = document.getElementById("new-song-container")
        let saveButton = document.createElement("button")
        saveButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="currentColor" class="bi bi-cloud-upload" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                                    <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>`
        saveButton.className = "save-song"
        saveButton.addEventListener("click", ()=>{
            
            if(typeof this.newSong.name === "object"){
                alert("First add a name to the song!")
            }else{
                saveSong(this.newSong)
            }
        })
        nsContainer.appendChild(saveButton)
    }

}


