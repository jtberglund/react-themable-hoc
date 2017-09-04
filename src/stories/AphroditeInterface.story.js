import './style.css';

import { InnerComponent, OuterComponent, ThemeSwitcher } from './components';

import AphroditeInterface from 'react-themable-hoc-aphrodite-interface';
import React from 'react';
import ThemeManager from '../ThemeManager';
import aphrodite from 'aphrodite';
import { storiesOf } from '@storybook/react';
import themed from '../themed';
import themes from './themes';

function setup() {
    // Setup the ThemeManager with Aprodite
    const aphroditeInterface = new AphroditeInterface(aphrodite);
    ThemeManager.setStyleInterface(aphroditeInterface);

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
        backgroundColor: background
    },
    content: {
        color: color,
        fontSize: `${fontSize}${unit}`
    }
}))(InnerComponent);

const ThemedOuterComponent = themed(({ background, color }) => ({
    wrapper: {
        height: '100%',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: background
    },
    header: {
        color: color
    }
}))(OuterComponent);

storiesOf('ThemableHOC', module)
    // Toggles themes by pressesing 't'
    .addDecorator(story => <ThemeSwitcher setup={setup}>{story()}</ThemeSwitcher>)
    .add('AphroditeInterface', () => (
        <ThemedOuterComponent interfaceType="AphroditeInterface">
            <ThemedInnerComponent />
        </ThemedOuterComponent>
    ));