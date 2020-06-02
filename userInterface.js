//Dom manipulation methods

class UserInterface{
    constructor(){
        // this.adapter = new Adapter
        // this.newSong = this.newSong()
    }

    // saveSongButton(){
    //     let trackBtns = document.getElementById("track-header")
    //     let saveButton = document.createElement("button")
    //     saveButton.innerText = "Save Song"
    //     saveButton.addEventListener("click", ()=>{
    //         this.adapter.saveSong(this.newSong)
    //     })
    //     trackBtns.appendChild(saveButton)
    // }

    

    // newSong(){ //catches new chords being added as well as name and returns a new song object
    //     let nameInput = document.getElementById("songName")
    //     let chords = []
    //     let song = new Song(nameInput, chords)
    
    //     nameInput.addEventListener("focus", (event)=>{
    //         if(nameInput.value === "**New Song Title**"){
    //             event.target.value = ""
    //         }
    //     })
        
    //     nameInput.addEventListener("input", (event)=>{ //set name property on input change
    //         song.name = event.target.value
    //     })

    //     return song;
    // }

    // track(){
    //     let trackCard = document.getElementById("track") //this could go in new Song method
    //     while (trackCard.firstChild) {
    //         trackCard.firstChild.remove();
    //     }
    //     for (let trackChord of this.newSong.chords){
    //         let chordButtonTrack = document.createElement("button") //create these buttons from new song chords
    //         chordButtonTrack.className = "button btn-info"
    //         chordButtonTrack.href = "#" 
    //         chordButtonTrack.innerText = trackChord.name
    //         let minus = document.createElement("span")
    //         minus.innerHTML = `<svg class="bi bi-dash-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //                             <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>
    //                         </svg>`

    //         chordButtonTrack.appendChild(minus)
    //         trackCard.appendChild(chordButtonTrack)
    //         chordButtonTrack.addEventListener("click", (e)=>{
    //             chordButtonTrack.parentNode.removeChild(chordButtonTrack)
    //             trackChord.audio().pause()
    //             trackChord.audio().currentTime = 0
    //             // add audio to song
    //             // song could be an array
    //             this.newSong.chords = this.newSong.chords.filter(function(songChord){return songChord.id !== trackChord.id})
    //             // console.log(this.newSong)

    //         })
    //     }
    // }


    // addChordButton(chord){ 

    //     let chordsCard = document.getElementById("chords")
    //     let chordButton = document.createElement("button")
    //      //  <a href="#" class="btn btn-info">C</a>
    //      chordButton.className = "button btn-outline-info"
    //      chordButton.href = "#" 
    //      chordButton.innerText = chord.name
    //     let addIcon = document.createElement("span")
    //     addIcon.innerHTML = `<svg class="bi bi-plus-square-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //                         <path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>
    //                      </svg>`
    //     let audio = chord.audio() // use chord obj method to create audio tag from file
    //     chordButton.addEventListener("click", ()=> { // add chord to new song
    //         let trackChord = new Chord(chord.name, chord.file)
    //         trackChord.edit_id = Math.floor(Math.random() * Math.random() * 1000)
    //         this.newSong.chords.push(trackChord) //add chord object to song object chords attribute
    //         audio.play() //play chord audio
    //         this.track()
    //         // console.log(this.newSong)
        
    //     }) // add event listener to button to play

        
       
       
    //     chordsCard.appendChild(chordButton) // could add it to a list to fix spacing
    //     // div.appendChild(playButton)
    //     // chordsCard.appendChild(audio)
    //     chordButton.appendChild(addIcon)
        
    //     // add chord to song array

    // }

    renderSongButton(songObj){ //better called load songs? this is specific dom manipulation/html
        let songsCard = document.getElementById("songs")
        let songButton = document.createElement("button")
        songButton.className = "button btn-secondary"
        songButton.innerText = songObj.name
        songButton.addEventListener("click", ()=> {
            // console.log(songObj.audios())
            playSong(songObj.audios()) // need to pass in a song object with chords attribute as audios
            beat.play()
        }) // add event listener to button to play song
        songsCard.appendChild(songButton)
    }



}