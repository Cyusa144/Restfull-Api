import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.should();
chai.use(chaiHttp);

describe('contacts', () => {
    it('should get all contact', () => {
      chai
        .request(index)
        .get('/api/contact')
        .then((res) => {
          res.should.have.status(200);
          res.body.user.should.be.a('array');
        })
        .catch((error) => {
          console.log(error)
      });
    });
    it('should add new contact' , () => {
        const contact ={
            name: 'cyusa',
            email: 'cyusa@gmail.com',
            phone: '07855676767',
            message: 'Hello, this is a message from contact'
        }
        chai
        .request(index)
        .post('/api/contact')
        .send(contact)
        .then((res) => {
          res.should.have.status(201);
        })
        .catch((error) => {
          console.log(error)
    });
    });
    });