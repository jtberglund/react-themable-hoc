import React from 'react';
import ThemeProvider from '../ThemeProvider';

export default class ThemeSwitcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: 'theme1'
        };

        this.toggleTheme = this.toggleTheme.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.toggleTheme);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.toggleTheme);
    }

    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
                {this.props.children}
            </ThemeProvider>
        );
    }

    toggleTheme(e) {
        if(e.key === '`') {
            const theme = this.state.theme === 'theme1' ? 'theme2' : 'theme1';
            this.setState({ theme });
        }
    }
}