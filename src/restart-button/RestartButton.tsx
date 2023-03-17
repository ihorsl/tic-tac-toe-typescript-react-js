/**
 *  This component renders and manages the reset button, which restarts the game
 *
 *  The author's homepage: https://ihorsl.com
 */

import React, { useContext } from 'react';
import { AppStateAction, RestartGameAction } from '../AppStateReducer';
import styles from './restart-button.module.scss';
import { themeContext } from '../theme-picker/ThemeProvider';


export type ResetButtonProps = {
    dispatchAppStateAction: React.Dispatch<AppStateAction>,
    className?: string
}

export default function RestartButton({dispatchAppStateAction, className}: ResetButtonProps)
{
    const theme = useContext(themeContext);

    let buttonClass = styles.restartButton + ' ';
    switch (theme) {
        case 'Light':
            buttonClass += styles.light;
            break;

        case 'Dark':
            buttonClass += styles.dark;
            break;
    }

    function restartHandler()
    {
        const action: RestartGameAction = {
            type: 'restartGame'
        }
        dispatchAppStateAction(action);
    }

    return (
        <div className={className}>
            <button onClick={restartHandler} className={buttonClass}>Restart</button>
        </div>
    )
}