//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
/**
 * test/test.js
 * All endpoint tests for the auth API
 */

import chai from 'chai';
const expect = chai.expect;
import index from '../index';
import jwt from 'jsonwebtoken';
import { generateToken } from "../helpers/token";
//chai-http used to send async requests to our index
import http from 'chai-http';
chai.use(http);

//import User model
import User from '../models/user';

//bcrypt
// import bcrypt from 'bcrypt';
let token = '';
let userId = "";

//token
describe("Articles API", () => {
 
  it('Should exists', () => {
    expect(index).to.be.a('function');
  })

  
  it('Returns 404 error for non defined routes', (done) => {
    chai.request(index).get('/unexisting').then((res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
})

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
            // expect(res.body.message).to.be.equal("Invalid email");
            // expect(res.body.errors.length).to.be.equal(1);
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
          //console.log(res.body);
          //assertions
          
          expect(res.body.email).to.not.be.equal("jack@gmail.com");
          expect(res.body.password).to.not.be.equal("123");

          done();
        }).catch(err => {
          console.log(err.message);
        })
  })

  

// })

// describe('User login', () => {

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
          // expect(res.body.message).to.be.equal("Invalid input");
          // expect(res.body.errors.length).to.be.equal(1);
          
        }).catch(err => {
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
          //console.log(res.body);
          //assertions
          expect(res).to.have.status(400);
          // expect(res.body.message).to.be.equal("Invalid input");
          // expect(res.body.errors.length).to.be.equal(1);
          
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
          done();
        }).catch(err => {
          console.log(err.message);
        })
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
          // expect(res.body.token).to.exist;
          // expect(res.body.message).to.be.equal("Auth OK");
          // expect(res.body.errors.length).to.be.equal(0);
          done();
        }).catch(err => {
          console.log(err.message);
        })
  });
// });


/*
		* Test the /DELETE/:id route
		*/
// 		describe('Delete a user', () => {
// 			it('it should DELETE a user given the id', () => {
//         //Mock login
//         const valid_input = {
//           "email": "cyusa@gmail.com",
//           "password": "123"
//         }
        
//         //send login
//         chai.request(index).post('/user/login')
//           .send(valid_input)
//           .then((login_response) => {
//           //add token
//           token = 'Bearer ' + login_response.body.token;
// 				let user = new User({
// 					email: "cyusa@gmail.com",
// 					password: "123"
//         })
//         const token = generateToken(user)
// 				user.save((err, user) => {
// 					  chai.request(index)
// 					  .delete(`/user/${user.id}`)
// 					  .set('auth', `Bearer ${token}`)
// 					  .end((err, res) => {
//               console.log(res.body)
// 							res.should.have.status(200);
// 							res.body.should.be.a('object');
// 							res.body.should.have.property('message').eql('User deleted!');
// 							res.body.result.should.have.property('ok').eql(1);
// 							res.body.result.should.have.property('n').eql(1);
// 						done();
// 					  });
// 				});
//       });
//     });
        
// });
// });
