// bridge between all modules

class App{
    constructor(){
        this.adapter = new Adapter
        this.loadSongs()
        this.loadChords()
    }

    loadSongs(){ //loads songs as complex objects from server in the form of buttons on songs card
        this.adapter.getSongs()
            .then((songs) => {
                // render song takes in a song object
                //need to manipulate songs json
                // or fix the get request link
                // console.log(songs.data)
                this.adapter.newSong
                for(let song of songs.data){
                    this.adapter.renderSongButton(song) 
                }
            //    console.log(serverSongs)
            })
    }

    loadChords(){
        let chordData = ["A.wav ", "Ab.wav ", "Am.wav ", "Bb.wav ", "C.wav ", "Dm.wav ", "Em.wav ", "F.wav ", "Gm.wav "]
        let chordObjs = []
        for(let string of chordData){
            chordObjs.push(new Chord(`${string.substring(0, string.length - 5)} `, `assets/chords/${string}`)) // # 2 creates random edit_id
        }
        for(let chord of chordObjs){
            this.adapter.addChordButton(chord) // send chord object
        }
    }




}

const app = new App