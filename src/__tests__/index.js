import { mount, render, shallow } from 'enzyme';

import React from 'react';
import ThemeManager from '../ThemeManager';
import { expect } from 'chai';

describe('ThemeManager', () => {

    it('to throw if no style interface', () => {
        expect(() => ThemeManager.getTheme('testTheme')).to.throw();
    });

    it('to throw if no style interface is set', () => {
        expect(() => ThemeManager.css({})).to.throw();
    });

    it('to throw if style interface does not correctly implement interface functions', () => {
        ThemeManager.setStyleInterface({});
        expect(() => ThemeManager.css({})).to.throw();
    });

    it('to not throw if style interface implements interface functions', () => {
        const noop = () => {};
        ThemeManager.setStyleInterface({ css: noop });
        expect(() => ThemeManager.css({})).to.not.throw();
    });

});