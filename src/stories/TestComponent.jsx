import React from 'react';
import themed from '../themed';

const TestSFC = ({ classNames }) => (
    <div className={classNames.sfcWrapper}>
        <p className={classNames.sfcContent}>[Content goes here]</p>
    </div>
);

const ThemedTestSFC = themed(theme => ({
    sfcWrapper: {
        backgroundColor: theme.background
    },
    sfcContent: {
        color: theme.color,
        fontSize: `${theme.fontSize}${theme.unit}`
    }
}))(TestSFC);

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classNames = {} } = this.props;
        return (
            <div className={classNames.wrapper}>
                <h1 className={classNames.header}>Header text</h1>
                <div>
                    <ThemedTestSFC />
                </div>
            </div>
        );
    }
}

// export default TestComponent;
export default themed(theme => ({
    wrapper: {
        backgroundColor: theme.background
    },
    header: {
        color: theme.color
    }
}))(TestComponent);
