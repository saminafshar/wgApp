const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {transformUser} = require('./merge');
const User = require('../../models/user');


module.exports = {
    users: () => {
        return User.find()
            .then(users => {
                return users.map(user => {
                    return transformUser(user);
                })
            })
            .catch(err => {
                throw  err;
            });
    },
    createUser: args => {
        return User.findOne({username: args.userInput.username})
            .then(user => {
                if (user) {
                    throw new Error('User exists already.')
                }
                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    username: args.userInput.username,
                    password: hashedPassword,
                    role: "User",
                    flatmate: null
                });
                return user.save();
            }).then(result => {
                return transformUser(result)
            })
            .catch(err => {
                throw  err;
            })
    },
    login: async ({username, password}) => {
        const user = await User.findOne({username: username});
        if (!user) {
            throw new Error(('User does not exist'))
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is not correct');
        }
        const token = jwt.sign({userId: user.id, username: user.username},
            'secretKey',
            {expiresIn: '1h'}
        );
        return {userId: user.id, token: token, tokenExpiration: 1}
    }
}