const { Client } = require('pg');
require('dotenv').config();

//Connecting to database
const client = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((error) => {
    if(error) {
        console.log("Fel vis anslutning: ", error);
    } else {
        console.log("Ansluten till databasen!");
    }
});

//Checking if tables exist and dropping them
client.query (`
    DROP VIEW IF EXISTS full_info;
    DROP TABLE IF EXISTS lab2_categorized;
    DROP TABLE IF EXISTS lab2_tagged;
    DROP TABLE IF EXISTS lab2_dramas;
    DROP TABLE IF EXISTS lab2_genres;
    DROP TABLE IF EXISTS lab2_tags;

`);

//Creating tables
client.query (`
    CREATE TABLE lab2_dramas (
        drama_id SERIAL PRIMARY KEY,   
        title VARCHAR(50) NOT NULL,
        release_year INT,
        episodes INT,
        webtoon BOOLEAN
    );
`);

client.query (`
    CREATE TABLE lab2_genres (
        genre_id SERIAL PRIMARY KEY,   
        genre_name VARCHAR(30) NOT NULL
    );
`);

client.query (`
    CREATE TABLE lab2_categorized (
        genre_id INT REFERENCES lab2_genres(genre_id),
        drama_id Int REFERENCES lab2_dramas(drama_id),
        PRIMARY KEY (genre_id, drama_id)
    );
`);

client.query (`
    CREATE TABLE lab2_tags (
        tag_id SERIAL PRIMARY KEY,
        tag_name VARCHAR(50) NOT NULL
    );
`);


client.query (`
    CREATE TABLE lab2_tagged (
        tag_id INT REFERENCES lab2_tags(tag_id),
        drama_id INT REFERENCES lab2_dramas(drama_id),
        PRIMARY KEY (tag_id, drama_id)
    );
`);

//Adding data
client.query(`
    INSERT INTO lab2_dramas (title, release_year, episodes, webtoon)
    VALUES 
        ('Happiness', 2021, 12, true),
        ('Vincenzo', 2021, 20, false),
        ('Mr. Queen', 2020, 20, false);
`);

client.query(`
    INSERT INTO lab2_genres (genre_name)
    VALUES 
        ('Thriller'),
        ('Action'),
        ('Comedy'),
        ('Romance'),
        ('History'),
        ('Fantasy'),
        ('Horror');
`);

client.query(`
    INSERT INTO lab2_tags (tag_name)
    VALUES 
        ('Apocolypse'),
        ('Maffia'),
        ('Time travel'),
        ('Zombies'),
        ('Suspense'),
        ('Crime'),
        ('Costume drama'),
        ('Super natural'),
        ('Corporate'),
        ('Mystery'),
        ('Revenge'),
        ('Slice of life'),
        ('Slow burning');
`);

client.query(`
    INSERT INTO lab2_categorized (genre_id, drama_id)
    VALUES 
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 3);
`);


client.query(`
    INSERT INTO lab2_tagged (tag_id, drama_id)
    VALUES 
        (1, 1),
        (4, 1),
        (5, 1),
        (2, 2),
        (6, 2),
        (5, 2),
        (3, 3),
        (7, 3);
`);
    
//View with aggregation to concatenate thrillers and genres
client.query(`
    CREATE VIEW full_info AS
    SELECT lab2_dramas.drama_id, lab2_dramas.title, lab2_dramas.release_year, lab2_dramas.episodes, lab2_dramas.webtoon, STRING_AGG(DISTINCT lab2_tags.tag_name, ', ') AS tags, STRING_AGG(DISTINCT lab2_genres.genre_name, ', ') AS genres
    FROM lab2_dramas
    LEFT JOIN lab2_tagged ON lab2_tagged.drama_id = lab2_dramas.drama_id
    LEFT JOIN lab2_tags ON lab2_tags.tag_id = lab2_tagged.tag_id
    LEFT JOIN lab2_categorized ON lab2_categorized.drama_id = lab2_dramas.drama_id
    LEFT JOIN lab2_genres ON lab2_genres.genre_id = lab2_categorized.genre_id
    GROUP BY lab2_dramas.drama_id, lab2_dramas.title, lab2_dramas.release_year, lab2_dramas.episodes, lab2_dramas.webtoon
`);