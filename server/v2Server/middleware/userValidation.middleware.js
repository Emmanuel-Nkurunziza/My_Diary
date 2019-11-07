import Joi from 'joi';

const signUpSchema = (req, res, next) => {
  const userDetails = {
    email: Joi.string().strict().trim().min(3)
      .required()
      .email(),
    firstname: Joi.string().strict().trim().min(3)
      .required(),
    lastname: Joi.string().strict().trim().min(3)
      .required(),
    password: Joi.string().strict().trim().min(1)
      .required(),
  };
  const result = Joi.validate(req.body, userDetails);
  if (result.error) {
    return res.status(400).send({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }

  next();
};

export default signUpSchema;
