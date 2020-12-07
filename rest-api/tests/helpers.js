import chai from 'chai';
import {
  generateToken,
  verifyToken
} from '../helpers/token';

chai.should();

describe('Token helper', () => {
    it('should generate a token', async () => {
      const token = await generateToken({
        'username': 'jack'
      });
      token.should.be.a('string');
      
    });
});