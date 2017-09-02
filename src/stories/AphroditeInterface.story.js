import './style.css';

import AphroditeInterface from 'react-themable-hoc-aphrodite-interface';
import React from 'react';
import TestComponent from './TestComponent';
import ThemeManager from '../ThemeManager';
import ThemeSwitcher from './ThemeSwitcher';
import { action } from '@storybook/addon-actions';
import aphrodite from 'aphrodite';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import themed from '../themed';
import themes from './themes';

// Setup the ThemeManager with Aprodite
const aphroditeInterface = new AphroditeInterface(aphrodite);
ThemeManager.setStyleInterface(aphroditeInterface);

// Add our themes
Object.keys(themes).forEach(themeName => {
    ThemeManager.addTheme(themeName, themes[themeName]);
});

// Add theme to the TestComponent using Aphrodite styles
const ThemedComponent = themed(({ background, color }) => ({
    wrapper: {
        height: '100%',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: background
    },
    header: {
        color: color
    }
}))(TestComponent);

storiesOf('ThemableHOC', module)
    // Toggles themes by pressesing 't'
    .addDecorator(story => <ThemeSwitcher>{story()}</ThemeSwitcher>)
    .add('AphroditeInterface', () => <ThemedComponent interfaceType="AphroditeInterface" />);
