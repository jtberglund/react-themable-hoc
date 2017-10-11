import { ON_THEME_CHANGE } from './events';
import PropTypes from 'prop-types';
import React from 'react';
import ThemeEvents from './ThemeEvents';
import ThemeManager from './ThemeManager';
import hoistStatics from 'hoist-non-react-statics';
import shallowequal from 'shallowequal';

function getBaseClass(isPure) {
    return isPure ? React.PureComponent : React.Component;
}

/**
 * Themable HOC to provide themed stylesheets for a component
 * @param {*} createStyles Function that takes the current theme and the props passed
 * to this component, and returns an object with properties for each set of styles.
 * @param {*} options Options for creating the HOC
 */
export default function themed(createStyles, { pure, shouldUpdateStyles } = {}) {
    return WrappedComponent => {
        const dependsOnProps = createStyles.length > 1;
        const BaseClass = getBaseClass(pure);

        class ThemableHOC extends BaseClass {
            constructor(props) {
                super(props);

                this.unsubscribeFromTheme = ThemeEvents.subscribe(ON_THEME_CHANGE, this.onThemeChange.bind(this));

                this.state = {
                    stylesToPass: this.getThemedStyles(ThemeManager.getCurrentTheme())
                };
            }

            componentWillReceiveProps(nextProps) {
                if (dependsOnProps) {
                    // Use shouldUpdateStyles if available.
                    // If pure, perform shallow equal comparison on the props
                    const willUpdateStyles = shouldUpdateStyles
                        ? shouldUpdateStyles(this.props, nextProps)
                        : pure ? shallowequal(nextProps, this.props) : true;
                    if (willUpdateStyles) {
                        this.setState({ stylesToPass: this.getThemedStyles(ThemeManager.getCurrentTheme(), nextProps) });
                    }
                }
            }

            componentWillUnmount() {
                if (this.unsubscribeFromTheme) {
                    this.unsubscribeFromTheme();
                }
            }

            render() {
                const { stylesToPass } = this.state;
                const extraProps = {
                    ref: this.props.innerRef,
                    classNames: stylesToPass
                };

                return <WrappedComponent {...this.props} {...extraProps} />;
            }

            onThemeChange(theme) {
                this.setState({ stylesToPass: this.getThemedStyles(theme) });
            }

            getThemedStyles(theme, props = this.props) {
                // Allow users to pass a POJO instead of a function if
                // the styles aren't reliant upon the theme or props
                const styles = typeof createStyles === 'function' ? createStyles(theme, props) : createStyles;

                return ThemeManager.css(styles || {});
            }
        }

        const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
        ThemableHOC.displayName = `Themed(${componentName})`;

        return hoistStatics(ThemableHOC, WrappedComponent);
    };
}
