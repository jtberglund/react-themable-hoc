import * as React from 'react';

declare module 'react-themable-hoc' {

    //
    // ThemeProvider
    // ----------------------------------------------------------------------

    export interface StyleInterface {
        // TODO
        css: (styles?: any) => ({} | undefined);
    }

    interface ThemeProviderProps {
        theme: string;
    }

    export class ThemeProvider extends React.Component<ThemeProviderProps, {}> {}

    //
    // ThemeManager
    // ----------------------------------------------------------------------

    type Theme = any;

    interface ThemeStyles {
        [key: string]: React.CSSProperties;
    }

    export class ThemeManager {
        setStyleInterface: (styleInterface: StyleInterface) => void;

        addTheme: (themeName: string, themeStyles: Theme) => void;

        getTheme: (themeName: string) => Theme | undefined;

        css: (styles: ThemeStyles) => any;
    }

    //
    // AphroditeInterface
    // ----------------------------------------------------------------------

    type Aphrodite = any; // TODO
    export function AphroditeInterface(aphrodite?: Aphrodite): StyleInterface;


    //
    // themed (HOC)
    // ----------------------------------------------------------------------

    type StylesThunk<P> = (theme: Theme, props: P) => ThemeStyles;

    export interface ThemableOptions {
        pure: boolean;
        innerRef: (el: any) => void;
    }

    export default function themed<Props = {}, ThemeProps = {}>(
        createStyles: StylesThunk<Props> | {},
        options?: Partial<ThemableOptions>):
        (WrappedComponent: React.ComponentType<Props & ThemeProps>) => React.ComponentType<Props>;
}