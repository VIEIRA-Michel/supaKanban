const { createUser } = require('../queries/user.queries');


exports.userCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await createUser(body);
        req.login(user, (err) => {
            if (err) { next(err) }
            res.status(200).json({ message: 'vous êtes maintenant connecté' });
        })
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}