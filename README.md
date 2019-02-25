# The Oregon Trail
## Description
Our team created a loyal replica of the 1990 release of classic computer game The Oregon Trail using web technologies. Players act as the leader of a five person caravan traveling across the United States via the Oregon Trail during 1848. We took special care to replicate the game's graphics, content, locations, events, and pathways. The game's logic runs on JavaScript, with its various components managed in JavaScript objects. PHP, AJAX, and SQL enable our special features: a scoreboard for the best, and tombstones for the rest.

## Features
- Scoreboard: Stores names and scores of the top ten players in database.
- Tombstones: Upon death, players write an epitaph, which is stored in the database along with their name, and distance travelled. Future players will see a tombstone at the same location, with the previous player's name and epitaph. Each new game retrieves most recent tombstone for each 40 mile section of the trail via AJAX.
- Random events: Each day, players may encounter a random event, e.g. robbers, broken wagons, finding wild berries.
- Health: Players can choose their pace of travel, daily rations, and rest days, all of which affect their party's rate of sickness and health.
- Animation: The graphics for river crossings are created using HTML canvas.
- Conditions: The game tracks and updates a slew of variables—weather, date, food, supplies, party members' health, distance travelled—depending on the game's conditions and the player's options.

## Technologies used
JavaScript, HTML, CSS, AJAX, PHP, SQL
