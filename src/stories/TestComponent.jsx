import PropTypes from 'prop-types';
import React from 'react';
import themed from '../themed';

const InnerComponent = themed(({ background, color, fontSize, unit }) => ({
    wrapper: {
        backgroundColor: background
    },
    content: {
        color: color,
        fontSize: `${fontSize}${unit}`
    }
}))(({ classNames }) => (
    <div className={classNames.wrapper}>
        <p className={classNames.content}>Press 't' to toggle between themes</p>
    </div>
));

export default class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classNames, interfaceType } = this.props;

        return (
            <div className={classNames.wrapper}>
                <h1 className={classNames.header}>react-themable-hoc with {interfaceType}</h1>
                <div>
                    <InnerComponent />
                </div>
            </div>
        );
    }
}

TestComponent.propTypes = {
    interfaceType: PropTypes.string.isRequired,
    classNames: PropTypes.object
};
TestComponent.defaultProps = {
    classNames: {}
};
