# Project-1 (BLACKJACK)
First project of SEI at GA

## USER STORY
1. User clicks ‘DEAL’ to give both computer and user new cards
2. User waits for computer’s turn
3. User sees cards dealt (computer’s hands remain unseen by user)
4. User clicks ‘HIT’ if user would like another card in their hand
5. User clicks ‘DONE’ if user wants to compare cards with computer
6. Total for each player’s hands and winner is displayed in the center of the game
7. User can choose ‘DEAL’, which will deal new hands to each player
8. User can choose ‘NEW GAME’ to reshuffle the deck and play a new game

## Technical Requirements
Your app must:

HAVE ITS OWN REPO, under your github.com account (not a fork).

...render a game in the browser using JavaScript (you may use jQuery if you like) for DOM manipulation, with separate files for HTML, CSS, and JavaScript, as we have done in class

...switch turns between two players. If your game doesn't make sense for two players talk to your local instructor about it, exceptions can be made for sufficiently challenging one player games.

...implement logic for winning & visually display which player won (or lost)**

...follow the principles we've shown you:

- **KISS ("Keep It Simple Stupid" -- i.e. don't create overly complex solutions to problems when simpler ones will work)** and
- **DRY (Don't Repeat Yourself)** principles
- Modularity: a function should do just one thing and do it well

...reflect an understanding of the importance of separation of concerns:

- Your event listeners/handlers should collect input from the user, not do game logic. Game logic goes in the game object.
- Your game should be controlled by a game object that has properties to store any data that's important to your game, and methods to control the game flow (that call each other and/or are called by the event listeners/handlers)
- Classes: if you have, say, 100, or even 8 aliens that you are shooting or bubbles that you are popping or mushrooms that you are collecting or cards that you are showing (or whatever) in your game, and they all have the same basic structure and functionality, consider instantiating classes for them
- Again, a function should do one thing and do it well. A function that prints the scoreboard should simply print the scoreboard, not try to figure out who is winning.

...be deployed online, where the rest of the world can access it (we will show you how)

...use semantic markup for HTML and CSS (adhere to best practices)

...be reasonably complex (this will be planned out in your proposal, and followed up in "stand-ups" each project day)

## Necessary Deliverables
Wireframes and User Stories included in a README.md file at the top level of your repo.

Wireframes - Basically draw out what your game will look like—every different way it could look. You can use paper or any wireframe tool you find online. Smartphone snapshots of a whiteboard drawing are fine.

A working game, built by you, hosted publicly on the internet, where players can play and win and lose.

A link to your hosted working game in the URL section of your Github repo

A git repository hosted on Github, with a link to your hosted game, and frequent commits dating back to the very beginning of the project.

The README.md file in the top level of your repo should have an explanation of what the project is and why you made it, your user stories and wireframes, explanations of the technologies used and the approaches taken, installation instructions, unsolved problems, and forthcoming features.

You will present your project to the class on Friday July 12 in the morning.

## Suggested Ways to Get Started
- Break the project down into different components (data, presentation, views, style, DOM manipulation) and brainstorm each component individually. Use whiteboards!

- Use your Development Tools (console.log, element inspector, etc) to debug and solve problems. Your instructor will have you console.log() things if you have not tried that approach.

- During the day, work through problems in class & ask questions when you need to! We're here to help prevent you from burning through your time with wild goose chases, or help you gain insight into how to pivot if you're trying to do too much (this is common with new developers), or make sure you're on track to reach your goals. But come to us!! You need to own your educational journey.

- Commit early, commit often. Don’t be afraid to break something because you can always go back in time to a previous version. There should be at least a few dozen commits.

- Consult documentation (MDN, jQuery API, etc.) to better understand the tools you're using.

- Plan to write code that you know you will remove later. Create temporary elements (buttons, links, etc) that trigger events if real data is not available. Write 26 lines of code that helps you solve a problem, even if you only come out of it with 2 useful lines of code that solve your problem precisely. Even though it might feel weird to delete code you worked hard on for an hour, if it helped you get a solution to a problem, it was time well spent.
