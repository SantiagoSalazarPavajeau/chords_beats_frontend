describe('Song', function() {


    describe('Song Constructor Function', function() {
      let synthwave;
      before(() => {
        chordA = new Chord("A", "assets/chords/A.wav")
        synthwave = new Song("Synthwave", [chord], 1)
      })
      it('can create a BoardMember with a name, home state, and training', function() {
        expect(synthwave).to.be.an.instanceof(Song)
        expect(synthwave.name).to.equal("Synthwave")
        expect(synthwave.chords).to.equal([chord])
        expect(synthwave.id).to.equal(1)
      })
    })