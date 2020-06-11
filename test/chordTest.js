const assert = chai.assert;
const expect = chai.expect;
let chord, edit_id, audio;


describe("Chord", () => {
  beforeEach(() => {
    chord = new Chord("A", "assets/chords/A.wav")
    audio = chord.audio()
  })

  it("has a class of Chord", () => {
    expect(chord).to.be.an.instanceof(Chord);
    expect(chord).to.have.property('name')
    expect(chord).to.have.property('file')
    expect(chord).to.have.property('edit_id')
  })
  it("The chord name is returned", () => {
    expect(chord.name).to.eq('A')
  })
  it("The chord file directory is returned", () => {
    expect(chord.file).to.eq('assets/chords/A.wav')
  })
  it("The chord random edit_id exists", () => {
    expect(chord.edit_id).to.be.a('number')
  })
  it("The chord audio has correct source", () => {
    expect(audio.src).to.eq("file:///Users/santiago/Development/code/chords_beats_frontend/test/assets/chords/A.wav")
  })

})
