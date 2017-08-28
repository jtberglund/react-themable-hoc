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
ThemeManager.addTheme('theme1', { color: 'red' });
ThemeManager.addTheme('theme2', { color: 'blue' });

storiesOf('ThemableHOC', module)
    // Toggles themes by pressesing '`'
    .addDecorator(story => (
        <ThemeSwitcher>
            {story()}
        </ThemeSwitcher>
    ))
    .add('ThemableHOC', () => <TestComponent />);
