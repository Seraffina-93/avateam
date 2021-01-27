
module.exports = function(req, res, next) {
    console.log(req.user);
    if (req.user.role === "editor")
        next();
    else
        if (req.user.role === "admin")
            next();
        else 
            return res.status(403).send('Access denied');
}