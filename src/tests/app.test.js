import request from 'request';
import assert from 'assert';

const baseUrl = 'http://localhost:3000/';

describe('magma-backend app testing', () => {
  describe('GET /', () => {
    it('returns status code 200', (done) => {
      request.get(baseUrl, (error, res) => {
        console.log(error, res.statusCode);
        assert.equal(200, res.statusCode);
        done();
      });
    });
  });
});
