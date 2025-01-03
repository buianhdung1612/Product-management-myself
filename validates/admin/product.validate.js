module.exports.createPost = async (req, res, next) => {
    if(!req.body.title){
        req.flash("error", "Tiêu đề không được để trống")
        res.redirect('back');
        return;
    }

    if(req.body.title.length < 4){
        req.flash("error", "Tiêu đề ít nhất là 4 kí tự")
        res.redirect('back');
        return;
    }

    next();
}