import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.should();
chai.use(chaiHttp);

describe("Articles API", () => {
    const jwt_token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWViNTc5ZTNjZGJkODgzMjVlZGZmZiIsIm5hbWUiOiJDeXVzYSIsImlhdCI6MTYwNTAxNjE2NiwiZXhwIjoxNjA1MTAyNTY2fQ.wJkXeeRAo5Bs1oeoeeHyTN3Izv5usj7XKrDNDD3SeMs";


describe('articles', () => {
    it('should get all articles' , () => {
        chai
        .request(index)
        .get('/api/article')
        .then((res) => {
          res.should.have.status(200);
          res.body.articles.should.be.a('array');
        })
        .catch((error) => {
            console.log(error)
        });
    });
    
});
describe('/POST article', () => {

	it('it should not POST an article without title field', () => {
		//Mock login
		const valid_input = {
			"email": "cyusa@gmail.com",
			"password": "123"
		}
		//send login
		chai.request(index).post('/user/login')
		  .send(valid_input)
		   .then((login_response) => {
			//add token
			token = 'Bearer ' + login_response.body.token;
		 chai.request(index)
		 .post('/article')
		 .set('Authorization', token)
		 .set('Content-Type', 'application/x-www-form-urlencoded')
		 .field('content', 'html is awesomee')
		 .attach('articleImage',
		   fs.readFileSync('./test/malume.png'), 'malume.png')
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

 /*
  	* Test the /POST route
  */
 it('should add single article' , () => {
    const id = "5f69b45536f1672e2c737d7d"
    chai
    .request(index)
    .get('/api/aricle/'+ id)
    .then((res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
    })
    .catch((error) => {
        console.log(error)
    });
});
it('should update article' , () => {
    const id = "5f686e395b97322a1cc58923"
    chai
    .request(index)
    .patch('/api/aricle/'+ id)
    .set("Authorization", `Bearer ${jwt_token}`)
    .then((res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
    })
    .catch((error) => {
        console.log(error)
    });
});
it('should delete article' , () => {
    const id = "5f686f42a5e9d62ac05e53e3"
    chai
    .request(index)
    .delete('/api/aricle/'+ id)
    .set({ Authorization: `Bearer ${jwt_token}` })
    .then((res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
    })
    .catch((error) => {
        console.log(error)
    });
});
});
});