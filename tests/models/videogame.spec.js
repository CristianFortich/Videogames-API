const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const game = {
  name: "Resident trucho",
  description: "a fake RE",
  released: "2020-01-01",
  rating: 2,
  platforms: "pc"
}

describe('Videogame model', () => {
  before(() => 
  conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({
          description: "a fake RE",
          released: "2020-01-01",
          rating: 2,
          platforms: "pc"
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if description is null', (done) =>{
        Videogame.create({
          name: "Resident trucho",
          released: "2020-01-01",
          rating: 2,
          platforms: "pc"
        })
        .then(()=>done(new Error ('It requires a valid description')))
        .catch(()=>done())
      });
      it('should return an error if platforms is null ', (done) =>{
        Videogame.create({
          name: "Resident trucho",
          description: "a fake RE",
          released: "2020-01-01",
          rating: 2
        })
        .then(()=>done(new Error ('It requires a valid description')))
        .catch(()=>done())
      });
    });
  });
});
