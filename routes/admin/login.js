export default (req, res) => {
    const {email, password} = req.body
    if (email === "admin@gmail.com" && password === "password"){
        req.session.user = "Homer Simpson";  //Storing data in the session
        return res.redirect("/admin/dashboard")
    }

    return res.redirect("/admin/login")
}