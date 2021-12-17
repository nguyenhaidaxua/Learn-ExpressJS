module.exports.postCreate =(req,res,next) =>{
    const errors = []
    if (!req.body.name){
        errors.push('Name is required')
    }
    if (!req.body.phone ){
        errors.push('Phone is required')
    }
    if (isNaN(req.body.phone)){
        errors.push('Phone must be Number')
    }
    if (errors.length){
        res.render('user/createUser', {
            errors: errors,
            values: req.body
        })
        return
    }
    next()

}