const assert = require('chai').assert;
const chord = require('../chord')
const song = require('../song').default
const app = require('../app')

describe('Song', function() {


    describe('Song Constructor Function', function() {
      let synthwave;
      before(() => {
        synthwave = new Song("Synthwave", chords, 1)
        chordA = new Chord("A", "assets/chords/A.wav")
        ChordB = new Chord("B", "assets/chords/B.wav")
        chords = []
        chords.push(chordA)
        chords.push(ChordB)
      })
      it('can create a Song with a name, chords, and id', function() {
        expect(synthwave).to.be.an.instanceof(Song)
        expect(synthwave.name).to.equal("Synthwave")
        expect(synthwave.chords).to.equal(chords)
        expect(synthwave.id).to.equal(1)
      })
    })
})