import React from 'react';

const SettingsTable = (props) => {
    return (
        <table>
            <tbody>
            <tr>
                <td>
                    Grid:
                </td>
                <td className="value">
                    <button onClick={() => props.setGrid(9)}
                            className={(props.grid === 9) ? 'selected' : ''}>
                        3x3
                    </button> /
                    <button onClick={() => props.setGrid(16)}
                            className={(props.grid === 16) ? 'selected' : ''}>
                        4x4
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    Vs.
                </td>
                <td className="value">
                    <button onClick={() => props.setVs('P')}
                            className={(props.versus === 'P') ? 'selected' : ''}>
                        Player
                    </button> /
                    <button onClick={() => props.setVs('A')}
                            className={(props.versus === 'A') ? 'selected' : ''}>
                        AI
                    </button>
                </td>
            </tr>
            <tr className={(props.versus === 'A') ? 'shown' : 'hidden'}>
                <td>
                    Difficulty:
                </td>
                <td className={(props.versus === 'A') ? 'value' : 'value_hidden'}>
                    <button onClick={()=> props.setDiff('easy')}
                            className={(props.difficulty === 'easy') ? 'selected' : ''}>
                        Easy
                    </button> /
                    <button onClick={() => props.setDiff('medium')}
                            className={(props.difficulty === 'medium') ? 'selected' : ''}>
                        Medium
                    </button> /
                    <button onClick={() => props.setDiff('hard')}
                            className={(props.difficulty === 'hard') ? 'selected' : ''}>
                        Hard
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default SettingsTable;
