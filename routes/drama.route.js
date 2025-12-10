'use strict';

const client = require('../db/db');
const Hapi = require('@hapi/hapi');
const dramaController = require('../controllers/drama.controller');
const Joi = require('joi');

module.exports = (server) => {
        server.route([
    
        /* Route to get all dramas */
        {
            method: 'GET',
            path: '/',
            handler: dramaController.getAllDramas
        },

        /* Route to get all genres */
        {
            method: 'GET',
            path: '/genres',
            handler: dramaController.getAllGenres
        },

        /* Route to get all tags */
        {
            method: 'GET',
            path: '/tags',
            handler: dramaController.getAllTags
        },

        /* Route to add drama */
        { 
            method: 'POST',
            path: '/',
            handler: async (request, h) => { 
                const result = await dramaController.addDrama(request.payload);
                return h.response({ message: "Drama added: " + result });
            },
            options: {
                validate: {
                    payload: Joi.object({ //Validating payload
                        title: Joi.string().min(1).max(50).required(),
                        release_year: Joi.number().integer().min(1900).max(2027),
                        episodes: Joi.number().integer().min(1).max(70),
                        webtoon: Joi.boolean(),
                        genres: Joi.array().items(Joi.number().integer().min(1).max(7)),
                        tags: Joi.array().items(Joi.number().integer().min(1).max(13))
                    })
                }
            }
        },

        /* Route to get specific drama */
        { 
            method: 'GET',
            path: '/{id}',
            handler: async (request, h) => {
                const dramaId = request.params.id;
                const result = await dramaController.getDrama(dramaId);
                return h.response({ result });
            },
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required() //Validating parameter
                    })
                }
            }
        },

        /* Route to update drama */
        {
            method: 'PUT',
            path: '/{id}',
            handler: async (request, h) => {
                const dramaId = request.params.id;
                const result = await dramaController.updateDrama(dramaId, request.payload);
                return await h.response({ message: "Drama updated: " + result });
            },
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required() //Validating parameter
                    }),
                    payload: Joi.object({ //Validating payload
                        title: Joi.string().min(1).max(50).required(),
                        release_year: Joi.number().integer().min(1900).max(2027),
                        episodes: Joi.number().integer().min(1).max(70),
                        webtoon: Joi.boolean(),
                        genres: Joi.array().items(Joi.number().integer().min(1).max(7)),
                        tags: Joi.array().items(Joi.number().integer().min(1).max(13))
                    })
                }
            }
        },

        /* Route to delete drama */
        {
            method: 'DELETE',
            path: '/{id}',
            handler: async (request, h) => {
                const dramaId = request.params.id;
                const result = await dramaController.deleteDrama(dramaId);
                return await h.response({ message: "Drama deleted: " + result });
            },
            options: {
                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().min(1).required() //Validating parameter
                    })
                }
            }
        }
    ]);
}