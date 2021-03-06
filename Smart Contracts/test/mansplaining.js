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
            let activePlayers = [];

            testPromises.push(eventPromise(gameInstance.PlayerAdded(), result => {
                activePlayers.push(result.args);
            }));

            testPromises.push(gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0"));
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
                        assert.lengthOf(activePlayers, 5, "Returned four player addresses");
                        done();
                    }, 1000);
                });
        });
    });

    it("should not accept a fifth player", done => {
        const gameInstance = MPGame.new(initPoints).then(gameInstance => {
            let testPromises = [];
            testPromises.push(gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0"));
            testPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));
            testPromises.push(gameInstance.addPlayer("two@gmail.com", "Two", "b2b2b2"));
            testPromises.push(gameInstance.addPlayer("three@gmail.com", "Three", "c3c3c3"));

            Promise.all(testPromises)
                .then(resolvedPromises => {
                    expectThrow(gameInstance.addPlayer("nonono@gmail.com", "NONONO", "000000"), done);
                });
        });
    });

    it("should start a game with at least one player", done => {
        const gameInstance = MPGame.new(initPoints).then(gameInstance => {

            gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0")
            .then(() => {
                let testPromises = [];

                testPromises.push(eventPromise(gameInstance.GameReady()));
                testPromises.push(gameInstance.startGame());
                
                return Promise.all(testPromises);
            })
            .then(resolvedPromises => {
                const { event, result } = resolvedPromises[0];
                event.stopWatching();
                assert.equal(result.event, "GameReady", "Game state succesfully transitioned to ready state");
                done();
            });
        });
    });

    it("should not allow game to start with no players", done => {
        const gameInstance = MPGame.new(initPoints).then(gameInstance => {
            expectThrow(gameInstance.startGame(), done);
        });
    });

    it("should award specified player one point", done => {
        MPGame.new(initPoints).then(gameInstance => {
            let setupPromises = [];

            setupPromises.push(gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0"));
            setupPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));

            Promise.all(setupPromises)
                .then(resolvedPromises => {
                    return gameInstance.startGame();
                })
                .then(() => {
                    const testPromises = [];
                    testPromises.push(eventPromise(gameInstance.PointReceived()));                    
                    testPromises.push(gameInstance.awardPoint("zero@gmail.com"));
                    return Promise.all(testPromises);
                })
                .then(resolvedPromises => {
                    const { event, result } = resolvedPromises[0];
                    event.stopWatching();                    
                    assert.equal(result.args.playerEmail, "zero@gmail.com", "Correct Player");
                    assert.equal(result.args.playerScore, 1, "Player balance is now equal to 1");
                    done();
                });
        });
    });

    it("should not award points if game has not started", done => {
        MPGame.new(initPoints).then(gameInstance => {
            let setupPromises = [];
            
            setupPromises.push(gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0"));
            setupPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));

            Promise.all(setupPromises)
                .then(() => {
                    expectThrow(gameInstance.awardPoint("zero@gmail.com"), done);
                });
        });
    });

    it("should not award points if gamePoints are depleted", done => {
        MPGame.new(0).then(gameInstance => {
            let setupPromises = [];

            setupPromises.push(gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0"));
            setupPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));

            Promise.all(setupPromises)
                .then(() => {
                    return gameInstance.startGame()
                })
                .then(() => {
                    expectThrow(gameInstance.awardPoint("zero@gmail.com"), done);
                });
        });
    });

    it("should return points balance given an active player email", done => {
        MPGame.new(initPoints).then(gameInstance => {
            let setupPromises = [];

            setupPromises.push(gameInstance.addPlayer("zero@gmail.com", "Zero", "f0f0f0"));
            setupPromises.push(gameInstance.addPlayer("one@gmail.com", "One", "a1a1a1"));

            Promise.all(setupPromises)
                .then(() => {
                    return gameInstance.startGame();
                })
                .then(() => {
                    return gameInstance.awardPoint("zero@gmail.com");
                })
                .then(() => {
                    return gameInstance.getPlayerPoints("zero@gmail.com");
                })
                .then(response => {
                    assert.equal(response, 1, "Player balance is now equal to 1");
                    done(); 
                });
        });
    });

    it("should end game on kill command", done => {
        let gameAddress;

        MPGame.new(initPoints).then(gameInstance => {
            gameAddress = gameInstance.address;
            return gameInstance.kill();            
        })
        .then(() => {
            // We are expecting and error since there should be no contract at address
            process.prependOnceListener('uncaughtException', () => {
                done();
            });
            process.nextTick(() => {
                MPGame.at(gameAddress)
                .then(() => {
                    next();
                });
            });
        });
    });
});
