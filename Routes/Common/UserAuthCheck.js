// These middleware functions are used all over project to check whether user is logged in or not.
// For extra secutiy, such that even API is exposed from react side, we still have one
// user check in backend also.


// If User is PRESENT, then proceed
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).json({ message: "Not Authenticated" })
}

// If User is NOT PRESENT, then proceed
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(400).json({ message: "Not Authenticated" })
    }
    next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated }