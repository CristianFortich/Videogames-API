/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'resident trucho',
  description: 'a fake RE',
  rating: 2.3,
  released: "2020-01-01",
  platforms: "pc"
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 201 and name "resident trucho"', () =>
      agent.get('/videogames').expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body[0].name).to.eql("resident trucho")
      })
    );
    it('should get 201 and name "resident trucho when adding /videogame/id"', () =>
      agent.get('/videogame/1').expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body.name).to.eql("resident trucho")
      })
    );
  });
  describe('DELETE /videogame', () => {
    it('should get 404 if id provided does not exist', () =>
      agent.delete('/videogame/2').expect(404)
    );
    it('should get 201 if an exising id is added"', () =>
      agent.delete('/videogame/db-1').expect(201)
    );
  });
  // xdescribe('POST /videogame', () => {
  //   it('should get 404 if the info provided is not accepted by the db', () =>
  //     agent.post('/videogame', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         name: "sdf.kjbadfl",
  //         description: "sdflkhgbldfjhgb",
  //         released: "2020-01-01",
  //         rating: 6,
  //         genres: [2],
  //         platforms: "pc"
  //       })
  //     }).expect(401)
  //   );
  //   it('should get 201 if the new game is created', () =>
  //     agent.post('/videogame', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         name: "sdf.kjbadfl",
  //         description: "sdflkhgbldfjhgb",
  //         released: "2020-01-01",
  //         rating: 3,
  //         genres: [2],
  //         platforms: "pc"
  //       })
  //     }).expect(201)
  //   );
  // });
});
