import React from 'react';

const InnerComponent = ({ classNames }) => (
    <div className={classNames.wrapper}>
        <p className={classNames.content}>Press 't' to toggle between themes</p>
    </div>
);

InnerComponent.displayName = 'InnerComponent';

export default InnerComponent;
