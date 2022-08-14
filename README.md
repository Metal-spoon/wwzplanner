<div align="center"><img src="/public/favicon.ico" width=64/></div>
<h1 align="center">WWZ planner</h1>
<p align="center">A simple build planner for World War Z: Aftermath made with Vue</p>

## About

WWZ planner is a simple build planner for World War Z: Aftermath.</br>
I started this project because i wanted to learn Vue and couldn't really find any other build planners that had the features i was looking for. </br>
It aims to stay as close as possible to the in game UI so that replicating a build in game is easy to do.</br>
Another goal is to keep it compatible with mobile phones because the game is fairly popular on consoles and it would be convenient to view/plan a build on your phone.</br>
Besides the application itself, this repo also contains a dataset of the classes and their respective perks. </br>
The data was put together using various scripts that rip data from the wiki.


## Getting started
To be able to run the project you need to install some dependencies first, you can do this by running:
```
npm install
```
If it fails with an error about dependency version mismatches try running:
```
npm install --legacy-peer-deps
```
### Starting a development server
To start a development server run:
```
npm run serve
```
Please note that the default config this repo provides enables https for the development server.
No certificate is provided so you will have to manually tell your browser it's safe.

Https was enabled because otherwise the clipboard API would not work on phones and i had to verify it would work.

You can safely disable https if you do not intend to test on mobile devices.

### Building a production version
To build a version that can be deployed to a production environment, run:
```
npm run build
```

### Running the linter
If you do not use a linting plugin in your IDE and still want to run the linter, run:
```
npm run lint
```

## FAQ
### Why font-awesome icons for the classes?
I could not find any good rips of the class icons, i tried pulling them from screenshots and vectorizing them but it would just look off. </br>
It might be possible to rip them from the game files directly but i'd have no clue where to start. </br>
If you do have high definition versions of these icons, please do get in touch! </br>

### How did you get the icons for the classes?
I found an existing build planner that somehow had them, i wrote a simple bash script that ripped the from that site and ordered them to be used in my set. 

### How did you get the perk data?
As i said, ripped from the wiki using a script. </br>
I might include the script later on so the dataset can be updated easily, it requires a few hoops to jump through to run properly at the moment. </br>
Wiki data may also be out of date so it might be better to just update it manually.

## Licensing
GPL v3.0

This project is not associated with World War Z: Aftermath (the game, nor the movie) or Saber interactive, all rights belong to their respective owners. </br>
All image assets (logos and icons) are not owned by me, all rights belong to their respective owners.
