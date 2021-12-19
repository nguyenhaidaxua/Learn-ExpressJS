
const shortid = require('shortid')

module.exports =(req,res,next) =>{
    
    if(!req.signedCookies.sessionId){
        const id = shortid.generate()
        res.cookie('sessionId',id,{
           signed: true
        })
        db.get('session').push({
        id: id
        }).write()
    }
    const sessionId = req.signedCookies.sessionId
    var obj = db.get('session')
        .find({ id: sessionId })
        .get('cart')
        .value();
    var totalProducts = 0;
    if(obj){
        for (let [key, value] of Object.entries(obj)) {
            totalProducts += value;
        }
    }
        
    res.locals.items = totalProducts
    next()

}