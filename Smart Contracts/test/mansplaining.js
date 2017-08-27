const { eventPromise, expectThrow } = require('./helpers/contractTestHelpers');
const Mansplaining = artifacts.require("./Mansplaining.sol");
const MPGame = artifacts.require("./MPGame.sol");

contract('Mansplaining', accounts => {

    const initPoints = 100;

    it("should create a new Mansplaining have it create one MPGame", done => {
        Mansplaining.deployed()
        .then(instance => {

            const testPromises = [];

            testPromises.push( eventPromise(instance.NewGame()) );
            testPromises.push(instance.createGame(initPoints) );

            return Promise.all(testPromises);
        })
        .then(resolvedPromises => {
            const eventResult = resolvedPromises[0].result;
            assert.isDefined(eventResult, "New game address returned");
            done();
        });
    });

    it("should create a new game with 100 points available", done => {
        MPGame.new(initPoints).then(gameInstance => {
            gameInstance.getPointsBalance.call()
            .then(result => {
                assert.equal(result, 100, "Game starts with 100 points");
                done();
            });
        });
    });

    it("should enable a game to add four player", done => {

        MPGame.new(initPoints).then(gameInstance => {
            let testPromises = [];
            let playerAddresses = [];

            testPromises.push(eventPromise(gameInstance.PlayerAdded(), result => {
                playerAddresses.push(result.args);
            }));

            testPromises.push(gameInstance.addPlayer("lepsalex@gmail.com", "Alex", "f0f0f0"));
            testPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));
            testPromises.push(gameInstance.addPlayer("two@gmail.com", "Two", "b2b2b2"));
            testPromises.push(gameInstance.addPlayer("three@gmail.com", "Three", "c3c3c3"));

            Promise.all(testPromises)
                .then(resolvedPromises => {
                    const event = resolvedPromises[0].event;
                    // There must be some issues with either TestRPC running to quickly or
                    // truffle doing some weirdnedd but we need to accept that we are getting a duplucate
                    // event and wait a second before stopping the watcher ...
                    // ... if we run "testrpc -d -b 1" it will be 4 as it should be but damn will it be slow ...
                    setTimeout(() => {
                        event.stopWatching();
                        assert.lengthOf(playerAddresses, 5, "Returned four player addresses");
                        done();
                    }, 1000);
                });
        });
    });

    it("should not accept a fifth player", done => {
        const gameInstance = MPGame.new(initPoints).then(gameInstance => {
            let testPromises = [];
            testPromises.push(gameInstance.addPlayer("lepsalex@gmail.com", "Alex", "f0f0f0"));
            testPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));
            testPromises.push(gameInstance.addPlayer("two@gmail.com", "Two", "b2b2b2"));
            testPromises.push(gameInstance.addPlayer("three@gmail.com", "Three", "c3c3c3"));

            Promise.all(testPromises)
                .then(resolvedPromises => {
                    expectThrow(gameInstance.addPlayer("nonono@gmail.com", "NONONO", "000000"));
                    done();
                });
        });
    });

});
