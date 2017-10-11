import AphroditeInterface from 'react-themable-hoc-aphrodite-interface';
import React from 'react';
import { StyledWithProps } from './components';
import ThemeManager from '../ThemeManager';
import { ThemeSwitcher } from './components';
import { storiesOf } from '@storybook/react';
import themed from '../themed';
import themes from './themes';
import { withInfo } from '@storybook/addon-info';

function setup() {
    // Setup the ThemeManager with Aprodite
    const aphroditeInterface = new AphroditeInterface();
    ThemeManager.setStyleInterface(aphroditeInterface);

    // Add our themes
    Object.keys(themes).forEach(themeName => {
        ThemeManager.addTheme(themeName, themes[themeName]);
    });
}

storiesOf('ThemableHOC', module)
    .addDecorator(story => <ThemeSwitcher setup={setup}>{story()}</ThemeSwitcher>)
    .add(
        'Style based on props',
        withInfo(
            `
            \`react-themable-hoc\` allows you to create stylesheets based on the props passed to your component.
        `
        )(() => <StyledWithProps color="red" />)
    );
