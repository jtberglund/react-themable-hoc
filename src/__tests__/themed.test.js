import { mount, shallow } from 'enzyme';

import AphroditeInterface from 'react-themable-hoc-aphrodite-interface';
import { ON_THEME_CHANGE } from '../events';
import React from 'react';
import ThemeEvents from '../ThemeEvents';
import ThemeManager from '../ThemeManager';
import { expect } from 'chai';
import sinon from 'sinon';
import themed from '../themed';

const TEST_THEME1 = { color: 'blue' };
const TEST_THEME2 = { color: 'green' };

const Div = ({ classNames }) => <div className={classNames.styles} />;

const DivStyledByProps = themed((theme, props) => ({
    styles: {
        backgroundColor: props.color
    }
}))(Div);

const ThemedDiv = themed(theme => ({
    styles: {
        backgroundColor: theme.color
    }
}))(Div);

before(() => {
    const aphroditeInterface = new AphroditeInterface();
    ThemeManager.setStyleInterface(aphroditeInterface);
    ThemeManager.addTheme('testTheme1', TEST_THEME1);
    ThemeManager.addTheme('testTheme2', TEST_THEME2);
    ThemeManager.setCurrentTheme('testTheme1');
});

describe.only('themed', () => {
    it('should re-create stylesheets when the theme changes', () => {
        const getThemedStylesSpy = sinon.spy(ThemedDiv.prototype, 'getThemedStyles');
        const onThemeChangeSpy = sinon.spy(ThemedDiv.prototype, 'onThemeChange');
        const wrapper = mount(<ThemedDiv />);
        const div = wrapper.find(Div);
        const initialClassName = div.props().classNames.styles;

        ThemeEvents.publish(ON_THEME_CHANGE, ThemeManager.getTheme('testTheme2'));
        wrapper.update();
        const finalClassName = div.props().classNames.styles;

        expect(initialClassName).to.not.equal(finalClassName);
        expect(onThemeChangeSpy.calledOnce).to.equal(true);
        expect(getThemedStylesSpy.calledAfter(onThemeChangeSpy)).to.equal(true);

        ThemedDiv.prototype.getThemedStyles.restore();
        ThemedDiv.prototype.onThemeChange.restore();
    });

    it('should re-create stylesheets if createStyles function has a prop parameter', () => {
        const componentWillReceivePropsSpy = sinon.spy(DivStyledByProps.prototype, 'componentWillReceiveProps');
        const getThemedStylesSpy = sinon.spy(DivStyledByProps.prototype, 'getThemedStyles');
        const wrapper = mount(<DivStyledByProps color="red" />);
        const div = wrapper.find(Div);
        const initialClassName = div.props().classNames.styles;
        wrapper.setProps({ color: 'blue' });
        const finalClassName = div.props().classNames.styles;

        expect(initialClassName).to.not.equal(finalClassName);
        expect(getThemedStylesSpy.calledTwice).to.equal(true);
        expect(getThemedStylesSpy.calledImmediatelyAfter(componentWillReceivePropsSpy)).to.equal(true);

        DivStyledByProps.prototype.componentWillReceiveProps.restore();
        DivStyledByProps.prototype.getThemedStyles.restore();
    });

    it('should not re-create stylesheets if createStyles has no prop parameter', () => {
        const componentWillReceivePropsSpy = sinon.spy(ThemedDiv.prototype, 'componentWillReceiveProps');
        const getThemedStylesSpy = sinon.spy(ThemedDiv.prototype, 'getThemedStyles');
        const wrapper = mount(<ThemedDiv />);
        const div = wrapper.find(Div);
        const initialClassName = div.props().classNames.styles;
        wrapper.setProps({ color: 'red' });
        const finalClassName = div.props().classNames.styles;

        expect(initialClassName).to.equal(finalClassName);
        expect(getThemedStylesSpy.calledOnce).to.equal(true);
        expect(getThemedStylesSpy.calledImmediatelyAfter(componentWillReceivePropsSpy)).to.equal(false);

        ThemedDiv.prototype.componentWillReceiveProps.restore();
        ThemedDiv.prototype.getThemedStyles.restore();
    });

    it('should not re-create stylesheets if "shouldUpdateStyles" function returns false', () => {
        const shouldUpdateStyles = (currProps, nextProps) => false;
        const NoUpdateDiv = themed(() => ({ styles: {} }), { shouldUpdateStyles })(Div);

        const wrapper = mount(<NoUpdateDiv />);
        const div = wrapper.find(Div);
        const initialClassName = div.props().classNames.styles;

        wrapper.setProps({ color: 'red' });

        const finalClassName = div.props().classNames.styles;

        expect(initialClassName).to.equal(finalClassName);
    });

    it('should extend React.PureComponent if options.pure === true', () => {
        const PureDiv = themed(() => {}, { pure: true })(Div);
        const pureWrapper = shallow(<PureDiv />);
        const wrapper = shallow(<ThemedDiv />);

        expect(pureWrapper.instance() instanceof React.PureComponent).to.equal(true);
        expect(wrapper.instance() instanceof React.Component).to.equal(true);
    });

    it('should set the name of the styles props with the "classesPropName" option', () => {
        const classesPropName = 'testProp';
        const DivWithCustomPropName = themed(() => ({}), { classesPropName })(Div);
        const wrapper = shallow(<DivWithCustomPropName />);
        const div = wrapper.find(Div);

        expect(div.props()[classesPropName]).to.exist;
    });
});
