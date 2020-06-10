describe('Song', function() {


    describe('Song Constructor Function', function() {
      let synthwave;
      before(() => {
        chordA = new Chord("A", "assets/chords/A.wav")
        ChordB = new Chord("B", "assets/chords/B.wav")
        chords = []
        chords.push(chordA)
        chords.push(ChordB)
        synthwave = new Song("Synthwave", chords, 1)
      })
      it('can create a BoardMember with a name, home state, and training', function() {
        expect(synthwave).to.be.an.instanceof(Song)
        expect(synthwave.name).to.equal("Synthwave")
        expect(synthwave.chords).to.equal(chords)
        expect(synthwave.id).to.equal(1)
      })
    })