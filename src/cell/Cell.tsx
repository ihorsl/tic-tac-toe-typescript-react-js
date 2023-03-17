/**
 * This is the React component to show the game cells.
 * It renders the border of the cell and invokes two additional subcomponents
 * SymbolComponent and CrossComponent, which render the symbol and the cross line of the cell.
 *
 * The author's homepage: https://ihorsl.com
 */

import React, { useContext } from 'react';
import { AppStateAction, CellClickAction } from '../AppStateReducer';
import { themeContext } from '../theme-picker/ThemeProvider';
import CrossComponent from './cross-component/CrossComponent';
import styles from './cell.module.scss';
import SymbolComponent from './symbol-component/SymbolComponent';

export type CellSymbol = '' | 'X' | 'O';
export type CellCross = '' | '|' | '-' | '/' | '\\';

export type CellProps = {
    id: number,
    symbol: CellSymbol,
    cross: CellCross
    dispatchAppSateAction: React.Dispatch<AppStateAction>,
    className?: string
}

export default function Cell({ id, symbol, cross, dispatchAppSateAction, className }: CellProps)
{
    const theme = useContext(themeContext);

    let symbolClasses = styles.cell;
    if (className) {
        symbolClasses += ' ' + className;
    }

    switch (theme) {
        case 'Light':
            symbolClasses += ' ' + styles.cellLight;
            break;

        case 'Dark':
            symbolClasses += ' ' + styles.cellDark;
            break;
    }

    function onClickHandler()
    {
        const action: CellClickAction = {
            type: 'cellClick',
            cellId: id
        };

        dispatchAppSateAction(action);
    }

    return (
        <div className={symbolClasses} onClick={onClickHandler}>
            <SymbolComponent symbol={symbol} />
            <CrossComponent symbol={symbol} cross={cross}/>
        </div>
    );
}