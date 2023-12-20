const protectApi = (req, res, next) => {
    const authorization = req.header("Authorization")
    if(authorization) {
        // Verify the JWT token here
        return next()
    }

    return res.status(403).json({message: "Unauthorized access"})
}

export default protectApi