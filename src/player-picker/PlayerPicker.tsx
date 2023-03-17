/**
 * The PlayerPicker React component extends the generic Picker component.
 * It shows pre-defined options to pick the current player in the game: the X player or the O player
 *
 * The author's homepage: https://ihorsl.com
 */

import React from 'react';

import Picker from '../picker/Picker';

export type Players = 'X' | 'O';
export const players: Players[] = [ 'X', 'O' ];

export type PlayerPickerProps = {
    player: Players,
    setPlayer: (newPlayer: Players) => void,
    className?: string
}

export default function PlayerPicker({ player, setPlayer, className }: PlayerPickerProps)
{
    return (
        <Picker<Players> label="Player" options={players} value={player} onChange={setPlayer} className={className} />
    );
}