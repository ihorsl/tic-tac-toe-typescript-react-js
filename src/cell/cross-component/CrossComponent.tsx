/**
 * This component generates SVG graphics to show cross lines over the cells.
 *
 * The author's homepage: https://ihorsl.com
 */

import React, { useContext } from 'react';
import { CellCross, CellSymbol } from '../Cell';
import { themeContext } from '../../theme-picker/ThemeProvider';
import styles from './cross-component.module.scss';

export type CrossComponentProps = {
    symbol: CellSymbol,
    cross: CellCross,
    className?: string
}

export default function CrossComponent({ symbol, cross, className }: CrossComponentProps)
{
    const theme = useContext(themeContext);

    if (!cross) {
        return <></>;
    }

    if (!className) {
        className = '';
    }
    className += ' ' + styles.cross;

    let x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0;

    switch (cross) {
        case '|':
            x1 = 50;
            y1 = 0;
            x2 = 50;
            y2 = 100;
            break;

        case '-':
            x1 = 0;
            y1 = 50;
            x2 = 100;
            y2 = 50;
            break;

        case '/':
            x1 = 0;
            y1 = 100;
            x2 = 100;
            y2 = 0;

            break;

        case '\\':
            x1 = 0;
            y1 = 0;
            x2 = 100;
            y2 = 100;
            break;
    }

    let lineClass = styles.line + ' ';
    if (symbol === 'X' && theme === 'Light') {
        lineClass += styles.lineXLight;
    } else if (symbol === 'X' && theme === 'Dark') {
        lineClass += styles.lineXDark;
    } else if (symbol === 'O' && theme === 'Light') {
        lineClass += styles.lineOLight;
    } else if (symbol === 'O' && theme === 'Dark') {
        lineClass += styles.lineODark;
    }

    return (
        <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line className={lineClass} x1={x1} y1={y1} x2={x2} y2={y2}/>
        </svg>
    );
}