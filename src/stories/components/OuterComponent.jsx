import InnerComponent from './InnerComponent';
import PropTypes from 'prop-types';
import React from 'react';

export default class OuterComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classNames, interfaceType, children } = this.props;

        return (
            <div className={classNames.wrapper}>
                <h1 className={classNames.header}>react-themable-hoc with {interfaceType}</h1>
                <div>{children}</div>
            </div>
        );
    }
}

OuterComponent.propTypes = {
    interfaceType: PropTypes.string.isRequired,
    classNames: PropTypes.object
};
OuterComponent.defaultProps = {
    classNames: {}
};
