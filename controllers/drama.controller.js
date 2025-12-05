const model = require('../models/drama.model');

//Getting all dramas
exports.getAllDramas = async function() {
    try {
        return await model.findAll();
    } catch(error) {
        return h.response("An error occurred. " + error).code(500);
    }
}

//Getting specific drama
exports.getDrama = async function(id) {
    try{
        return await model.find(id);
    } catch(error) {
        throw error;
    }
}

//Adding drama
exports.addDrama = async function (data) {
    try {
        const result = await model.add(data);
        return await result

    } catch(error) {
        return h.response("An error occurred. " + error).code(500);
    }
}

//Updating drama
exports.updateDrama = async function(id, data) {
    try {
        return await model.update(id,data);
    } catch(error) {
        return h.response("An error occurred. " + error).code(500);
    }

}

//Deleting drama
exports.deleteDrama = async function(id) {
    try {
        return await model.delete(id);
    } catch(error) {
        return h.response("An error occurred. " + error).code(500);
    }
}