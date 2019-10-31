import Joi from 'joi';

const createEntrySchema = (req, res, next) => {
  const entryDetails = {
    title: Joi.string().strict().trim().min(3)
      .required(),
    description: Joi.string().strict().trim().min(3)
      .required(),

  };
  const result = Joi.validate(req.body, entryDetails);
  if (result.error) {
    return res.status(400).send({
      status: 400,
      error: `${result.error.details[0].message}`,
    });
  }

  next();
};

export default createEntrySchema;
