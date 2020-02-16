const Flatmate = require('../../models/flatmate');
const User = require('../../models/user');
const {transformFlatmate} = require('./merge');


module.exports = {
    flatmates: () => {
        return Flatmate.find()
            .then(flatmates => {
                return flatmates.map(flatmate => {
                    return transformFlatmate(flatmate);
                })
            })
            .catch(err => {
                throw  err;
            });
    },
    createFlatmate: (args, req) => {
        const flatmate = new Flatmate({
            firstname: args.flatmateInput.firstname,
            lastname: args.flatmateInput.lastname,
            birthday: args.flatmateInput.birthday,
            movedOut: null,
            user: req.userId
        })
        let createdFlatmate;
        return flatmate
            .save()
            .then(result => {
                createdFlatmate = transformFlatmate(result)
                return User.findById(req.userId);
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found.')
                }
                if (user.role !== "Admin") {
                    user.flatmate = flatmate;
                    return user.save()
                        .then(result => {
                            return createdFlatmate;
                        })
                }
                return createdFlatmate;
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    },
}