import Joi from 'joi'

const validator = (identifier, data) => {
    let schema = false;
    const options = {
        allowUnknown: true,
        abortEarly: false,
    };
    switch (identifier) {
        case 'article': {
          schema = {
              title: Joi.string().trim().min(5).max(25).required(),
              content: Joi.string().trim().required()
          };
          break;
        }
        case 'contact': {
          schema = {
            name: Joi.string().trim().max(25).required(),
            email: Joi.string().trim().email({
              minDomainAtoms: 2
            }).required(),
            phone: Joi.number(),
            message: Joi.string().trim().required()
          };
          break;
        }
        case 'user': {
          schema = {
            name: Joi.string().trim().min(3).required(),
            username: Joi.string().trim().min(3).max(15).required(),
            password: Joi.string().trim().min(8).required()
          };
          break;
        }
        default: {
          schema = false;
        }
    }
    return Joi.validate(data, schema, options);
};

const validationErrors = (res, error) => {
  const errorMessage = error.details.map(d => d.message);
  return res.status(400).send({
      error: errorMessage,
  });
};


export {
  validator,
  validationErrors
}
