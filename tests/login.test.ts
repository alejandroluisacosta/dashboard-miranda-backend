const request = require('supertest');
const { app }  = require('../index');

describe("Authentication tests", () => {
    it('Authentication middleware denies requests of users that aren\'t logged in', async () => {
        const res = await request(app)
          .get('/bookings');
    
        expect(res.status).toBe(401);
      })
    
      it('Authentication middleware denies requests if credentials aren\'t correct', async () => {
        const res = await request(app)
          .post('/login')
          .send({
              "username": "Johnny",
              "password": "12345"
          })
          .set("Content-Type", "application/json");
    
          expect(res.status).toBe(401);
      })
})