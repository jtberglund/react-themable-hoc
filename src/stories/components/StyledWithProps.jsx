import * as PropTypes from 'prop-types';

import React from 'react';
import themed from '../../themed';

const StyledWithProps = ({ classNames }) => (
    <div className={classNames.styles}>This stylesheet used for this component uses the 'color' prop </div>
);

StyledWithProps.propTypes = {
    color: PropTypes.string.isRequired
};
StyledWithProps.displayName = 'StyledWithProps';

export default themed((theme, props) => ({
    styles: {
        textAlign: 'center',
        backgroundColor: props.color
    }
}))(StyledWithProps);
