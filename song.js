class Song{
    constructor(name, chords){
        this.name = name
        this.chords = chords // create audios from chord with setter and getter methods
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
        beat.src = "assets/beats/DQ.wav"
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