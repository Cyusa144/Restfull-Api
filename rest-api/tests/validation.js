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
    it('should validate contact' , () => {
        const data = {
            name: 'Lorem ipsum title',
            email: 'jack123@gmail.com',
            phone: '07323232422',
            message: 'Lorem ipsum title'
        };
        const validate = validator('contact', data);
        expect(validate.value.name).to.equal(data.name);
    });
    it('should validate user' , () => {
        const data = {
            name: 'Cyusa Jack',
            username: 'jack',
            email:'jack123@gmail.com',
            password: '123'
        };
        const validate = validator('user', data);
        expect(validate.value.name).to.equal(data.name);
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
