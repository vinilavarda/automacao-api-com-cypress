import Joi from 'joi'

const productReviewSchemaPost = Joi.object({
  id: Joi.number().required(),
  date_created: Joi.string().isoDate().required(),
  date_created_gmt: Joi.string().isoDate().required(),
  product_id: Joi.number().required(),
  product_name: Joi.string().required(),
  product_permalink: Joi.string().required(),
  status: Joi.string().required(),
  reviewer: Joi.string().required(),
  reviewer_email: Joi.string().required(),
  review: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
  verified: Joi.boolean().required(),
  reviewer_avatar_urls: Joi.object({
    24: Joi.string().required(),
    48: Joi.string().required(),
    96: Joi.string().required()
  }),
  _links: Joi.object({
    self: Joi.array().items(
      Joi.object({
        href: Joi.string().required()
      })
    ),
    collection: Joi.array().items(
      Joi.object({
        href: Joi.string().required()
      })
    ),
    up: Joi.array().items(
      Joi.object({
        href: Joi.string().required()
      })
    )
  }).required()
})

export default productReviewSchemaPost
