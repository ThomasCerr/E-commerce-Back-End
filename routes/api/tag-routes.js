const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [ 
    'id'
  ],
  include: [
    {
      model: Product,
      through: ProductTag,
      attributes: ['product_name']
    },
  ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findAll({
    where: {id: req.params.id
    },
    attributes: [ 
    'id'
  ],
  include: [
    {
      model: Product,
      through: ProductTag,
      attributes: ['product_name']
    },
  ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((data) => res.status(200).json(data))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((data) => res.json(data))
  .catch(err => {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
  }
})
.then(dbPostData => {
  if (!dbPostData) {
    res.status(404).json({ message: 'No post found with this id' });
    return;
  }
  res.json(dbPostData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});

});

module.exports = router;
