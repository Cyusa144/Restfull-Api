//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
const expect = chai.expect;
const should = chai.should();
import index from '../index';
import http from 'chai-http';
import userModal from "../models/user"
chai.use(http);
const User=require("../models/user")
//bcrypt
// import bcrypt from 'bcrypt';
let token = '';
let userId = "";
let user_input = {
  "name":"jack123",
  "email": "jack@gmail.com",
  "password": "123"
}

//token
describe("user API", () => {
  before((done)=>{
    try{
      User.remove({email:user_input.email})
      console.log("user deleted");
    }catch(err){
      console.log("user no found");
    }
    done()
  })
 
  it('Should exists', () => {
    expect(index).to.be.a('function');
  })

  
  it('Returns 404 error for non defined routes', (done) => {
    chai.request(index).get('/unexisting').then((res) => {
      expect(res).to.have.status(404);
      done();
    });
  });


// describe('User registration', () => {
  it('should return 201 and confirmation for valid input', (done) => {
    //mock valid user input
    let user_input = {
      "email": "jack@gmail.com",
      "password": "123"
    }
    //send /POST request to /register
    chai.request(index)
    .post('/api/user/login')
    .send(user_input)
    .then(res => {
      //validate
      expect(res).to.have.status(201);
      expect(res.body.message).to.be.equal('User registered');
      //new validations to confirm user is saved in database
      expect(res.body.user._id).to.exist;
      expect(res.body.user.createdAt).to.exist;
      //validation to confirm password is encrypted
      expect(res.body.user.password).to.not.be.eql(user_input.password);

      //done after all assertions pass
      
    }).catch(err => {
      console.log(err);
    });
    done();
  });
  // it('should create and return 201  for valid input', (done) => {
  //   //mock valid user input
  //   let user_input2 = {
  //     "name":"jabo",
  //     "email": "jabo@gmail.com",
  //     "password": "123"
  //   }
  //   //send /POST request to /register
  //   chai.request(index)
  //   .post('/api/user/create')
  //   .send(user_input2)
  //   .end((err ,res) => {
  //     //validate
  //     res.should.have.status(201);
//       res.should.be.a('object')
//       res.body.should.have.property('message').eql(' user successfully created ')
  
//     done()
//   })
// });


    it('should return 401 for invalid email input', () => {
      //mock invalid user input
      let user_invalid_input = {
        "email": "",
        "password": "123"
      }
      //send /POST request to /register
      chai.request(index)
      .post('/api/user/login')
      .send(user_invalid_input)
      .then(res => {
        //validate
        expect(res).to.have.status(401);
        expect(res.body.errors.length).to.be.equal(1);

        //done after all assertions pass
        done();
      }).catch(err => {
        console.log(err);
      });
    });
    
    //when the password is not provided
    it('should return 401 for invalid password input', () => {
      //mock invalid user input
      let user_invalid_input = {
        "email": "jado@gmail.com"
      }
      //send /POST request to /register
      chai.request(index)
      .post('/api/user/login')
      .send(user_invalid_input)
      .then(res => {
        //validate
        expect(res).to.have.status(401);
        expect(res.body.errors.length).to.be.equal(1);

        //done after all assertions pass
        done();
      }).catch(err => {
        console.log(err);
      });
    });


    it('Should return error 400 when email already registered', () => {
        //user that already exists (added in previous test)
        const new_user = {
            "email": "jack@gmail.com",
            "password": "123"
        }
        //send request to the index
        chai.request(index)
        .post('/api/user/login')
        .send(new_user)
        .then((res) => {
            //console.log(res.body);
            //assertions
            expect(res).to.have.status(400);
            done();
        }).catch(err => {
        console.log(err.message);
        });
    });


  it('Should save password encrypted', (done) => {
    //mock valid user input
    const new_user = {
      "email": "jack@gmail.com",
      "password": "123"
    }
    //send request to the index
    chai.request(index)
    .post('/user/login')
      .send(new_user)
        .then((res) => {
       
          expect(res.body.email).to.not.be.equal("jack@gmail.com");
          expect(res.body.password).to.not.be.equal("123");

          done();
        }).catch(err => {
          console.log(err.message);
        })
  })



  it('should return error 400 for empty email', (done) => {
    //mock invalid user input
    const wrong_input = {
      "email": "",
      "password": "password"
    }
    //send request to the index
    chai.request(index)
    .post('/api/user/login')
      .send(wrong_input)
        .then((res) => {
          //console.log(res.body);
          //assertions
          expect(res).to.have.status(400);
          console.log(err.message);
        });
        done();
  }); 

  it('should return error 400 for empty password', (done) => {
    //mock invalid user input
    const wrong_input = {
      "email": "notvalidmail",
      "password": ""
    }
    //send request to the index
    chai.request(index)
    .post('/api/user/login')
      .send(wrong_input)
        .then((res) => {
          expect(res).to.have.status(400);
        }).catch(err => {
          console.log(err.message);
        });
        done();
  }); 

  it('should return error 401 for invalid email', (done) => {
    //mock invalid user input
    const wrong_input = {
      "email": "cyusa12@gmail.com",
      "password": "123"
    }
    //send request to the index
    chai.request(index)
    .post('/api/user/login')
      .send(wrong_input)
        .then((res) => {
          console.log(res.body);
          //assertions
          expect(res).to.have.status(404);
          expect(res.body.message).to.be.equal("Invalid username or password");
         
        }).catch(err => {
          console.log(err.message);
        })
        done();
  });


  it('should return error 401 for invalid credentials', () => {
    //mock invalid user input
    const wrong_input = {
      "email": "jack@gmail.com",
      "password": "invalidPassword"
    }
    //send request to the index
    chai.request(index)
    .post('/api/user/login')
      .send(wrong_input)
        .then((res) => {
          //console.log(res.body);
          //assertions
          expect(res).to.have.status(401);
          expect(res.body.message).to.be.equal("auth error");
          done();
        }).catch(err => {
          console.log(err.message);
        })
  }); 

  it('should return 200 and token for valid credentials', (done) => {
    //mock invalid user input
    const valid_input = {
      "email": "jack@gmail.com",
      "password": "123"
    }
    //send request to the index
    chai.request(index)
    .post('/api/user/login')
      .send(valid_input)
        .then((res) => {
          //assertions
          expect(res).to.have.status(200);
          done();
        }).catch(err => {
          console.log(err.message);
        })
  });
});
