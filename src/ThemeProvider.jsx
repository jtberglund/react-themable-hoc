import PropTypes from 'prop-types';
import React from 'react';
import ThemeEvents from './ThemeEvents';
import ThemeManager from './ThemeManager';

const ON_THEME_CHANGE = 'ON_THEME_CHANGE';

const subscribeFunc = ThemeEvents.subscribe(ON_THEME_CHANGE);

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
        if (this.props.theme !== nextProps.theme) {
            ThemeEvents.publish(ON_THEME_CHANGE, ThemeManager.getTheme(nextProps.theme));
        }
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

ThemeProvider.childContextTypes = {
    theme: PropTypes.object,
    subscribeToTheme: PropTypes.func
};

ThemeProvider.propTypes = {
    theme: PropTypes.string
};
