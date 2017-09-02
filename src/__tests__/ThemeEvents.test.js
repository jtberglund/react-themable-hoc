import ThemeEvents from '../ThemeEvents';
import { expect } from 'chai';
import sinon from 'sinon';

const TEST_EVENT = 'TEST_EVENT';

beforeEach(() => {
    ThemeEvents.listeners = {};
});

describe('ThemeEvents', () => {
    it('should create listeners array for callbacks', () => {
        ThemeEvents.subscribe(TEST_EVENT, () => {});
        expect(!!ThemeEvents.listeners[TEST_EVENT]).to.be.true;
    });

    it('should add callbacks to listeners array', () => {
        ThemeEvents.subscribe(TEST_EVENT, () => {});
        expect(ThemeEvents.listeners[TEST_EVENT].length).to.equal(1);
    });

    it('should unsubscribe successfully', () => {
        const callback = () => {};

        // Test static method of unsubbing
        ThemeEvents.subscribe(TEST_EVENT, callback);
        expect(ThemeEvents.listeners[TEST_EVENT].length).to.equal(1);
        ThemeEvents.unsubscribe(TEST_EVENT, callback);
        expect(ThemeEvents.listeners[TEST_EVENT].length).to.equal(0);

        // Test unsubbing using the function returned from subscribe
        const unsub = ThemeEvents.subscribe(TEST_EVENT, callback);
        expect(ThemeEvents.listeners[TEST_EVENT].length).to.equal(1);
        unsub();
        expect(ThemeEvents.listeners[TEST_EVENT].length).to.equal(0);
    });

    it('should execute callbacks when an event is published', () => {
        const callback = sinon.spy();

        ThemeEvents.subscribe(TEST_EVENT, callback);

        const payload = { content: 'some random info' };
        ThemeEvents.publish(TEST_EVENT, payload);

        expect(callback.calledWith(payload)).to.be.true;
    });
});
