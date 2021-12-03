const { Thought, User } = require('../models');

const thoughtController = {

    addThought()
    .then(dbAddThought => res.json(dbAddThought))
    .catch((err) => res.json(err))

    addReaction()
    .then(dbAddReaction => res.json(dbAddReaction))
    .catch((err) => res.json(err))
 

    removeThought()
    .then(dbRemoveThought => res.json(dbRemoveThought))
    .catch((err) => res.json(err))

    removeReaction()
    .then(dbRemoveReaction => res.json(dbRemoveReaction))
    .catch((err) => res.json(err))
};

module.exports = thoughtController;