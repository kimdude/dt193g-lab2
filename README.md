**HEJ LÄRARE... Jag publicerade till github ganska sent in. Sedan glömde jag gitignore och raderade repot och publicerade på nytt en gång... hoppas det är ok...**

# DT193G - lab 2.2
## API med backend-ramverk

Repot innehåller källkod för ett API skapat med Hapi. API:et har CRUD funktionalitet för att hantera drama-serier i en Postgre databas.
Grundlänken för API:et är (https://dt193g-lab2.onrender.com)[https://dt193g-lab2.onrender.com].

## API:et
### Router

Följande router kan användas för att utföra operationer på data i databasen:

| Metod     | Länk         |    Resultat                   |
|-----------|--------------|-------------------------------|
| GET       | /            | Returnerar alla drama-serier  |
| GET       | /{id}        | Returnerar specifikt drama    |
| POST      | /{id}        | Lagra nytt drama              |
| PUT       | /{id}        | Uppdatera drama               |
| DELETE    | /{id}        | Radera drama                  |

### Lagra av drama

Lagring av ett nytt drama görs med POST-metoden och uppdatering med PUT-metoden.
Vid lagring av ett nytt drama, eller uppdatering av ett existerande, ska objekt enligt nedan exempel skickas:

```json
    {
      "title": "Extraordinary you",
      "release_year": 2019,
      "episodes": 32,
      "webtoon": true,
      "genres": [4,6,3],
      "tags": [5,9]
    }
```

Genrer och taggar anges med respektive integer för varje genre:

**Kategorier**
1. Thriller
2. Action
3. Comedy
4. Romance
5. History
6. Fantasy
7. Horror

**Taggar**
1. Apocalypse
2. Maffia
3. Time travel
4. Zombies
5. Suspense
6. Crime
7. Costume drama
8. Super natural
9. Mystery
10. Corporate
11. Revenge
12. Slice of life
13. Slow burning

Tidigare exempel har då alltså genre 4. Romance, 6. Fantasy, 3. Comedy. 
Den har även taggarna 5. Suspense och 9. Mystery.

__Kim Dudenhöfer, 2025-12-05__