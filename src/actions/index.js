import { types } from './types';
import axios from 'axios';

export const fetchWalletMoney = () => async (dispatch) => {
    await axios.get('/rate.json').then(res => {
        dispatch({
            type: types.GET_WALLET_MONEY,
            payload: res.data
        });
    })
    .catch(err => {
        console.log(err);
    })
};
