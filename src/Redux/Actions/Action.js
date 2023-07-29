export const setNameStore = (payload) => {
    return {
        type: "SetName",
        payload: payload
    }
}

export const setEmailStore = (payload) => {
    return {
        type: "SetEmail",
        payload: payload
    }
}

export const setIsEmailVerifiedStore = (payload) => {
    return {
        type: "SetIsEmailVerified",
        payload: payload
    }
}

export const setIsLoggedInStore = (payload) => {
    return {
        type: "SetIsLoggedIn",
        payload: payload
    }
}

export const setTokenStore = (payload) => {
    return {
        type: "SetToken",
        payload: payload
    }
}



