const mongodb = require('mongodb')
const Product = require('../models/product');

const ObjectId = mongodb.ObjectId


//hien thi page them product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

//them product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl)
  product
    .save()
    .then(result => {
      console.log('Created Product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
};


//hien thi edit mode
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId)
    //Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(err => console.log(err))
};

//edit product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    new ObjectId(prodId)
  );
  product
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


//hien thi products tai trang admin
exports.getProducts = (req, res, next) => {
  // req.user
  // .getProducts()
  // .then(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // })
  // .catch(err => console.log(err))
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};


// //xoa product
// exports.postDeleteProduct = (req, res, next) => {
//   const prodId= req.body.productId
//   Product.findByPk(prodId)
//   .then(product => {
//     return product.destroy()
//   })
//   .then(result => {
//     console.log('DESTROYED PRODUCT')
//   })
//   .catch(err => console.log(err))
//   res.redirect('/admin/products')
// }