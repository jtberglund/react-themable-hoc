import { ON_THEME_CHANGE } from './events';
import PropTypes from 'prop-types';
import React from 'react';
import ThemeEvents from './ThemeEvents';
import ThemeManager from './ThemeManager';
import invariant from 'invariant';

export default function make({ themes, styleInterface, initialTheme = themes[0] }) {
    if (themes.length === 0) {
        invariant('No themes defined in ThemeProvider.make');
    }
    if (!styleInterface) {
        invariant('No style interface supplied to ThemeProvider.make');
    }

    const { Provider, Consumer } = React.createContext({
        themes,
        styleInterface,
        theme: initialTheme
    });

    return {
        Provider,
        Consumer,
        themed: () => {}
    };
}

// export default class ThemeProvider extends React.Component {
//     constructor(props) {
//         super(props);

//         ThemeManager.setCurrentTheme(props.theme);
//     }

//     componentWillReceiveProps(nextProps) {
//         // Notify listeners of theme change
//         if (this.props.theme !== nextProps.theme) {
//             ThemeManager.setCurrentTheme(nextProps.theme);
//             ThemeEvents.publish(ON_THEME_CHANGE, ThemeManager.getTheme(nextProps.theme));
//         }
//     }

//     render() {
//         return React.Children.only(this.props.children);
//     }
// }

// ThemeProvider.propTypes = {
//     theme: PropTypes.string
// };
