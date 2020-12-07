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
        });
      });
    it('It return token when logged in with valid credentials', (done) => {
      //Mock login
      const valid_input = {
        "email": "jack@gmail.com",
        "password": "123"
      }
      //send login
      chai.request(index)
      .post('/api/user/login')
      .send(valid_input)
         .then((login_response) => {
			   login_response.should.have.status(200);

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
        done();
        // .catch((error) => {
        //   console.log(error)
    // });
    });
    it('should not add new contact' , (done) => {
      const contact ={
          
          email: 'cyusa@gmail.com',
          phone: '0788994455',
          message: 'lets see'
      }
      chai.request(index)
      .post('/api/contact')
      .set('auth', token)
      .send(contact)
      .then((err,res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
       
      })
      done();
      // .catch((error) => {
      //   console.log(error)
  // });
  });
    it('it should GET a contact by the given id', (done) => {
      chai.request(index)
      .get('/api/contact/'+ contactId)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
				res.body.should.have.property('message').eql('successfully fetched contact');
			  res.body.should.have.property('contact');
			  res.body.contact.should.be.a('object');
				res.body.contact.should.have.property('_id')
				res.body.contact.should.have.property('title');
				res.body.contact.should.have.property('content');
				res.body.contact.should.have.property('image');
				contactId = res.body.contact._id;
        
    });
    done();
  });
  it('it should not GET a contact by the given invalid id', (done) => {
    chai.request(index)
    .get('/api/contact/'+ '5fb37d81ba8179637f1cc067')
    .then((res) => {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('invalid contact id');
     
  });
  done();
});
it('it should not GET a contact by the given bad id', (done) => {
  chai.request(index)
  .get('/api/contact/'+ '5fb37dba8179637f1cc067')
  .then((res) => {
    res.should.have.status(500);
    res.body.should.be.a('object');
   
   
});
done();
});

  it('it should DELETE a contact given the id', (done) => {
		
    chai.request(index)
    .delete('/api/contact/' + '5fbbbd2f11cf6134aa81d960')
    .set('auth', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success').eql('contact successfully deleted');
      contactId = res.body.contact._id;
      });
      done();
});

it('it should not DELETE a contact given an invalid contact id', (done) => {

chai.request(index)
.delete('/api/contact/' + '5fb6c0de87cf9b49ada4bc2')
.set('auth', token)
.end((err, res) => {
    res.should.have.status(404);
    res.body.should.be.a('object');
    res.body.should.have.property('error').eql('invalid contact id');
  
  done();
});
});


});
