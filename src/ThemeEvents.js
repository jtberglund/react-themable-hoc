export default class ThemeEvents {
    static listeners = {};

    /**
     * Subscribe to an event type.
     * Returns a function that can be used to unsubscribe from this event
     */
    static subscribe(event, listener, options = {}) {
        if (event && !listener) {
            // Partial application - returns function that takes a listener and options
            // for this event type
            return (l, o) => this.subscribe(event, l, o);
        }

        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(listener);

        return () => this.unsubscribe(event, listener);
    }

    /**
     * Unsubscribe from an event
     */
    static unsubscribe(event, listener) {
        const listenerIndex = this.listeners[event].indexOf(listener);
        if (listenerIndex < 0) return;

        this.listeners[event] = [
            ...this.listeners[event].slice(0, listenerIndex),
            ...this.listeners[event].slice(listenerIndex + 1)
        ];
    }

    /**
     * Publish an event - will execute callbacks for all listeners for the specified event type
     */
    static publish(event, payload) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(payload));
        }
    }
}
