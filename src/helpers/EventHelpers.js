function onButton(){
    const on = document.querySelector(".on-button")
    const cover = document.querySelector(".cover")
    on.addEventListener('click', () => {
        cover.className = "no-cover"
        on.className = "no-cover"
        newSong.playSong()
    })
}

function handleChordButtons(){
    const chordButtons = document.querySelectorAll(".chord-add-button")
    for(let chordButton of chordButtons){
        chordButton.addEventListener("click", (e) =>{
            updateNewSong()
            const audio = document.getElementById(chordButton.dataset.note)
            audio.play()
            const chordName = chordButton.innerText
            const newChord = new Chord(chordName, `assets/chords/${chordName}.wav`)
            newSong.chords.push(newChord) //add chord object to song object chords attribute
            updateNewSong()
        })
    }
}

function handleKeyboardNotes(){

    const synth = new Tone.Synth().toDestination();
    synth.oscillator.type = "fmsawtooth"
    synth.oscillator.modulationType = "triangle";

    const wavesButtons = document.querySelectorAll("button.waves")

    for( let wavesButton of wavesButtons){
        wavesButton.addEventListener("click", (e) => {
            synth.oscillator.type = e.target.innerText.toLowerCase()
        })
    }

    document.addEventListener("keydown",  (e) => {
        switch (e.code) {
            case "ShiftLeft":
                return synth.triggerAttackRelease("A1", "16n")
            case "KeyZ":
                return synth.triggerAttackRelease("A#1", "16n")
            case "KeyX":
                return synth.triggerAttackRelease("B1", "16n")
            case "KeyC":
                return synth.triggerAttackRelease("C2", "16n")
            case "KeyV":
                return synth.triggerAttackRelease("C#2", "16n")
            case "KeyB":
                return synth.triggerAttackRelease("D2", "16n")
            case "KeyN":
                return synth.triggerAttackRelease("D#2", "16n")
            case "KeyM":
                return synth.triggerAttackRelease("E2", "16n")
            case "Comma":
                return synth.triggerAttackRelease("F2", "16n")
            case "Period":
                return synth.triggerAttackRelease("F#2", "16n")
            case "Slash":
                return synth.triggerAttackRelease("G2", "16n")
            case "ShiftRight":
                return synth.triggerAttackRelease("G#2", "16n")
            case "KeyA":
                return synth.triggerAttackRelease("A2", "16n");
            case "KeyS":
                return synth.triggerAttackRelease("A#2", "16n");
            case "KeyD":
                return synth.triggerAttackRelease("B2", "16n");
            case "KeyF":
                return synth.triggerAttackRelease("C3", "16n");
            case "KeyG":
                return synth.triggerAttackRelease("C#3", "16n");
            case "KeyH":
                return synth.triggerAttackRelease("D3", "16n");
            case "KeyJ":
                return synth.triggerAttackRelease("D#3", "16n");
            case "KeyK":
                return synth.triggerAttackRelease("E3", "16n");
            case "KeyL":
                return synth.triggerAttackRelease("F3", "16n");
            case "Semicolon":
                return synth.triggerAttackRelease("F#3", "16n");
            case "Quote":
                return synth.triggerAttackRelease("G3", "16n");
            case "Enter":
                return synth.triggerAttackRelease("G#3", "16n");
            default:
              return;
          }
    })

} 



function createNewSong(){ //catches new chords being added as well as name and returns a new song object
    let nameInput = document.getElementById("songName") // name to initialize object
    
    let chordData = [ "F.wav ", "C.wav ", "Em.wav ", "F.wav ", "F.wav ", "C.wav ", "Em.wav ", "F.wav "]// this is empty so no audios are created
    
    let chordObjs = []

    for(let string of chordData){
        chordObjs.push(new Chord(`${string.substring(0, string.length - 5)} `, `assets/chords/${string}`)) // # 3 creates random edit_id for chord buttons created on new song on load of track these chord buttons are stored in ng
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

function updateNewSong(){

    let trackCard = document.getElementById("track") 
    
    while (trackCard.firstChild) {
        trackCard.firstChild.remove(); 
    }

    for (let newSongChord of newSong.chords){

        let chordButtonTrack = createNewSongChordButton(newSongChord)

        trackCard.appendChild(chordButtonTrack)

        chordButtonTrack.addEventListener("click", (e)=>{

            newSong.chords = newSong.chords.filter((chord)=>{return chord.edit_id !== newSongChord.edit_id})

            newSong.files  = []
            for(let chord of newSong.chords){
                newSong.files.push(chord.file)
            }

            newSongChord.audio.pause()
            newSongChord.audio.currentTime = 0
            chordButtonTrack.parentNode.removeChild(chordButtonTrack)
            updateNewSong()
            
        })
    }
}

function renderPlayButton(){

    let trackBtns = document.getElementById("track-btns")

    let playButton = createPlayButton()

    playButton.addEventListener("click", ()=> {
        //select all audios from the track card or use the song array
        updateNewSong()
        newSong.playSong()
        
    }) // add event listener to button to play 
    trackBtns.appendChild(playButton)

}

function renderPauseButton(){
    let trackBtns = document.getElementById("track-btns")

    let allAudios = document.querySelectorAll("audio")

    let pauseButton = createPauseButton()

    pauseButton.addEventListener("click", ()=>{
        for(let audio of allAudios){
            audio.pause()
            audio.currentTime = 0
        }
        newSong.stop()

        for(let song of allSongs){
            song.stop()
            song.beat.pause()
            song.beat.currentTime = 0
        }
        const songButtons = document.getElementsByClassName("song-button")
        for(let songButton of songButtons){
            songButton.disabled = false
        }
        newSong.beat.pause()
        newSong.beat.currentTime = 0
        document.getElementById("play").disabled = false



      
    })
    trackBtns.appendChild(pauseButton)
}

function saveSongButton(){
    let nsContainer = document.getElementById("new-song-container")
    let saveButton = createSaveSongButton()
    saveButton.addEventListener("click", ()=>{
        
        if(typeof newSong.name === "object"){
            alert("First add a name to the song!")
        }else{
            saveSong(newSong)
        }
    })
    nsContainer.appendChild(saveButton)
}

function beatDropdown(){
    const dropdownMenu = document.getElementById("dropdown-menu")
    const dropdownButton = document.getElementById("dropdownMenuButton")

    const beats = ["No Beat    ", "Analog.wav", "Acoustic.wav", "Groovy.wav", "Hip.wav"]

    for(let beat of beats){
        let a = createDropDownItem(beat)
        dropdownMenu.appendChild(a)
        a.addEventListener("click", ()=>{
            document.getElementById("stop").click()
            let newBeat = createNewBeatAudio(beat)
            newSong.beat = newBeat
            dropdownButton.innerText = beat.substring(0, beat.length - 4)
        })
    }

}