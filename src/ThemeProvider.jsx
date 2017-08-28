import PropTypes from 'prop-types';
import React from 'react';
import ThemeManager from './ThemeManager';

class EventHandler {
    static listeners = {};

    /**
     * Subscribe to an event type
     */
    static subscribe(event, listener, options = {}) {

        if(event && !listener) {
            // Partial application - returns function that takes a listener and options
            // for this event type
            return (l, o) => this.subscribe(event, l, o);
        }

        if(!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(listener);
    }

    /**
     * Unsubscribe from an event
     */
    static unsubscribe(event, listener) {
        const listenerIndex = this.listeners[event].findIndex(l => l === listener);
        if(listenerIndex < 0) return;

        this.listeners[event] = [
            ...this.listeners[event].slice(0, listenerIndex),
            ...this.listeners[event].slice(listenerIndex + 1)
        ];
    }

    /**
     * Publish an event - will execute callbacks for all listeners for the specified event type
     */
    static publish(event, payload) {
        if(this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(payload));
        }
    }
};

const ON_THEME_CHANGE = 'ON_THEME_CHANGE';

const subscribeFunc = EventHandler.subscribe(ON_THEME_CHANGE)

export default class ThemeProvider extends React.Component {

    getChildContext() {
        return {
            // Active theme
            theme: ThemeManager.getTheme(this.props.theme),
            // Used by wrapped components to subcribe to theme changes
            subscribeToTheme: subscribeFunc
        };
    }

    componentWillReceiveProps(nextProps) {
        // Notify listeners of theme change
        if(this.props.theme !== nextProps.theme) {
            EventHandler.publish(ON_THEME_CHANGE, ThemeManager.getTheme(nextProps.theme));
        }
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

ThemeProvider.childContextTypes = {
    theme: PropTypes.object,
    subscribeToTheme: PropTypes.func
}

ThemeProvider.propTypes = {
    theme: PropTypes.string
};