import Joi from 'joi';

const entryDetails = {
  title: Joi.string().strict().trim().min(3)
    .required(),
  description: Joi.string().strict().trim().min(3)
    .required(),
  storyId: Joi.object().keys({
    id: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30),
    entryId: Joi.object().keys({
      id: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30),
    }),
  }),
};

const EntryId = {
  entryId: Joi.object().keys({
    entryId: Joi.string().regex(/^[0-9 ]*$/).min(1).max(30),
  }),
};

const createEntrySchema = {
  modifyEntry(req, res, next) {
    const result = Joi.validate(req.body, entryDetails);
    const resultId = Joi.validate(req.params, EntryId.entryId);
    if (result.error) {
      return res.status(400).send({
        status: 400,
        error: `${result.error.details[0].message}`,
      });
    }
    if (resultId.error) {
      return res.status(400).send({
        status: 400,
        error: `${resultId.error.details[0].message.split('\\').join('')}`,
      });
    }
    next();
  },
  deleteEntry(req, res, next) {
    const resultId = Joi.validate(req.params, EntryId.entryId);
    if (resultId.error) {
      return res.status(400).send({
        status: 400,
        error: `${resultId.error.details[0].message.split('\\').join('')}`,
      });
    }
    next();
  },
};

export default createEntrySchema;
