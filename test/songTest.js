const assert = chai.assert;
const expect = chai.expect;
let chord;


describe("Chord", () => {
  beforeEach(() => {
    chord = new Chord("A", "assets/chords/A.wav")
  })

  it("has a class of Chord", () => {
    expect(new Chord()).to.be.an.instanceof(Chord);
  })
  it("chord.name returns name", () => {
    expect(chord.name).to.eq('A')
  })
})
