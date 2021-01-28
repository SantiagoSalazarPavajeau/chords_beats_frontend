
function onButton(){
    const on = document.querySelector(".on-button")
    const cover = document.querySelector(".cover")
    const body = document.querySelector("before-slide")
    on.addEventListener('click', () => {
        cover.className = "no-cover"
        on.className = "no-cover"
        body.className = "slide"
        app.adapter.newSong.playSong()
    })
}

function handleChordButtons(){
    const chordButtons = document.querySelectorAll(".chord-add-button")
    for(let chordButton of chordButtons){
        chordButton.addEventListener("click", (e) =>{
            app.adapter.updateTrack()
            const audio = document.getElementById(chordButton.dataset.note)
            audio.play()
            const chordName = chordButton.innerText
            const newChord = new Chord(chordName, `assets/chords/${chordName}.wav`)
            app.adapter.newSong.chords.push(newChord) //add chord object to song object chords attribute
            app.adapter.updateTrack()
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