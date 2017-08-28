import aphrodite from 'aphrodite';

export default ({ StyleSheet, css } = aphrodite) => ({
    css(styles) {
        const createdStyles = StyleSheet.create(styles);
        const classNames = {};
        const styleKeys = Object.keys(createdStyles);

        // Use regular for-loop for performance
        for(let i = 0; i < styleKeys.length; i++) {
            const key = styleKeys[i];
            classNames[key] = css(createdStyles[key]);
        }

        return classNames;
    }
});