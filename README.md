# Starting the development environment
docker compose up --build

# Run the migrations for creating the tables
```
docker exec -it exercises npm run typeorm migration:run
```

# Load some data for testing purposes
After the environment is up and the migrations were executed

```
docker exec -i exercises.database mysql -u exercises -pexercises exercises < ./docker/init-test-data.sql
```

# Curl request for testing
List all exercises
```
curl -v http://localhost/exercise -H 'Content-Type: application/json'
```

Create an exercise
```
curl -v http://localhost/exercise -H 'Content-Type: application/json' -d '{"user_id": "210ec1bc-d173-11ed-b541-0242ac1a0003", "content": "Lorem ipsum dolor sit amet"}'
```

# Running the tests
```
docker exec -it exercises npm run test
```

# Missing 
These are the things that can not be acomplished due time:
- Add more unit tests. Only the use cases have unit tests right now but everything used by these use cases have been tested.
- E2E tests
- Controller authentication