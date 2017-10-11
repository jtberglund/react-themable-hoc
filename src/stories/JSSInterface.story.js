import './style.css';

import { InnerComponent, OuterComponent, ThemeSwitcher } from './components';

import JSSInterface from 'react-themable-hoc-jss-interface';
import React from 'react';
import ThemeManager from '../ThemeManager';
import jss from 'jss';
import preset from 'jss-preset-default';
import { storiesOf } from '@storybook/react';
import themed from '../themed';
import themes from './themes';
import { withInfo } from '@storybook/addon-info';

jss.setup(preset());

function setup() {
    // Setup the ThemeManager with JSS
    const jssInterface = new JSSInterface();
    ThemeManager.setStyleInterface(jssInterface);

    // Add our themes
    Object.keys(themes).forEach(themeName => {
        ThemeManager.addTheme(themeName, themes[themeName]);
    });
}

//////////
// Normally the HOC with the styles will be in the same file as the component,
// but we've moved it out so we can reuse the same components with multiple
// css-in-js interfaces for the stories
//////////

const ThemedInnerComponent = themed(({ background, color, fontSize, unit }) => ({
    wrapper: {
        'background-color': background
    },
    content: {
        color: color,
        'font-size': `${fontSize}${unit}`
    }
}))(InnerComponent);

const ThemedOuterComponent = themed(({ background, color }) => ({
    wrapper: {
        height: '100%',
        overflow: 'hidden',
        'text-align': 'center',
        'background-color': background
    },
    header: {
        color: color
    }
}))(OuterComponent);

storiesOf('ThemableHOC', module)
    // Toggles themes by pressesing 't'
    .addDecorator(story => <ThemeSwitcher setup={setup}>{story()}</ThemeSwitcher>)
    .add(
        'JSSInterface',
        withInfo(`
            Use [jss](https://github.com/cssinjs/jss) with [react-themable-hoc](https://github.com/jtberglund/react-themable-hoc).

            View the [README](https://github.com/jtberglund/react-themable-hoc-jss-interface#react-themable-hoc-jss-interface) for more info.

            ## Usage
            \`\`\`js
                const jssInterface = new JSSInterface();
                ThemeManager.setStyleInterface(jssInterface);
            \`\`\`
        `)(() => (
            <ThemedOuterComponent interfaceType="JSSInterface">
                <ThemedInnerComponent />
            </ThemedOuterComponent>
        ))
    );
