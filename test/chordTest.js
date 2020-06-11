const assert = chai.assert;
const expect = chai.expect;
let chord, edit_id;


describe("Chord", () => {
  beforeEach(() => {
    chord = new Chord("A", "assets/chords/A.wav")
    edit_id = chord.edit_id
  })

  it("has a class of Chord", () => {
    expect(new Chord()).to.be.an.instanceof(Chord);
  })
  it("The chord name is returned", () => {
    expect(chord.name).to.eq('A')
  })
  it("The chord file directory is returned", () => {
    expect(chord.file).to.eq('assets/chords/A.wav')
  })
  it("The chord random edit_id exists", () => {
    expect(chord.edit_id).to.eq(edit_id)
  })
})
