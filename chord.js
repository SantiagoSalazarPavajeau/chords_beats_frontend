// export default 
class Chord{
    constructor(name, file){
        this.name = name
        this.file = file
        this.edit_id = Math.floor(Math.random() * Math.random() * 1000)
        this.audio = document.getElementById(this.name.substring(0, this.name.length - 1))
    }

}




