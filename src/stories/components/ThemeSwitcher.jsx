import PropTypes from 'prop-types';
import React from 'react';
import ThemeProvider from '../../ThemeProvider';

const THEMES = ['lightTheme', 'darkTheme', 'blueTheme'];

export default class ThemeSwitcher extends React.Component {
    constructor(props) {
        super(props);

        props.setup();

        this.toggleTheme = this.toggleTheme.bind(this);

        this.state = {
            theme: THEMES[0]
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.toggleTheme);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.toggleTheme);
    }

    render() {
        return <ThemeProvider theme={this.state.theme}>{this.props.children}</ThemeProvider>;
    }

    toggleTheme(e) {
        if (e.key === 't') {
            const currentThemeIndex = THEMES.indexOf(this.state.theme);
            const theme = THEMES[(currentThemeIndex + 1) % THEMES.length];
            this.setState({ theme });
        }
    }
}

ThemeSwitcher.propTypes = {
    setup: PropTypes.func.isRequired
};
