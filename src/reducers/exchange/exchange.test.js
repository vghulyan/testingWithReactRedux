import { types } from './../../actions/types';
import exchangeReducer from './reducer';

describe('Exchange Reducer', () => {

    it('Should return default state', () => {
        const newState = exchangeReducer(undefined, {});
        expect(newState).toEqual({});
    });

    it('Should return new state if receiving type', () => {

        const exchange = {
            title: 'Exchange',
        }
        const newState = exchangeReducer(undefined, {
            type: types.GET_EXCHANGE,
            payload: exchange
        });
        expect(newState).toEqual(exchange);


    });

});
