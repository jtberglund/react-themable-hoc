# react-themable-hoc

Higher-order-components for theming using css-in-js.

```
npm install --save react-themable-hoc
```

## Usage

Simply add the `themed` HOC to the bottom of your component class.

```jsx
import React from 'react';
import { themed } from 'react-themable-hoc';

const Button = ({ onClick, classNames }) => (
    <input className={classNames.button} type="button" onClick={onClick} />
);

export default themed(theme => ({
    button: {
        color: theme.fontColor,
        backgroundColor: theme.backgroundColor
    }
}))(Button);
```

### Setup

Define your themes and add them to the `ThemeManager`

```js
import { ThemeManager } from 'react-themable-hoc';

ThemeManager.addTheme('theme1', {
    primaryColor: '#eee',
    secondaryColor: '#bbb',
    fontColor: '#333',
    fontSize: '14px'
});
ThemeManager.addTheme('theme2', {
    // ...
});
```

Pick your css-in-js interface (See [Supported Interfaces](#supported-interfaces))

This example uses the [AphroditeInterface](https://github.com/jtberglund/react-themable-hoc-aphrodite-interface)

```js
import AphroditeInterface from 'react-themable-hoc-aphrodite-interface';

//...

ThemeManager.setStyleInterface(new AphroditeInterface());
```


Setup the `ThemeProvider`. This allows all components under the `ThemeProvider` to have access to the current theme.

```jsx
ReactDOM.render(
    <ThemeProvider theme="myTheme">
        <App />
    </ThemeProvider>,
    document.getElementById('app')
);
```

### Options

You can pass options to the `themed` HOC.

```js
export default themed(theme => ({
    button: {
        // ...
    }
}), { pure: true })(Button);
```

#### Available options
| Name | type | Default | Description |
|------|------|---------|-------------|
| pure | boolean | undefined | If true, the HOC will extend from React.PureComponent |
| shouldUpdateStyles | function | undefined | Determine if stylesheets should be re-created on update. See [Styling based on props](#style-props)|
| classesPropName | string | 'classNames' | The name of the prop passed to the wrapped component with the generated classNames|

### <a name="style-props"></a>Styling based on props

The component's props are passed along with the theme when creating your styles. This allows you to specify inline styles based on the props passed in.

```js
export default themed((theme, props) => ({
    button: {
        color: theme.fontColor,
        width: props.size
    }
}))(Button);
```

You can pass a function called `shouldUpdateStyles` as an option to control when the HOC will re-create the stylesheets when its props change.

```js
const shouldUpdateStyles = (currProps, nextProps) => {
    return currProps.size !== nextProps.size;
};

export default themed((theme, props) => ({
    button: {
        color: theme.fontColor,
        width: props.size
    }
}), { shouldUpdateStyles })(Button);
```

If `pure` is `true` and no `shouldUpdateStyles` function is provided, `themed` will perform a shallow comparison on its props to determine whether or not the stylesheets should be re-created.

If `pure` is not set and `shouldUpdateStyles` is not provided, `themed` will always re-create stylesheets for this component when it updates.

## <a name="supported-interfaces"></a>Supported CSS-in-JS interfaces

- [AphroditeInterface](https://github.com/jtberglund/react-themable-hoc-aphrodite-interface)
- [JSSInterface](https://github.com/jtberglund/react-themable-hoc-jss-interface)

## License

[MIT](https://github.com/jtberglund/react-themable-hoc/blob/master/LICENSE)