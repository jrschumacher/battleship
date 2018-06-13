> CLI to battleship

This was developed for a technical skills test. The start of the application was primarily done through the development of the game engine. Once the main development of the game engine was complete I started on the UI using [Ink](https://github.com/vadimdemedes/ink), a React library for CLI. I spent more time on this project than I originally planned. I started with the intention to use TDD throughout the process, but as I started getting into the weeds of the game UI, I realized I underestimated my time and had to sacrifice quality to meet my limited time resource.

I will continue to work on this project and improve the code as well as the UI:

### Known Issues

- [ ] When placing your ships the grid does not render the ship. This is a confusing bug as the game engine knows the ship is there when the placement happens, but when the grid checks it seems it doesn't see any ship placements. Due to a bug with Ink which causes console output to initate a rerender of the component I am currently unable to sort it out
- [ ] The UX is a little poor with respect to transition grid view. Upon placing a ship or attacking the grid will change immediately. A transitional screen is needed to protect the position of the next player as well as give a better experience to the current player.
- [ ] More test coverage is needed with the engine and there is no test coverage with the UI.

## Install and Run

```
$ yarn install
$ yarn start
```


## Usage

```js
$ battleship --help

	Usage
	  $ battleship
```


## License

MIT © [Ryan Schumacher](http://jrschumacher.github.com)
