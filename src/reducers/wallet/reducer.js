import { types } from './../../actions/types';

export default (state={}, action) => {
    switch(action.type) {
        case types.GET_WALLET_MONEY:
            return action.payload;
        default:
            return state;
    }
};
