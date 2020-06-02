// all fetch requests


class Adapter{
    constructor(){
        this.baseURL = "http://localhost:3000"
        this.getSongs()
        this.renderPlayButton()
        this.renderPauseButton()
        this.newSong = this.newSong()
        this.saveSongButton()
        

        // this.getSong()
        // this.updateSong()
        // this.deleteSong()
    }
    
<<<<<<< HEAD
=======

    renderSongButton(songObj){ //better called load songs? this is specific dom manipulation/html
        let songsCard = document.getElementById("songs")
        let songButton = document.createElement("button")
        songButton.className = "button btn-secondary"
        songButton.innerText = songObj.name
        songButton.addEventListener("click", ()=> {
            // console.log(songObj.audios())
            playSong(songObj.audios()) // need to pass in a song object with chords attribute as audios
            songObj.beat.play()
        }) // add event listener to button to play song
        songsCard.appendChild(songButton)
    }
>>>>>>> 567f7bf301acad356a60dd5294a5a30cd36b6b0b

    addChordButton(chord){ 

        let chordsCard = document.getElementById("chords")
        let chordButton = document.createElement("button")
         //  <a href="#" class="btn btn-info">C</a>
         chordButton.className = "button btn-outline-info"
         chordButton.href = "#" 
         chordButton.innerText = chord.name
        let addIcon = document.createElement("span")
        addIcon.innerHTML = `<svg class="bi bi-plus-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>
                         </svg>`
        let audio = chord.audio() // use chord obj method to create audio tag from file
        chordButton.addEventListener("click", ()=> { // add chord to new song
            let trackChord = new Chord(chord.name, chord.file)
            trackChord.edit_id = Math.floor(Math.random() * Math.random() * 1000)
            this.newSong.chords.push(trackChord) //add chord object to song object chords attribute
            this.newSong.audios.push(trackChord.audio())
            audio.play() //play chord audio
            this.track()
            // console.log(this.newSong)
        
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
        for (let trackChord of this.newSong.chords){
            let chordButtonTrack = document.createElement("button") //create these buttons from new song chords
            chordButtonTrack.className = "button btn-info"
            chordButtonTrack.href = "#" 
            chordButtonTrack.innerText = trackChord.name
            let minus = document.createElement("span")
            minus.innerHTML = `<svg class="bi bi-dash-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>
                            </svg>`

            chordButtonTrack.appendChild(minus)
            trackCard.appendChild(chordButtonTrack)
            chordButtonTrack.addEventListener("click", (e)=>{
                chordButtonTrack.parentNode.removeChild(chordButtonTrack)
                trackChord.audio().pause()
                trackChord.audio().currentTime = 0
                // add audio to song
                // song could be an array
                this.newSong.chords = this.newSong.chords.filter(function(songChord){return songChord.id !== trackChord.id})
                // console.log(this.newSong)

            })
        }
    }

    newSong(){ //catches new chords being added as well as name and returns a new song object
        let nameInput = document.getElementById("songName")
        let chords = []
        let song = new Song(nameInput, chords)
    
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
        playButton.innerHTML = `<svg class="bi bi-play-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                </svg>`
        
        playButton.addEventListener("click", ()=> {
            //select all audios from the track card or use the song array
            this.playSong(this.newSong)
            this.newSong.beat.play()
            
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
            this.newSong.beat.pause()
            this.newSong.beat.currentTime = 0
          
        })
        trackBtns.appendChild(pauseButton)
    }
    

    playSong(song) {

        let allAudios = document.querySelectorAll("audio")
            
        for(let audio of allAudios){
            audio.pause()
            audio.currentTime = 0
        }
        
        let playAudio = function(index){
                            return function(){
                                if (index < song.audios.length -1 ){
                                    song.audios[index].currentTime = 0
                                index += 1
                                song.audios[index].play()
                                } else{
                                    clearInterval(playInterval)
                                    clearInterval(stopInterval)
                                    song.beat.pause()
                                    song.beat.currentTime = 0;
                                    console.log('playInterval')
                                    console.log('stopInterval')
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
        
        let i = 0
        let playInterval = setInterval(playAudio(i), 2000)
        let stopInterval = setInterval(stopAudio(i), 1700)
    }

    getSongs(){
        return fetch(`${this.baseURL}/songs`)
                    .then(resp => resp.json()) // returns json object
                    .catch(error => alert(error))
    }

    saveSongButton(){
        let trackBtns = document.getElementById("track-header")
        let saveButton = document.createElement("button")
        saveButton.innerText = "Save Song"
        saveButton.addEventListener("click", ()=>{
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
            .then(json=> this.renderSongButton(json))
            .catch(error => alert(error))
    }

    renderSongButton(song){ //better called load songs? this is specific dom manipulation/html
        const songObj = new Song(song.name, song.chords)
        let songsCard = document.getElementById("songs")
        let songButton = document.createElement("button")
        songButton.className = "button btn-secondary"
        songButton.innerText = songObj.name
        songButton.addEventListener("click", ()=> {
            // console.log(songObj.audios())
<<<<<<< HEAD
            this.playSong(songObj) // how to find this song?
=======
            this.playSong(songObj.audios()) // how to find this song?
>>>>>>> 567f7bf301acad356a60dd5294a5a30cd36b6b0b
            this.newSong.beat.play()
        }) // add event listener to button to play song
        songsCard.appendChild(songButton)
    }

    

}


