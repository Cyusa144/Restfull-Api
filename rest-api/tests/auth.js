import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    verifyToken
  } from '../middleware/auth';

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

const res = {
    send: function(){ },
    json: function(err){
        return err;
    },
    status: function(responseStatus) {
        return responseStatus; 
    }
};
const next = () => {
    return true;
}

describe('Verify Token', () => {
    it('should not provide token', () => {
        const req = {
            headers : {
                auth: null,
            }
        };
        const response = verifyToken (req, res, next);
    });
    it('should provide token', () => {
        const req = {
            headers : {
                auth: true,
            }
        };
        const response = verifyToken (req, res, next);
    });
})
