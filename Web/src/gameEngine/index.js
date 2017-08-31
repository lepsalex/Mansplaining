/* Interface for our smart contracts */

// Creates a new game and returns the newly minted contract address
export function createNewGameContract() {
    return new Promise(resolve => {
        // mockup for now
        setTimeout(() => {
            resolve('0xfd09000c01309399d4c8507252d8cab950286ed8')
        }, 100)
    })
}
