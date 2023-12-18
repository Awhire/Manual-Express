export default  (req, res) => {
    res.render("dashboard", {
        user: req.session.user,
        posts: [
            {
                id: 1,
                author: "Joe M",
                title: "I love Express",
                content: "Express is a wonderful framework for building Node.js Apps"
            },
            {
                id: 2,
                author: "Mike F",
                title: "Have you tried pug",
                content: "I recently tried th Pug template language and it's excellent"
            }
        ]
    })
}