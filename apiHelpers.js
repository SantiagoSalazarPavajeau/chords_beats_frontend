baseURL = "https://thawing-temple-12065.herokuapp.com/"

function getSongs(){
    return fetch(`${baseURL}/songs`)
                .then(resp => resp.json())
                .then((songs) => {
                    let loading = document.getElementById("loading")
                    loading.removeChild(loading.childNodes[0])
                    for(let song of songs.data){
                        let chordObjs = []
                        for(let chord of song.attributes.chords){
                            let newchord = new Chord(chord.name, chord.file)
                            chordObjs.push(newchord)
                        }
                        let songObj = new Song(song.attributes.name, chordObjs, song.id)

                        allSongs.push(songObj)
                    }
                    for(let song of allSongs){
                        
                        song.renderSongButton() // make this song.renderSongButton for example and other methods so classes take some of the code from the adapter
                    }
                    
                })
                .catch(error => alert(error))
}

function saveSong(song){ 
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

    if(song.name.trim().length === 0){
        return alert("Add a song name")
    } else{
        return fetch(`${baseURL}/songs`, postObj)
        .then(resp => resp.json())
        .then(json=> {
            let chordObjs=[]

            for(let chord of json.data.attributes.chords){
                chordObjs.push(new Chord(chord.name, chord.file))
            }
            let song = new Song(json.data.attributes.name, chordObjs, json.data.id)
            allSongs.push(song)
            
            song.renderSongButton()
        }) 
        .catch(error => alert(`Cant render new song and ${error}`))
    }
}

function deleteSong(song){
    let deleteObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

    }
    return fetch(`${this.baseURL}/songs/${song.id}`, deleteObj)
        .then(resp => resp.json())
        .then(()=> {
            alert("Song deleted")
        }) 
        .catch(error => alert(`Couldn't delete song and ${error}`))
}