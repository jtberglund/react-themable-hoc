import PropTypes from 'prop-types';
import React from 'react';
import invariant from 'invariant';

export default class ThemeManager {
    static defaultTheme = {};
    static themes = {};
    static styleInterface;

    static setStyleInterface(styleInterface) {
        this.styleInterface = styleInterface;
    }

    static addTheme(themeName, themeStyles) {
        this.themes[themeName] = themeStyles;
    }

    static getTheme(themeName) {
        invariant(this.themes[themeName], `Theme "${themeName}" does not exist. Make sure to
            call "ThemeManager.addTheme".`)
        return this.themes[themeName];
    }

    static css(styles) {
        invariant(this.styleInterface, 'No style interface set');

        invariant(typeof this.styleInterface.css === 'function',
            'Style interface does not implement the "css" function to create styles');

        return this.styleInterface.css(styles) || {};
    }
}

