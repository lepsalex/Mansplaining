
/**
 * Wraps the event watcher of a contract into a JS Promise
 * @param {Object} event - The event we are watching
 * @param {function} cb - Supports optional callback function that can override the "stopWatching"
 */
function eventPromise(event, cb = null) {
    return new Promise((resolve, reject) => {
        event.watch((err, result) => {
            if (!err) {
                if (cb) {
                    // Do something with every watch event hit
                    cb(result);
                } else {
                    // Otherwise just stop watching on the first hit
                    event.stopWatching();
                }
                // Resolve with the last result plus the event
                // (in case we need to manually stop watching - or do anything else with it)
                resolve({result, event});
            } else {
                reject(err);
            }
        });
    });
}

/* 
* Original Solution (adpated to normal promise)
* zeppelin-solidity/test/helpers/expectThrow.js
* https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/test/helpers/expectThrow.js
*/
function expectThrow(promise) {
    promise.then(() => {
        console.log('1');
        
        assert.fail('Expected throw not received');
    })
    .catch(error => {
        // TODO: Check jump destination to destinguish between a throw
        //       and an actual invalid jump.
        const invalidOpcode = error.message.search('invalid opcode') >= 0;
        // TODO: When we contract A calls contract B, and B throws, instead
        //       of an 'invalid jump', we get an 'out of gas' error. How do
        //       we distinguish this from an actual out of gas event? (The
        //       testrpc log actually show an 'invalid jump' event.)
        const outOfGas = error.message.search('out of gas') >= 0;
        assert(invalidOpcode || outOfGas, "Expected throw, got '" + error + "' instead");
        return;
    });
};

module.exports = { eventPromise, expectThrow };