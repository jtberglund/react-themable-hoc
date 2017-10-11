import { mount, render, shallow } from 'enzyme';

import React from 'react';
import ThemeManager from '../ThemeManager';
import { expect } from 'chai';

describe('ThemeManager', () => {
    it('should throw if no style interface', () => {
        const themeName = 'testTheme';
        expect(() => ThemeManager.getTheme(themeName)).to.throw();

        ThemeManager.addTheme(themeName, {});
        expect(() => ThemeManager.getTheme(themeName)).to.not.throw();
    });

    it('should be able to retrieve themes by name', () => {
        const themeName = 'testTheme';
        const theme = { color: 'red', fontSize: 14 };
        ThemeManager.addTheme(themeName, theme);

        expect(ThemeManager.getTheme(themeName)).to.equal(theme);
    });

    it('should throw if no style interface is set', () => {
        expect(() => ThemeManager.css({})).to.throw();
    });

    it('should throw if style interface does not correctly implement interface functions', () => {
        ThemeManager.setStyleInterface({});
        expect(() => ThemeManager.css({})).to.throw();
    });

    it('should not throw if style interface implements interface functions', () => {
        ThemeManager.setStyleInterface({ css: () => {} });
        expect(() => ThemeManager.css({})).to.not.throw();
    });
});
