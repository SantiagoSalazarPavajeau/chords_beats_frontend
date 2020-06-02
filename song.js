class Song{
    constructor(name, chordsJSON){
        this.name = name
        this.chords = chordsJSON // create audios from chord with setter and getter methods
        this.files = this.files()
        this.beat = this.beat()
        this.audios = this.audios()
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

    audios(){
        let audios = []
        for(let chord of this.chords){
            let audio = document.createElement("audio")
            audio.src = chord.file
            audios.push(audio)
        }
        return audios;
    } 

}