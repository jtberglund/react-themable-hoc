# react-themable-hoc

Higher-order-components for theming using css-in-js.

**Note: This is still early in development. The `react-themable-hoc` API is subject to change.**

```
npm install --save react-themable-hoc
```

## Usage

1. First setup `react-themable-hoc` by setting a css-in-js interface.

```js
import { AphroditeInterface, ThemeManager } from 'react-themable-hoc';

ThemeManager.setStyleInterface(AphroditeInterface);
```

2. Add themes

```js
ThemeManager.addTheme('theme1', { ... });
ThemeManager.addTheme('theme2', { ... });
```

3. Next, setup the `ThemeProvider`. This allows all components under the `ThemeProvider` to have access to the current theme.

```jsx
ReactDOM.render(
    <ThemeProvider theme="myTheme">
        <App />
    </ThemeProvider>,
    document.getElementById('app')
);
```

4. Now you can theme any component by wrapping it in `themed`

```jsx
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

### Styling based on props

The component's props are passed along with the theme when creating your styles. This allows you to specify inline styles based on the props passed in.

```js
export default themed((theme, props) => ({
    button: {
        color: theme.fontColor,
        width: props.size
    }
}))(Button);
```

### Options

You can pass options to the `themed` HOC.

```js
export default themed(theme => ({
    button: { ... }
}))(Button, { pure: true });
```

## Supported CSS-in-JS libraries

- [Aphrodite](https://github.com/Khan/aphrodite)

## License

[MIT](https://github.com/jtberglund/react-themable-hoc/blob/master/LICENSE)