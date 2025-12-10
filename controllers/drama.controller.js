const model = require('../models/drama.model');

//Getting all dramas
exports.getAllDramas = async function() {
    try {
        return await model.findAll();
    } catch(error) {
        return h.response("An error occurred getting all dramas. " + error).code(500);
    }
}

//Getting specific drama
exports.getDrama = async function(id) {
    try{
        return await model.find(id);
    } catch(error) {
        return h.response("An error occurred getting drama. " + error).code(500);
    }
}

//Getting all genres
exports.getAllGenres = async function() {
    try{
        return await model.findGenres();
    } catch(error) {
        return h.response("An error occurred getting drama. " + error).code(500);
    }
}

//Getting all tags
exports.getAllTags = async function() {
    try{
        return await model.findTags();
    } catch(error) {
        return h.response("An error occurred getting drama. " + error).code(500);
    }
}

//Adding drama
exports.addDrama = async function (data) {
    try {
        const result = await model.add(data);
        return await result

    } catch(error) {
        return h.response("An error occurred adding drama. " + error).code(500);
    }
}

//Updating drama
exports.updateDrama = async function(id, data) {
    try {
        return await model.update(id,data);
    } catch(error) {
        return h.response("An error occurred updating drama. " + error).code(500);
    }

}

//Deleting drama
exports.deleteDrama = async function(id) {
    try {
        return await model.delete(id);
    } catch(error) {
        return h.response("An error occurred deleting drama. " + error).code(500);
    }
}