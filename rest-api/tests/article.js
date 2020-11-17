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

//Our parent block
describe('Articles', () => {
	beforeEach((done) => {
    Article.remove({});
    done();
	});
  /*
  * Test the /GET route
  */
  describe('/GET article', () => {
	  it('it should GET all the articles', (done) => {
			chai.request(index)
			.get('/api/article')
		    .then((res) => {
			  	res.should.have.status(200);
			  done();
			
		    });
	  }); 
  });

  /*
  	* Test the /POST route
  */

  describe('/POST article', () => {

	it('it should POST an article', (done) => {
		//Mock login
		const valid_input = {
			"email": "cyusa@gmail.com",
			"password": "123"
		}
		//send login
		chai.request(index).post('/api/user/login')
		  .send(valid_input)
		   .then((login_response) => {
			//add token
			token = 'Bearer ' + login_response.body.token;
		 chai.request(index)
		 .post('/api/article')
		 .set('Authorization', token)
		 .set('Content-Type', 'application/x-www-form-urlencoded')
		 .field('title', 'html')
		 .field('content', 'html is awesomee')
		 .attach('articleImage',
		   fs.readFileSync('../rest-api/tests/image.jpg'), 'image.jpg')
		.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('title');
				res.body.errors.title.should.have.property('kind').eql('required');
			done();
		});
	 });
   });
   //end here
	//start
	// it('it should POST an article', (done) => {
	// 	   chai.request(index)
	// 		.post('/api/article')
	// 		.set('Authorization', token)
	// 		.set('Content-Type', 'application/x-www-form-urlencoded')
	// 		.field('title', 'html')
	// 		.field('content', 'html is awesomee')
	// 		.attach('articleImage', 
	// 		  fs.readFileSync('../rest-api/tests/image.jpg'), 'image.jpg')
	// 	  .end((err, res) => {
	// 			res.should.have.status(200);
	// 			res.body.should.be.a('object');
	// 			res.body.should.have.property('message').eql('Article successfully added!');
	// 			res.body.article.should.have.property('title');
	// 			res.body.article.should.have.property('content');
	// 			res.body.article.should.have.property('articleImage');
	// 		done();
	//      });
	//   });
	// });
	//end it
/*
  * Test the /GET/:id route
  */
  describe('/GET/:id article', () => {
	  it('it should GET an article by the given id', (done) => {
	  	let article = new Article({ title: "Js", content: "JS is awsome", articleImage: "image to be"});
	  	article.save((err, article) => {
	  		chai.request(index)
			.get('/api/article/' + article.id)
			.set('Authorization', token)
		    .send(article)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('content');
			  	res.body.should.have.property('articleImage');
			  	res.body.should.have.property('_id').eql(article.id);
		      done();
		    });
	  	});
			
	  });
  });

  /*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id article', () => {
	it('it should UPDATE an article given the id', (done) => {
		let article = new Article({title: "Java basics", content: "java", articleImage: "image hh"})
		article.save((err, article) => {
			  chai.request(index)
			  .put('/api/article/' + article.id)
			  .set('Authorization', token)
			  .send({title: "Java basics", content: "java", articleImage: "image lorem" })
			  .end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Article updated!');
					res.body.article.should.have.property('articleImage').eql("image lorem");
				done();
			  });
		});
	});
});
/*
* Test the /DELETE/:id route
*/
describe('/DELETE/:id article', () => {
	it('it should DELETE an article given the id', (done) => {
		let article = new Article({title: "node", content: "node.js", articleImage: "node image"})
		article.save((err, article) => {
			  chai.request(index)
			  .delete('/api/article/' + article.id)
			  .set('Authorization', token)
			  .end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Article successfully deleted!');
					res.body.result.should.have.property('ok').eql(1);
					res.body.result.should.have.property('n').eql(1);
				done();
			  });
		});
	});
});


});


  
