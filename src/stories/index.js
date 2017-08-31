import AphroditeInterface from '../interfaces/AphroditeInterface';
import React from 'react';
import TestComponent from './TestComponent';
import ThemeManager from '../ThemeManager';
import ThemeSwitcher from './ThemeSwitcher';
import { action } from '@storybook/addon-actions';
import aphrodite from 'aphrodite';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';

// Setup the ThemeManager with Aprodite
const aphroditeInterface = AphroditeInterface(aphrodite);
ThemeManager.setStyleInterface(aphroditeInterface);
ThemeManager.addTheme('lightTheme', {
    color: '#222',
    fontSize: 16,
    unit: 'px',
    background: '#FCFCFC'
});
ThemeManager.addTheme('darkTheme', {
    color: '#ddd',
    fontSize: 1.2,
    unit: 'em',
    background: '#333'
});

storiesOf('ThemableHOC', module)
    // Toggles themes by pressesing '`'
    .addDecorator(story => <ThemeSwitcher>{story()}</ThemeSwitcher>)
    .add('ThemableHOC', () => <TestComponent />);
