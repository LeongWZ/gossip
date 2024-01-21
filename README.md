# Gossip README

## Introduction

Submission for CVWO 23/24 Assignment


## Setup 💿

1. To prepare the Docker image, run:

```bash
docker-compose build
```

2. To start 'rails' (backend), 'vite' (frontend) and 'postgres' (database) services, run:

```bash
docker-compose up
```

3. (Required for first-time setup) To migrate and seed database:

First, open another terminal and access remote shell of 'rails' service container:

```bash
docker-compose run --rm --entrypoint "/bin/sh" rails
```

Then, migrate and seed database using Rails via remote shell:
```sh
rails db:migrate
rails db:seed
exit
```

4. To run Gossip web app, go to http://0.0.0.0:3000


## Debugging 🐞

Once you have started 'vite' and 'rails' services, you can verify that the Vite dev
server can be reached from Rails by running:

```bash
docker-compose run --rm --entrypoint "bin/rails c" rails
```

and then:

```ruby
> ViteRuby.instance.dev_server_running?
=> true
```
