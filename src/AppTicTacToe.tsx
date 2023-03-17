/**
 *  The "Tic-Tac-Toe" game, created with TypeScript/React.js
 *
 *  The author's homepage: https://ihorsl.com
 */

import React, { useState, useReducer } from 'react';

import ThemeProvider from './theme-picker/ThemeProvider';
import ThemePicker, { Themes } from './theme-picker/ThemePicker';
import PlayerPicker, { Players } from './player-picker/PlayerPicker';
import RestartButton from './restart-button/RestartButton';
import Cell from './cell/Cell';
import {
    SetPlayerAction,
    getAppInitialState,
    appStateReducer
} from './AppStateReducer';

import styles from './app.module.scss';

function AppTicTacToe()
{

    /* The "theme" state is used together with the context provider,
       to supply each component with the current theme value  */
    const [ theme, setTheme ] = useState<Themes>('Light');

    /* The appState object contains the complete state of the game.
       See more information about it is in AppStateReducer.tsx */
    const [ appState, dispatchAppStateAction ] = useReducer(appStateReducer, getAppInitialState());

    let appClassName = styles.app;
    switch (theme) {
        case 'Light':
            appClassName += ' ' + styles.appThemeLight;
            break;

        case 'Dark':
            appClassName += ' ' + styles.appThemeDark;
            break;
    }

    /**
     * This function handles the onChange event for the Player picker select.
     * And generates the setPlayer action for the AppTicTacToe main state reducer
     * @param newPlayer
     */
    function setPlayerHandler(newPlayer: Players) {
        const action: SetPlayerAction = {
            type: 'setPlayer',
            currentPlayer: newPlayer
        }
        dispatchAppStateAction(action);
    }

    return (
        <div className={appClassName}>
            <ThemeProvider theme={theme}>
                <div className={styles.headerControls}>
                    <ThemePicker setTheme={setTheme} className={styles.themePicker}/>
                    <PlayerPicker player={appState.currentPlayer} setPlayer={setPlayerHandler} className={styles.playerPicker}/>
                </div>
                <div className={styles.cellsWrapper}>
                    {
                        // Render the cells
                        appState.cells.map((cellState, id) =>
                        {
                            return <Cell key={id} className={styles.cellInGrid} id={id} symbol={cellState.symbol}
                                         cross={cellState.cross}
                                         dispatchAppSateAction={dispatchAppStateAction}/>;
                        })
                    }
                </div>
                <RestartButton className={styles.restartButtonWrapper} dispatchAppStateAction={dispatchAppStateAction}/>
            </ThemeProvider>
        </div>
    );
}

export default AppTicTacToe;
