import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

chai.should();
chai.use(chaiHttp);


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
    
})
