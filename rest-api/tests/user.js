import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.should();
chai.use(chaiHttp);

describe('Users', () => {
    it('should fech all users', () => {
      chai
        .request(index)
        .get('/api/user')
        .then((res) => {
          res.should.have.status(200);
          res.body.user.should.be.a('object');
        })
    });
    it('should add a new user', () => {
        const newUser ={
            name: "jabiro",
            email: "abiro@gmail.com",
            password: "123"
        }
        chai
        .request(index)
        .post('/api/user/create')
        .send(newUser)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('user successfully created');
          done();
        })
       
    });

    it('should not add a new user without a name', () => {
      const newUser ={
          email: "jabiro@gmail.com",
          password: "123"
      }
      chai
      .request(index)
      .post('/api/user/create')
      .send(newUser)
      .then((res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        
        done();
      })
    });

    it('should login user' , () => {
        const login ={
            email: "jack@gmail.com",
            password: "123"
        }
        chai
        .request(index)
        .post('/api/user/login')
        .send(login)
        .then((res) => {
          res.should.have.status(200);
          res.body.login.should.be.a('object');
        })
       
    });

    it('should not login user with invalid credentials' , () => {
      const login ={
          email: "jack123@gmail.com",
          password: "1234"
      }
      chai
      .request(index)
      .post('/api/user/login')
      .send(login)
      .then((res) => {
        res.should.have.status(404);
        res.body.login.should.be.a('object');
      })
      .catch((error) => {
          console.log(error)
      
  });
  });
  
});

