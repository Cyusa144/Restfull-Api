import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    validator,
    validationErrors
  } from '../validation/index';

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe('Validator', () => {
    it('should validate article' , () => {
        const data = {
            title: 'Lorem ipsum title',
            content: 'Lorem ipsum content is here'
        };
        const validate = validator('article', data);
        expect(validate.value.title).to.equal(data.title);
    });
    it('should check unknown identifier' , () => {
        const dataInput = {
            title: 'Lorem ipsum title',
            content: 'Lorem ipsum content is here'
        };
        const validate = validator('unknown', dataInput);
        expect(validate.error).to.exist;
    });
})
