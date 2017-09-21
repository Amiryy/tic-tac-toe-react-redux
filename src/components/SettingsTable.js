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
                    <hr className='hr_settings' />
                </td>
            </tr>
            <tr>
                <td>
                    Mode:
                </td>
                <td className='value'>
                    <button onClick={()=> props.setMode('normal' , null)}
                            className={(props.mode === 'normal') ? 'selected' : ''}>
                        Normal
                    </button> /
                    <button onClick={() => props.setMode('timed' , 3)}
                            className={(props.mode === 'timed') ? 'selected' : ''}>
                        Timed
                    </button>
                    <hr className='hr_settings' />
                </td>
            </tr>
            <tr className={(props.mode === 'timed') ? 'shown' : 'hidden'}>
                <td>
                    Pace:
                </td>
                <td className='value'>
                    <button onClick={()=>
                        props.setPace((props.pace===2) ?
                            (props.pace) : (props.pace - 1)) }
                            className='set_pace'>
                        -
                    </button>
                    {props.pace} sec
                    <button onClick={()=>
                        props.setPace((props.pace===5) ?
                            (props.pace) : (props.pace + 1)) }
                            className='set_pace'>
                        +
                    </button>
                    <hr className='hr_settings' />
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
                    <hr className='hr_settings' />
                </td>
            </tr>
            <tr className={(props.versus === 'A') ? 'shown' : 'hidden'}>
                <td>
                    Difficulty:
                </td>
                <td className='value'>
                    <button onClick={()=> props.setDiff('easy')}
                            className={(props.difficulty === 'easy') ? 'selected' : ''}>
                        Easy
                    </button> /
                    <button onClick={() => props.setDiff('novice')}
                            className={(props.difficulty === 'novice') ? 'selected' : ''}>
                        Novice
                    </button> /
                    <button onClick={() => props.setDiff('expert')}
                            className={(props.difficulty === 'expert') ? 'selected' : ''}>
                        Expert
                    </button>
                    <hr className='hr_settings' />
                </td>
            </tr>
            <tr className={(props.versus === 'A') ? 'shown' : 'hidden'}>
                <td>
                    Play as:
                </td>
                <td className='value'>
                    <button onClick={()=> props.setStarter(true)}
                            className={ props.playerStarts ? 'selected' : '' }>
                        X - Play 1st
                    </button> /
                    <button onClick={() => props.setStarter(false)}
                            className={ props.playerStarts ? '' : 'selected' }>
                        O - Play 2nd
                    </button>
                    <hr className='hr_settings' />
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default SettingsTable;
