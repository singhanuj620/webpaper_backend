function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).json({ message: "Not Authenticated" })
}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(400).json({ message: "Not Authenticated" })
    }
    next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated }