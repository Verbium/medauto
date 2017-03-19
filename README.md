# README #

### What is Medauto? ###

Medauto's end goal is to replicate CouchPotato / Radarr / Sonarr as a tv and movie indexer for local storage. A user will be able to do the following:

* Search for tv shows and movies and add them to a watch list
* Select TV shows and view details such as descriptions, fanart, episode listings.
* Organise media and search for episodes / movies using an indexer (details supplied by user)

### Does it do any of this yet? ###

No :) but it will. You can current search for tv shows which uses the tvdb api. More features will be added in the future.

### How do I get set up? ###

* Pull this repo
* Install Yarn (choco is great for this)
* Run yarn install
* Run npm start on the frontend and koa_v2 folders

### Known issues ###

* Hosting locally currently has a fixed ip address hardcoded in, changing in the future.
* TV Banners download to the server but the frontend may request them too early.