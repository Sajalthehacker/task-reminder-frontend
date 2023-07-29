const initialState = {
    Name: "",
    Email: "",
    isEmailVerified: false,
    isLoggedIn: false,
    token: ""
}

const userReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case "SetName":
            return {
                ...currentState,
                Name: action.payload
            }

        case "SetEmail":
            return {
                ...currentState,
                Email: action.payload
            }

        case "SetIsEmailVerified":
            return {
                ...currentState,
                isEmailVerified: action.payload
            }

        case "SetIsLoggedIn":
            return {
                ...currentState,
                isLoggedIn: action.payload
            }

        case "SetToken":
            return {
                ...currentState,
                token: action.payload
            }

        default:
            return currentState
    }
}


export default userReducer