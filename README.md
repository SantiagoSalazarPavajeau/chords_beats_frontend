
This project was created with plain Javascript and Ruby on Rails as an API. It uses a modular design pattern that communicates with the Rails server. 

[Chords and Beats LIVE](https://santiagosalazarpavajeau.github.io/chords_beats_frontend/)

To get it working on the local enviroment:

cd into backend folder and run:

```
rails db:setup
```

Then migrate the database:

```
rails db:migrate
```

cd into the front end directory and run:

```
open index.html
```

# Ruby on Rails Backend:

It is a API only rails app with Posgress as a database instead of SQL Lite for deployment into heroku.

Some gems used are Fast Json API for the serializer/service, and no-CORS, to be able to run on the local environment for development.

#Backend with Postgress : https://github.com/SantiagoSalazarPavajeau/chords_beats_backend

#Original repo with SQL lite: https://github.com/SantiagoSalazarPavajeau/chords_and_beats

