/**
 *   This file contains main logic of the game. It handles cell clicks, cell crossing, player change and game restart.
 *   The appState object contains the complete state of the game: cells state, current player, gameFinished flag.
 *   The appStateReducer implements the appState object.
 *   The appStateReducer handles three action types: setPlayer, cellClick, restartGame
 *
 *   The author's homepage: https://ihorsl.com
 */

import { CellCross, CellSymbol } from './cell/Cell';
import { Players } from './player-picker/PlayerPicker';

export const ROW_SIZE = 3;
export const CELLS_COUNT = ROW_SIZE * ROW_SIZE;

export type CellState = {
    symbol: CellSymbol,
    cross: CellCross
}

export type AppState = {
    cells: CellState[],
    currentPlayer: Players,
    gameFinished: boolean
}

export type SetPlayerAction = {
    type: 'setPlayer',
    currentPlayer: Players
}

export type CellClickAction = {
    type: 'cellClick',
    cellId: number
}

export type RestartGameAction = {
    type: 'restartGame'
}

export type AppStateAction = SetPlayerAction | CellClickAction | RestartGameAction;

export function appStateReducer(appState: AppState, action: AppStateAction)
{
    switch (action.type) {
        case 'setPlayer':
            appState = cloneState(appState);
            appState.currentPlayer = action.currentPlayer;
            break;

        case 'cellClick':
            const { cellId } = action;
            if (
                !appState.cells[cellId].symbol
                && !appState.gameFinished
            ) {
                appState = cloneState(appState);
                processCellClick(appState, cellId);
                processGameFinish(appState);
            }
            break;

        case 'restartGame':
            appState = getAppInitialState();
            break;
    }

    return appState;
}

export function getAppInitialState()
{
    const appInitialState: AppState = {
        cells: [],
        currentPlayer: 'X',
        gameFinished: false
    };

    for (let i = 0; i < CELLS_COUNT; i++) {
        appInitialState.cells[i] = {
            symbol: '',
            cross: ''
        };
    }

    return appInitialState;
}

function cloneState(appState: AppState): AppState
{
    // Emulation of structuredClone
    return JSON.parse(JSON.stringify(appState));
}

function switchPlayer(currentPlayer: Players)
{
    if (currentPlayer === 'X') {
        return 'O';
    } else {
        return 'X';
    }
}

function processCellClick(appState: AppState, cellId: number)
{
    appState.cells[cellId].symbol = appState.currentPlayer;
    appState.currentPlayer = switchPlayer(appState.currentPlayer);
    return appState;
}

type SumCellSymbols = {
    x: number,
    o: number
}

function processGameFinish(appState: AppState)
{
    // ---  Check rows

    for (let rowId = 0; rowId < ROW_SIZE; rowId++) {

        const sumCellSymbols: SumCellSymbols = {
            x: 0,
            o: 0
        };

        for (let columnId = 0; columnId < ROW_SIZE; columnId++) {
            const symbol = getCellSymbol(rowId, columnId);
            countCellSymbols(sumCellSymbols, symbol);
        }

        if (sumCellSymbols.x === ROW_SIZE || sumCellSymbols.o === ROW_SIZE) {
            appState.gameFinished = true;

            for (let columnId = 0; columnId < ROW_SIZE; columnId++) {
                setCellCross(rowId, columnId, '-');
            }

            console.log(appState);
            return;
        }
    }

    // ---  Check columns

    for (let columnId = 0; columnId < ROW_SIZE; columnId++) {

        const sumCellSymbols: SumCellSymbols = {
            x: 0,
            o: 0
        };

        for (let rowId = 0; rowId < ROW_SIZE; rowId++) {
            const symbol = getCellSymbol(rowId, columnId);
            countCellSymbols(sumCellSymbols, symbol);
        }

        if (sumCellSymbols.x === ROW_SIZE || sumCellSymbols.o === ROW_SIZE) {
            appState.gameFinished = true;

            for (let rowId = 0; rowId < ROW_SIZE; rowId++) {
                setCellCross(rowId, columnId, '|');
            }

            console.log(appState);
            return;
        }
    }

    // ---  Top left to bottom right

    let sumCellSymbols: SumCellSymbols = {
        x: 0,
        o: 0
    };

    for (let columnId = 0; columnId < ROW_SIZE; columnId++) {
        const symbol = getCellSymbol(columnId, columnId);
        countCellSymbols(sumCellSymbols, symbol);
    }

    if (sumCellSymbols.x === ROW_SIZE || sumCellSymbols.o === ROW_SIZE) {
        appState.gameFinished = true;

        for (let columnId = 0; columnId < ROW_SIZE; columnId++) {
            setCellCross(columnId, columnId, '\\');
        }

        console.log(appState);
        return;
    }

    // ---  Bottom left to top right

    sumCellSymbols = {
        x: 0,
        o: 0
    };

    for (let columnId = 0; columnId < ROW_SIZE; columnId++) {
        const rowId = ROW_SIZE - columnId - 1;
        const symbol = getCellSymbol(rowId, columnId);
        countCellSymbols(sumCellSymbols, symbol);
    }

    if (sumCellSymbols.x === ROW_SIZE || sumCellSymbols.o === ROW_SIZE) {
        appState.gameFinished = true;

        for (let columnId = 0; columnId < ROW_SIZE; columnId++) {
            const rowId = ROW_SIZE - columnId - 1;
            setCellCross(rowId, columnId, '/');
        }

        console.log(appState);
        return;
    }

    // ---

    function getCellSymbol(rowId: number, columnId: number): CellSymbol
    {
        const cellId = rowId * ROW_SIZE + columnId;
        return appState.cells[cellId].symbol;
    }

    function countCellSymbols(sumCellSymbols: SumCellSymbols, symbol: CellSymbol)
    {
        switch (symbol) {
            case 'X':
                sumCellSymbols.x++;
                break;

            case 'O':
                sumCellSymbols.o++;
                break;
        }
    }

    function setCellCross(rowId: number, columnId: number, cross: CellCross)
    {
        const cellId = rowId * ROW_SIZE + columnId;
        appState.cells[cellId].cross = cross;
    }
}