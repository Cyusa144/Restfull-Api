import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.should();
chai.use(chaiHttp);

let token = '';
let contactId = "";

describe('contacts', () => {
    it('should get all contact', (done) => {
      chai.request(index)
        .get('/api/contact')
        .then((res) => {
          res.should.have.status(200);
          done();
          // res.body.user.should.be.a('array');
        });
        // .catch((error) => {
        //   console.log(error)
      });
    // });
    it('It return token when logged in with valid credentials', (done) => {
      //Mock login
      const valid_input = {
        "email": "cyusa@gmail.com",
        "password": "123"
      }
      //send login
      chai.request(index)
      .post('/api/user/login')
      .send(valid_input)
         .then((login_response) => {
        //add token
        token = login_response.body.token;
        done();
      });
    });
    it('should add new contact' , () => {
        const contact ={
            name: 'cyusa',
            email: 'cyusa@gmail.com',
            phone: '07855676767',
            message: 'Hello, this is a message from contact'
        }
        chai.request(index)
        .post('/api/contact')
        .set('auth', token)
        .send(contact)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('contact');
          res.body.article.should.have.property('_id')
          res.body.article.should.have.property('name').eql('cyusa');
				  res.body.article.should.have.property('email').eql('cyusa@gmail.com');
				  res.body.article.should.have.property('phone').eql('0788994455');
				  res.body.article.should.have.property('message').eql('lets see');
          contactId = res.body.article._id;
        })
        .catch((error) => {
          console.log(error)
    });
    });
    it('it should GET a contact by the given id', (done) => {
      chai.request(index)
      .get('/api/contact'+ contactId)
      .then((res) => {
          res.should.have.status(200);
        done();
    });
  });
});