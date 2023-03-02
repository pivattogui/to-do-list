export enum ButtonTheme {
    SOLID,
    WHITE,
    LIGHT,
    LIGHT_RED,
    BIGGER
}

export type ButtonType = {
    theme?: ButtonTheme,
    icon?: JSX.Element,
    text?: string,
    action?: (...args: any[]) => void
};
