/**
 * This component is the wrapper to provide the theme context to the descendant components.
 *
 * The author's homepage: https://ihorsl.com
 */

import { createContext, ReactNode } from 'react';
import { Themes } from './ThemePicker';

export const themeContext = createContext<Themes>('Light');

export type ThemeContextProviderProps = {
    theme: Themes,
    children: ReactNode
}

export default function ThemeContextProvider({ theme, children }: ThemeContextProviderProps)
{
    return (
        <themeContext.Provider value={theme}>{children}</themeContext.Provider>
    );
}