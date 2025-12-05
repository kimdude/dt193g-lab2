'use strict';

const client = require('../db/db');
const Hapi = require('@hapi/hapi');

/* Skapar typ egen modul */
//Finding dramas
exports.findAll = async function() {
    try {
        const result = await client.query(`SELECT * FROM full_info`);
        return result.rows;
    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}

//Finding specific drama
exports.find = async function(id) {
    try {
        const result = await client.query(`SELECT * FROM full_info WHERE drama_id=$1`, [id]);
        return result.rows;
    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }

}

//Adding new drama
exports.add = async function(data) {

    const { title, release_year, episodes, webtoon, genres, tags } = data;

    try {
        //Adding drama
        const dramaResult = await client.query(`INSERT INTO lab2_dramas (title, release_year, episodes, webtoon) VALUES ($1, $2, $3, $4) RETURNING drama_id,title;`, 
            [title, release_year, episodes, webtoon]);
        
        const drama_id = dramaResult.rows[0].drama_id;

        //Adding genres
        for(let i = 0; i < genres.length; i ++) {
            await client.query(`INSERT INTO lab2_categorized (genre_id, drama_id) VALUES ($1, $2)`,
            [genres[i], drama_id]);
        }

        //Adding tags
        for(let i = 0; i < tags.length; i ++) {
            await client.query(`INSERT INTO lab2_tagged (tag_id, drama_id) VALUES ($1, $2)`,
            [tags[i], drama_id]);
        }

        return await dramaResult.rows[0].title;

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }

}

//Updating existing drama
exports.update = async function(id, data) {
    const { title, release_year, episodes, webtoon, genres, tags } = data;

    try {  
        const result = await client.query(`UPDATE lab2_dramas SET title=$1, release_year=$2, episodes=$3, webtoon=$4 WHERE drama_id=$5 RETURNING title`, 
            [title, release_year, episodes, webtoon, id]);
        
        //Replacing genres
        await client.query(`DELETE FROM lab2_categorized WHERE drama_id=$1`, [id]);

        for(let i = 0; i < genres.length; i ++) {

            await client.query(`INSERT INTO lab2_categorized (genre_id, drama_id) VALUES ($1, $2)`,
            [genres[i], id]);
        }

        //Replacing tags
        await client.query(`DELETE FROM lab2_tagged WHERE drama_id=$1`, [id]);

        for(let i = 0; i < tags.length; i ++) {
            await client.query(`INSERT INTO lab2_tagged (tag_id, drama_id) VALUES ($1, $2)`,
            [tags[i], id]);
        }

        return result.rows[0].title;
        
    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }

}

//Deleting drama
exports.delete = async function(id) {
    try{
        const title = await client.query(`SELECT title FROM lab2_dramas WHERE drama_id=$1`, [id]);

        await client.query(`DELETE FROM lab2_categorized WHERE drama_id=$1`, [id]);
        await client.query(`DELETE FROM lab2_tagged WHERE drama_id=$1`, [id]);
        await client.query(`DELETE FROM lab2_dramas WHERE drama_id=$1`, [id]);

        return title.rows[0].title;

    } catch(error) {
        throw new Error ("Database error: " + error.message);
    }
}
