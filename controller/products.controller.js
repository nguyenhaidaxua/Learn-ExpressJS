const db = require('../db')
module.exports.viewProducts = (req,res) => {
    // begin = (n-1) *x; end = n*x
    const page = parseInt(req.query.page) || 1; //n
    const itemPerPage = 8 //x
    const begin = (page-1)*itemPerPage
    const end = page*itemPerPage
    res.render('products/view',{
        products: db.get('products').value().slice(begin, end),
        currentPage: page,
        pages: Math.ceil(100/itemPerPage)
    })
}