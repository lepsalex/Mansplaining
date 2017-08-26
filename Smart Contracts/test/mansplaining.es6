const Mansplaining = artifacts.require("./Mansplaining.sol");
const MPGame = artifacts.require("./MPGame.sol");

contract('Mansplaining', accounts => {

    let mpInstance;

    beforeEach("Deploy a new Mansplaining and one MPGame", done => {
        Mansplaining.deployed()
        .then(instance => {
            mpInstance = instance;
            done();
        })
    });

    it("should create a new game and return it's addreess", () => {
        mpInstance.createGame(100)
        .then(game => {
            assert.isDefined(game, "New Game contract returned");
        });
    });

    it("should enable a game to add a player", () => {
        mpInstance.createGame(100)
        .then(game => {
            console.log(game);
        });
    });

});
