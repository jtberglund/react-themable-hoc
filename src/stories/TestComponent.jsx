import React from 'react';
import themed from '../ThemableHOC';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className={this.props.classNames.header}>Test</h1>
            </div>
        );
    }
}

export default themed(theme => ({
    header: {
        color: theme.color
    }
}))(TestComponent);