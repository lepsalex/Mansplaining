function eventPromise(event, cb) {
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
}

module.exports = { eventPromise };