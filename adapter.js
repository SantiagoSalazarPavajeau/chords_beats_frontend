// all fetch requests


class Adapter{
    constructor(){
        this.baseURL = "http://localhost:3000"
        this.getSongs()
        this.allSongs = []
        
        // this.loadSongs()
        this.loadChords()
        this.newSong = this.newSong()

        this.beatDropdown()
        this.renderPlayButton()
        this.renderPauseButton()
        this.saveSongButton()
        this.track()
        this.intervals = []
        

        // this.getSong()
        // this.updateSong()
        // this.deleteSong()
    }

    getSongs(){
        return fetch(`${this.baseURL}/songs`)
                    .then(resp => resp.json()) // returns json object
                    .then((songs) => {
                        let chordObjs = []

                        for(let song of songs.data){

                            for(let chord of song.attributes.chords){
                                chordObjs.push(new Chord(chord.name, chord.file))
                            }
                            const songObj = new Song(song.attributes.name, chordObjs)
                            
                            this.allSongs.push(songObj)
                        }
                        
                        for(let song of this.allSongs){
                            
                            this.renderSongButton(song) 
                        }
                        this.allSongs.push(this.newSong)
                    })
                    .catch(error => alert(error))
    }

    // loadSongs(){ //loads songs as complex objects from server in the form of buttons on songs card
    //     this.getSongs()
            
    // }

    loadChords(){
        let chordData = ["A.wav", "Ab.wav", "Am.wav", "B.wav", "Bb.wav", "Bm.wav", "C.wav", "Cm.wav", "D.wav", "Db.wav", "Dm.wav", "E.wav", "Eb.wav", "Em.wav", "F.wav", "Fm.wav", "G.wav", "Gb.wav", "Gm.wav"]
        let chordObjs = []
        for(let string of chordData){
            chordObjs.push(new Chord(`${string.substring(0, string.length - 4)} `, `assets/chords/${string}`)) // # 2 creates random edit_id
        }
        for(let chord of chordObjs){
            this.addChordButton(chord) // send chord object
        }
    }
    

    addChordButton(chord){ 

        let chordsCard = document.getElementById("chords")
        let chordButton = document.createElement("button")
         //  <a href="#" class="btn btn-info">C</a>
         chordButton.className = "button btn-outline-dark"
         chordButton.href = "#" 
         chordButton.innerText = chord.name
        let addIcon = document.createElement("span")
        addIcon.innerHTML = `<svg class="bi bi-plus-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>
                         </svg>`

        chordButton.addEventListener("click", ()=> { // add chord to new song
            let trackChord = new Chord(chord.name, chord.file) // # 1 creates random edit_id for chord buttons added from chord card
            // the chord created here was already created on load of new song
            this.newSong.chords.push(trackChord) //add chord object to song object chords attribute
            this.newSong.audios.push(trackChord.audio())
            this.newSong.files.push(trackChord.file)
            // this.newSong.audios()
            chord.audio().play() //play chord audio
            this.track()
            console.log(this.newSong)
        
        }) // add event listener to button to play

        
       
       
        chordsCard.appendChild(chordButton) // could add it to a list to fix spacing
        // div.appendChild(playButton)
        // chordsCard.appendChild(audio)
        chordButton.appendChild(addIcon)
        
        // add chord to song array

    }

    track(){
        let trackCard = document.getElementById("track") //this could go in new Song method
        while (trackCard.firstChild) {
            trackCard.firstChild.remove();
        }
        for (let newSongChord of this.newSong.chords){
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
            chordButtonTrack.addEventListener("click", (e)=>{
                
                this.newSong.chords = this.newSong.chords.filter((chord)=>{return chord.edit_id !== newSongChord.edit_id})
                this.newSong.audios  = this.newSong.audios.filter((audio)=> {return parseInt(audio.id) !== newSongChord.edit_id})// chords have different ids than audios
                this.newSong.files  = []
                for(let chord of this.newSong.chords){
                    this.newSong.files.push(chord.file)
                }
                // console.log(this.newSong)
                
                newSongChord.audio().pause()
                newSongChord.audio().currentTime = 0
                chordButtonTrack.parentNode.removeChild(chordButtonTrack)
                
            })
        }
    }

    beatDropdown(){
        const dropdownMenu = document.getElementById("dropdown-menu")
        const dropdownButton = document.getElementById("dropdownMenuButton")
        const beats = ["Analog.wav", "Acoustic.wav", "Modern.wav"]
        for(let beat of beats){
            let a = document.createElement("a")
            a.innerText = beat.substring(0, beat.length - 4)
            a.className = "dropdown-item"
            a.href = "#"
            dropdownMenu.appendChild(a)
            a.addEventListener("click", ()=>{
                const newBeat = document.createElement("audio")
                newBeat.src = `assets/beats/${beat}`
                this.newSong.beat = newBeat
                dropdownButton.innerText = beat.substring(0, beat.length - 4)
            })
        }
        // const beat = document.createElement("audio")
        //     beat.src = "assets/beats/DQ.wav"
        // debugger

        // dropdown.appendChild(beatButton)
        // dropdown.appendChild(dropdownMenu)
        // trackFooter.appendChild(dropdown)
    }

    renderSongButton(songObj){ //better called load songs? this is specific dom manipulation/html
    
        // song = song.attributes
        
        // let chordObjs = []
        
        // for(let chord of song.chords){
        //     chordObjs.push(new Chord(chord.name, chord.file)) // # 3 creates random edit_id for chord buttons created on new song on load of track these chord buttons are stored in this.newSong
        // } // the button on track
        
        // let allSongs = []
        // allSongs.push(songObj)
        let songsCard = document.getElementById("songs")
        let songButton = document.createElement("button")
        let br = document.createElement("br")
        songButton.className = "button btn-dark song"
        // songButton.id = "song"
        songButton.innerText = songObj.name
        songButton.addEventListener("click", ()=> {
            
            // for(let audio of allAudios){
            //     audio.pause()
            //     audio.currentTime = 0
            // }
            // console.log(this.allSongs)
            // let pause = () => {
            //     for(let song of this.allSongs){
            //         for(let chord of song.chords){
            //             chord.audio().pause
            //         }
            //     }
            // }
            // const pausePromise = new Promise((pause,failureToPause)=>{
            //     pause()
            // }).then(()=>{this.playSong(songObj)})
            this.playSong(songObj)
            const songButtons = document.getElementsByClassName("button btn-dark song")
            // console.log(songButtons)
            for(let songButton of songButtons){
                songButton.disabled = true
            }
            
            // console.log(songObj)
            

        }) // add event listener to button to play song
        
        songsCard.appendChild(songButton)
        songsCard.appendChild(br)

    }

    newSong(){ //catches new chords being added as well as name and returns a new song object
        let nameInput = document.getElementById("songName")
        
        let chordData = [ "F.wav ", "C.wav ", "Em.wav ", "F.wav "]// this is empty so no audios are created
        
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

    playSong(song){
        
        // song.audios()
        let allAudios = document.querySelectorAll("audio")
            
        for(let audio of allAudios){
            audio.pause()
            audio.currentTime = 0
        }
        
        let playAudio = function(index){
                            return function(){
                                if (index < song.audios.length -1 ){
                                    song.audios[index].currentTime = 0
                                    song.audios[index].pause()
                                    index += 1
                                    song.audios[index].play()
                                } else{
                                    clearInterval(playInterval)
                                    clearInterval(stopInterval)
                                    
                                    song.beat.pause()
                                    song.beat.currentTime = 0;
                                    const songButtons = document.getElementsByClassName("button btn-dark song")
                                    for(let songButton of songButtons){
                                        songButton.disabled = false
                                    }
                              
                                }
                                
                            }
                        }
            
        let stopAudio = function(index){
                            return function(){
                                if (index < song.audios.length){
                                    song.audios[index].pause()
                                    song.audios[index].currentTime = 0;
                                    
                                } 
                                
                            }
                        }
        song.audios[0].play()
        song.beat.play()
        
        let i = 0
        const playInterval = setInterval(playAudio(i), 2000)
        const stopInterval = setInterval(stopAudio(i), 1900)
        this.intervals.push(playInterval)
        this.intervals.push(playInterval)

    }

    

    renderPlayButton(){
        let trackBtns = document.getElementById("track-btns")
        let playButton = document.createElement("button")
        playButton.innerHTML = `<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>`
        
        playButton.addEventListener("click", ()=> {
            //select all audios from the track card or use the song array
            this.playSong(this.newSong)
            // this.newSong.beat.play()
            
        }) // add event listener to button to play 
        trackBtns.appendChild(playButton)
    
    }

    renderPauseButton(){
        let trackBtns = document.getElementById("track-btns")
        let pauseButton = document.createElement("button")
        pauseButton.innerHTML = `<svg class="bi bi-stop-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                                </svg>`
        let allAudios = document.querySelectorAll("audio")
        pauseButton.addEventListener("click", ()=>{
            for(let audio of allAudios){
                audio.pause()
                audio.currentTime = 0
            }
            for(let audio of this.newSong.audios){
                audio.pause()
                audio.currentTime = 0
            }
            for(let interval of this.intervals){
                clearInterval(interval)
            }
            this.newSong.beat.pause()
            this.newSong.beat.currentTime = 0
          
        })
        trackBtns.appendChild(pauseButton)
    }
    

    

    

    saveSongButton(){
        let trackBtns = document.getElementById("track-btns")
        let saveButton = document.createElement("button")
        saveButton.innerText = "Save Song"
        saveButton.addEventListener("click", ()=>{
            // console.log(this.newSong)
            this.saveSong(this.newSong)
        })
        trackBtns.appendChild(saveButton)
    }

    saveSong(song){ // this should be set on an event listener in userInterface
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
                let song = new Song(json.data.attributes.name, chordObjs)

                this.renderSongButton(song)
            }) 
            .catch(error => alert(`Cant render new song and ${error}`))
    }

    

    

}


