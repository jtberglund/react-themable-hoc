import PropTypes from 'prop-types';
import React from 'react';
import ThemeManager from './ThemeManager';
import hoistStatics from 'hoist-non-react-statics';

function getBaseClass(isPure) {
    return isPure ? React.PureComponent : React.Component
}

/**
 * Themable HOC to provide themed stylesheets for a component
 * @param {*} createStyles Function that takes the current theme and the props passed
 * to this component, and returns an object with properties for each set of styles.
 * @param {*} options Options for creating the HOC
 */
export default function themed(createStyles, options = {}) {
    return WrappedComponent => {
        const BaseClass = getBaseClass(options.pure);

        class ThemableHOC extends BaseClass {

            constructor(props, context) {
                super(props, context);

                if(context.subscribeToTheme) {
                    context.subscribeToTheme(this.onThemeChange.bind(this));
                } else {
                    console.warn('Could not find function "subscribeToTheme" in the context');
                }

                this.state = {
                    stylesToPass: this.getThemedStyles(context.theme)
                };
            }

            render() {
                const { stylesToPass } = this.state;
                const extraProps = {
                    ref: this.props.innerRef,
                    classNames: stylesToPass
                };

                return (
                    <WrappedComponent {...this.props} {...extraProps} />
                );
            }

            onThemeChange(theme) {
                this.setState({ stylesToPass: this.getThemedStyles(theme) });
            }

            getThemedStyles(theme) {
                // Allow users to pass a POJO instead of a function if
                // the styles aren't reliant upon the theme or props
                const styles = typeof createStyles === 'function' ?
                    createStyles(theme, this.props) :
                    createStyles || {};

                return ThemeManager.css(styles);
            }
        }

        ThemableHOC.contextTypes = {
            theme: PropTypes.object,
            subscribeToTheme: PropTypes.func
        };

        const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Unknown';
        ThemableHOC.displayName = `Themed(${componentName})`;

        return hoistStatics(ThemableHOC, WrappedComponent);
    }
}