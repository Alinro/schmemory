# Schmemory

We would like for you to implement the [Memory
game](<https://en.wikipedia.org/wiki/Concentration_(game)>). This is a card game where pairs of cards
contain images, such that for each card, there is exactly one other card with the same image. The
cards are placed face-down on a surface. A player chooses any two cards and flips them face-up. If
they happen to have the same image, they will stay face-up — otherwise they should be flipped back.
This continues until all cards are face-up.

You are free to implement this however you see fit, but please do not use any frameworks or
non-utility libraries (by utility libraries we mean libraries such as lodash, rambda, underscore,
etc). We expect you to spend no more than 3 hours on the task (this is both to not put too much work
on you, and also to scope how much code we will go through in the interview). We’ll test your game
using Chrome, so make sure it works there at least 😉

Try to keep in mind that we might want to extend this game later on (maybe even during the
interview), so think about the readability and structure of your code.

There are a lot of areas you could choose to focus on in this game, for instance:

- Finding awesome cat/ninja/catninja pics to put on the cards. Static or dynamic?
- Does a player get points? Is there timing involved? A scoreboard?
- Fancy animations or pure-and-simple?
- Single-player? Local multi-player? Networked multi-player? 🙀
- Accessibility?
- Is the code testable?
- Responsive design that works for mobile and desktop?
- Does adding TypeScript improve the code?

(Beware that if you try and focus on all of these, you’ll probably spend more than the 3 hours, so
we advise you to just choose a few)

It would be helpful if you could document your project (through comments or README files) and
explain some of the decisions/assumptions you have made. Given the short time constraints, please
also make notes of future steps you could take in order to make the application better.

IMPORTANT: to circumvent Gmail's security we renamed all JS files from .js to .txt so you will need to rename them back to .js before they are usefull
We have created a starter kit that contains a very trimmed down boilerplate with Webpack, Babel and SASS.
There is also an example image server included. So if you prefer a super-simple (and local) way to get images
for your cards, you can use that. **Using the starter kit is completely optional though, feel free to either
use all of it, some of it or none at all.**

Don't hesitate getting in touch with us at any time throughout this task if you have any questions.
We realise and appreciate that you’re taking personal time out to complete this task, so we’re happy
to help.

# Setup client

## Install dependencies

```bash
cd client
npm install
```

## Run project

```bash
npm run dev
```

# Setup server

## Install dependencies

```bash
cd server
npm install
```

## Run project

```bash
npm run dev
```

## Example image server

This HTTP server will generate square images (either in PNG or SVG format) for a given string and
size in pixels. It will start on localhost port 3002 by default, and has CORS enabled.

### API

#### GET /png/:identifier/:size

Example: `GET /png/alice/200` will return a PNG image of size 200x200 for the string 'alice'.

#### GET /svg/:identifier/:size

Example: `GET /svg/alice/200` will return a SVG image of size 200x200 for the string 'alice'.

# Things I did

- Using the "starter-kit", `npm install` failed with errors, tested with multiple Node versions on multiple MacOS machines. The root cause was the `node-sass` package. Replacing it with the now recommended `sass` package at latest version allowed me to successfully run `npm install`
- Running the "starter-kit" project with `npm run start:all` resulted in errors such as `Error: error:0308010C:digital envelope routines::unsupported`, which were fixed by running `NODE_OPTIONS=--openssl-legacy-provider npm run start:all`. However, at this point I ran into runtime errors related to `sass-loader`, most likely meaning that my quick solution to replace `node-sass` wasn't optimal
- Due to time constraints, I decided to bootstrap a project from scratch using `npm create vite@latest` and re-use some of the code provided in the "starter kit"
  - One of the benefits is that the client code now supports Typescript out of the box
- Initially focused on developer experience
  - Separated client and server code in two seperate node projects and folders
  - Typescript support for both client and server code
  - Added `.nvmrc` file for people using `nvm`, to easily determine the recommended Node.js version
  - Added eslint support for the client code
  - Added prettier support for the client code
  - Added VSCode recommended extensions
- Implemented the game
  - Separated Board, Card and Tracker concepts
  - Multiple Card and Tracker implementations can be defined in the future, by implementing the defined interfaces
  - Implemented clean and basic (but responsive) UI/UX
  - Implemented local two player mode, with score and move tracking for each player
  - For accessibility, the game can be played without using a mouse, only with the keyboard (using the Tab, Enter keys)
  - Added a basic test, flipping a card and checking the score

# Ideas to improve the project

- Add eslint / prettier configuration for the server as well (maybe the configuration can be common as part of a monorepo)
- Run eslint / prettier checks on pre-commit hooks using Husky (https://typicode.github.io/husky/)
- Run eslint / prettier / tests post-commit in a GitHub Action (maybe as part of the CI/CD pipeline)
- Try `vite-plugin-eslint` plugin
- shuffle cards before populating the board
- better UI/UX
- button to reload game
- save game stats to local storage (after every move or at the end of game)
- different colored highlight based on current player
- improve accesibility by adding ARIA roles and attributes
- add support to the Board for multiple tracker instances
