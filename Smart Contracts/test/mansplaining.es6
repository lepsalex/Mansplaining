const Mansplaining = artifacts.require("./Mansplaining.sol");
const MPGame = artifacts.require("./MPGame.sol");

const eventPromise = (event, cb) => {
    return new Promise((resolve, reject) => {
        event.watch((err, result) => {
            if (!err) {                
                event.stopWatching();
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

contract('Mansplaining', accounts => {

    let gameAddress;
    let gameInstance;

    beforeEach("Deploy a new Mansplaining and one MPGame", done => {
        Mansplaining.deployed()
        .then(instance => {

            const gamePromises = [];

            gamePromises.push( eventPromise(instance.NewGame()) );
            gamePromises.push( instance.createGame(100) );

            return Promise.all(gamePromises);
        })
        .then(resolvedPromises => {
            const eventResult = resolvedPromises[0];
            gameAddress = eventResult.args.gameAddress;
            done();
        });
    });

    it("should create a new game", () => {
        assert.isDefined(gameAddress, "New Game address returned");
    });

    it("should enable a game to add a player", () => {
        // gameInstance = MPGame.at(gameAddress);

        // const evPlayerAdded = gameInstance.PlayerAdded();
        // evPlayerAdded.watch((err, result) => {
        //     if (!err) {
        //         console.log(result);
        //         evPlayerAdded.stopWatching();
        //     }
        // });

        // gameInstance.addPlayer("lepsalex@gmail.com", "Alex", "f0f0f0");
    });

});
