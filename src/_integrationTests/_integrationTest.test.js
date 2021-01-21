import moxios from 'moxios';
import { testStore } from './../../Utils';
import { fetchWalletMoney } from "../actions";

describe('fetchWalletMoney action', () => {

    beforeEach(() => {
       moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    })

    test('Store is update correctly', () => {
        const expectedState = {
           title: 'Wallet Title',
           rate: 12
        };

        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: expectedState
            });
        });

        return store.dispatch(fetchWalletMoney())
            .then(() => {
                const newState = store.getState();
                expect(newState.wallet).toBe(expectedState);
            });
    });
});
