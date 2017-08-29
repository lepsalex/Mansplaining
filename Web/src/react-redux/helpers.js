// React/Redux helpers

// Generates a redux action with type only (no payload)
export function emptyActionGenerator(type) {
    return () => {
        return { type };
    };
}

// Geneates a redux action with type and payload
export function payloadActionGenerator(type) {
    return payload => {
        return {
            type,
            payload
        };
    };
}

export function makeURL(string) {
    return string.replace(/[^a-zA-Z0-9]+/g, "-");
}
