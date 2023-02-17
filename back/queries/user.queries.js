
exports.createUser = async (body) => {
    try {
        const { username, email, password } = body;
        const newUser = new UserModel({
            username,
            email,
            password: await bcrypt.hash(password, 8),
        });

        newUser.save((err, user) => {
            if (err) {
                console.log(err);
                if (err.code === 11000) {
                    res.status(400).json('Email déjà utilisé');
                } else {
                    res.status(400).json('Oops une erreur est survenue');
                }
            } else {
                console.log(user);
                res.json(user);
            }
        })
    } catch (e) {
        throw e;
    }

}