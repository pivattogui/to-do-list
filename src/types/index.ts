export enum ButtonTheme {
    SOLID,
    WHITE,
    LIGHT_RED,
}

export type ButtonType = {
    theme?: ButtonTheme,
    icon?: JSX.Element,
    text?: string,
    action?: (...args: any[]) => void
};
