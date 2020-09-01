//ref: https://blog.csdn.net/tank_ft/article/details/104094462

import keyMirror from 'keymirror';
const UserState = keyMirror({
    NOT_LOGINED: null,
    LOGINED: null
});
const UserStates = Object.keys(UserState)
const initialState = {
    error: null,
    userData: null,
    loginState: UserState.NOT_LOGINED
};
const getIsLogined = loginState => (
    loginState === UserState.LOGINED
);
const reducer = function (state, action) {
    console.log('-----------user-state.reduce.state',state);
    console.log('-----------user-state.reduce.state==="undefined"',typeof state === 'undefined');
    if (typeof state === 'undefined') state = initialState;
    console.log('-----------user-state.reduce.state',state);
    return state;
}
export {
    reducer as default,
    initialState as userStateInitialState,
    UserState,
    UserStates,
    getIsLogined
};
