// i
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import Article from '../models/article';
import index from '../index';

let should = chai.should();
let expect = chai.expect();

chai.use(chaiHttp);

//to hold the token
let token = '';
let articleId = "";

//Our parent block
describe('Articles', () => {
	// beforeEach((done) => {
    // Article.remove({});
    // done();
	// });
  /*
  * Test the /GET route
  */

	  it('it should GET all the articles', (done) => {
			chai.request(index)
			.get('/api/article')
		    .then((res) => {
			  	res.should.have.status(200);
			  done();
			
		    });
	  }); 

  /*
  	* Test the /POST route
  */


  it('It return token when logged in with valid credentials', (done) => {
	  //Mock login
		const valid_input = {
			"email": "jack123@gmail.com",
			"password": "123"
		}
		//send login
		chai.request(index)
		.post('/api/user/login')
		.send(valid_input)
		   .then((login_response) => {
			   login_response.should.have.status(200);
			//    login_response.should.be.a("obj")
			token = login_response.body.token;
			
			done();
			
		});
  });

	it('it should POST an article', (done) => {
		 chai.request(index)
		 .post('/api/article')
		 .set('auth', token)
		 .set('Content-Type', 'application/x-www-form-urlencoded')
		 .field('title', 'html')
		 .field('content', 'html is awesomee')
		 .attach('articleImage',
		   fs.readFileSync(`${__dirname}/image.jpg`), 'image.jpg')
		.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('successfully created article');
				res.body.should.have.property('article');
				res.body.article.should.be.a('object');
				res.body.article.should.have.property('_id')
				res.body.article.should.have.property('title').eql('html');
				res.body.article.should.have.property('content').eql('html is awesomee')
				res.body.article.should.have.property('image')
				articleId = res.body.article._id;
		done();
		});
	});
  
/*
  * Test the /GET/:id route
  */
//   describe('/GET/:id article', () => {
	  it('it should GET an article by the given id', (done) => {
		chai.request(index)
		.get('/api/article/'+ '5fb4f25c4c5adf16a2de1380')
		.then((res) => {
			   res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('successfully fetched article');
			  	res.body.should.have.property('article');
			  	res.body.article.should.be.a('object');
			  	res.body.article.should.have.property('_id')
				res.body.article.should.have.property('title');
				res.body.article.should.have.property('content');
				res.body.article.should.have.property('image');
				articleId = res.body.article._id;
		      done();
		    });
		  });
		  
		  it('it should not GET an article given an invalid article id', (done) => {
		
			chai.request(index)
			.get('/api/article/' +'5fb4f25c4c5adf16a2xx1380')
			.set('auth', token)
			.end((err, res) => {
				  res.should.have.status(404);
				  res.body.should.be.a('object');
				  res.body.should.have.property('message').eql('invalid article id');
				  articleId = res.body.article._id;
				done();
			});
	});	  

			
// 	//   });
// //   });

// //   /*
// //   * Test the /PUT/:id route
// //   */
// //  describe('/PUT/:id article', () => {
	it('it should UPDATE an article given the id', (done) => {
			  chai.request(index)
			  .patch('/api/article/' + '5fb4f25c4c5adf16a2de1380')
			  .set('auth', token)
			  .send({title: "Java basics", content: "java", image: "image lorem" })
			  .end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('successfully updated article');
					res.body.should.have.property('post');
			  	    res.body.post.should.be.a('object');
			  	    res.body.post.should.have.property('_id')
				    res.body.post.should.have.property('title');
				    res.body.post.should.have.property('content');
				    res.body.post.should.have.property('image');
				    articleId = res.body.article._id;
				 done();
			  });
		});
		it('it should not UPDATE an article given an invalid article id', (done) => {
		
			chai.request(index)
			.patch('/api/article/' +'5fb37ccf3ffc016309cd255')
			.set('auth', token)
			.end((err, res) => {
				  res.should.have.status(404);
				  res.body.should.be.a('object');
				  res.body.should.have.property('error').eql('invalid article id');
				done();
			});
	});
// // 	// });
// // // });
// // // /*
// // // * Test the /DELETE/:id route
// // // */

	it('it should DELETE an article given the id', (done) => {
		
			  chai.request(index)
			  .delete('/api/article/' + articleId)
			  .set('auth', token)
			  .end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('success').eql('Article successfully deleted');
				done();
			  });
	});

	it('it should not DELETE an article given an invalid article id', (done) => {
		
		chai.request(index)
		.delete('/api/article/' +'5fb37ccf3ffc016309cd255'
		)
		.set('auth', token)
		.end((err, res) => {
			  res.should.have.status(404);
			  res.body.should.be.a('object');
			  res.body.should.have.property('error').eql('invalid article id');
		  done();
		});
});


});


