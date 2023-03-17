/**
 * The ThemePicker React component extends the generic Picker component.
 * It shows pre-defined options to pick the game theme: Dark or Light
 *
 * The author's homepage: https://ihorsl.com
 */

import React, { useContext } from 'react';

import Picker from '../picker/Picker';
import { themeContext } from './ThemeProvider';

export const themes: Themes[] = [ 'Light', 'Dark' ];
export type Themes = 'Light' | 'Dark';

export type ThemePickerProps = {
    setTheme: (newTheme: Themes) => void,
    className?: string
}

export default function ThemePicker({ setTheme, className }: ThemePickerProps)
{
    const theme = useContext(themeContext);

    return (
        <Picker<Themes> label='Theme' options={themes} value={theme} onChange={setTheme} className={className}/>
    )
}