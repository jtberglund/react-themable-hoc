import React from 'react';
import themed from '../themed';

const InnerComponent = themed(({ background, color, fontSize, unit }) => ({
    sfcWrapper: {
        backgroundColor: background
    },
    sfcContent: {
        color: color,
        fontSize: `${fontSize}${unit}`
    }
}))(({ classNames }) => (
    <div className={classNames.sfcWrapper}>
        <p className={classNames.sfcContent}>[Content goes here]</p>
    </div>
));

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classNames } = this.props;
        return (
            <div className={classNames.wrapper}>
                <h1 className={classNames.header}>Header text</h1>
                <div>
                    <InnerComponent />
                </div>
            </div>
        );
    }
}

export default themed(({ background, color }) => ({
    wrapper: {
        backgroundColor: background
    },
    header: {
        color: color
    }
}))(TestComponent);
