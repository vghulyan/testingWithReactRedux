import { types } from './../../actions/types';
import walletReducer from './reducer';

describe('Wallet Reducer', () => {

    it('Should return default state', () => {
        const newState = walletReducer(undefined, {});
        expect(newState).toEqual({});
    });

    it('Should return new state if receiving type', () => {

        const wallet = {
            title: 'Wallet',
            rate: 12
        }
        const newState = walletReducer(undefined, {
            type: types.GET_WALLET_MONEY,
            payload: wallet
        });
        expect(newState).toEqual(wallet);


    });

});
