play: 
	docker-compose run lab knex migrate:latest
	docker-compose run lab knex seed:run
	docker-compose run lab node playground.js