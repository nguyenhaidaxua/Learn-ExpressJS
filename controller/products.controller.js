const Product = require('../models/product.model')

module.exports.viewProducts = async (req,res) => {
    // begin = (n-1) *x; end = n*x
    const page = parseInt(req.query.page) || 1; //n
    const itemPerPage = 8 //x
    const begin = (page-1)*itemPerPage
    const end = page*itemPerPage
    // res.render('products/view',{
    //     products: db.get('products').value().slice(begin, end),
    //     currentPage: page,
    //     pages: Math.ceil(100/itemPerPage)
    // })

    const products = await Product.find()
        res.render('products/view',{
            products: products.slice(begin,end),
            currentPage: page,
            pages: Math.ceil(100/itemPerPage)
    })
}