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
    it('should add new contact' , (done) => {
        const contact ={
            name: 'cyusa',
            email: 'cyusa@gmail.com',
            phone: '0788994455',
            message: 'lets see'
        }
        chai.request(index)
        .post('/api/contact')
        .set('auth', token)
        .send(contact)
        // .field('name', 'cyusa')
        // .field('email', 'cyusa@gmail.com')
        // .field('phone', '0788994455')
        // .field('message', 'lets see')
		    
        .then((err,res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
				  res.body.should.have.property('message').eql('successfully created contact');
          res.body.should.have.property('contact');
          res.body.contact.should.be.a('object');
          res.body.contact.should.have.property('_id')
          res.body.contact.should.have.property('name').eql('cyusa');
				  res.body.contact.should.have.property('email').eql('cyusa@gmail.com');
				  res.body.contact.should.have.property('phone').eql('0788994455');
				  res.body.contact.should.have.property('message').eql('lets see');
          contactId = res.body.contact._id;
        })
        .catch((error) => {
          console.log(error)
    });
    });
    it('it should GET a contact by the given id', (done) => {
      chai.request(index)
      .get('/api/contact/'+ "5fb38978d1d1b4705dbfd642")
      .then((res) => {
          res.should.have.status(200);
        done();
    });
  });

  it('it should DELETE a contact given the id', (done) => {
		
    chai.request(index)
    .delete('/api/contact/' + '5fb3892bbad4c27034bc43d4' )
    .set('auth', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql('contact successfully deleted');
      // res.body.result.should.have.property('ok').eql(1);
      // res.body.result.should.have.property('n').eql(1);
    done();
    });
});

it('it should not DELETE a contact given an invalid contact id', (done) => {

chai.request(index)
.delete('/api/contact/' +'5fb37ccf3ffc016309cd255'
)
.set('auth', token)
.end((err, res) => {
    res.should.have.status(404);
    res.body.should.be.a('object');
    res.body.should.have.property('error').eql('invalid contact id');
    // res.body.result.should.have.property('ok').eql(1);
    // res.body.result.should.have.property('n').eql(1);
  done();
});
});


});
