const { Thought, User } = require('../models');

const thoughtController = {

    addThought({ params }, res) {
        console.log(body);
        
        Thought.create(body)

        .then(({ _id }) => {
            console.log(_id);
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thought: id } },
                { new: true, runValidators: true }
            );
        })

    .then(dbAddThought => {
        if(!dbAddThought) {
            res.status(404).json({ message: "Did not find user ID"});
        return;
        }

        res.json(dbAddThought)
    })
    .catch((err) => res.json(err))
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { reaction: body } },
            { new: true, runValidators: true }
        )
    .then(dbAddReaction => {
        if(!dbAddReaction) {
            res.status(404).json({ message: "Did not find user ID"});
        return;
        }

        res.json(dbAddReaction)
    })
    .catch((err) => res.json(err))
    },

    removeThought({ params }, res) {
    .then(dbRemoveThought => res.json(dbRemoveThought))
    .catch((err) => res.json(err))
    },

    removeReaction({ params }, res) {
    .then(dbRemoveReaction => res.json(dbRemoveReaction))
    .catch((err) => res.json(err))
    },
};

module.exports = thoughtController;