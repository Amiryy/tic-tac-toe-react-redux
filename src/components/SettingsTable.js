import React from 'react';
import Setting from './Setting';

const SettingsTable = ({ settings }) => {
    return (
        <table>
            <tbody>
            <Setting name='Theme'
                     options={{
                         light : 'Light',
                         dark : 'Dark'
                     }}
                     initialValue={settings.theme}
                     setValue={settings.setTheme} />

            <Setting name='Grid'
                     options={{
                         9 : '3x3',
                         16 : '4x4'
                     }}
                     initialValue={settings.grid}
                     setValue={settings.setGrid} />

            <Setting name='Mode'
                     options={{
                         normal : 'Normal',
                         timed : 'Timed'
                     }}
                     initialValue={settings.mode}
                     setValue={settings.setMode}
                     param={3} />

            <Setting name='Pace'
                     type='counter'
                     boundaries={[2, 5]}
                     initialValue={settings.pace}
                     setValue={settings.setPace}
                     condition={settings.mode === 'timed'}/>

            <Setting name='Versus'
                     options={{P : 'Player', A : 'AI'}}
                     initialValue={settings.versus}
                     setValue={settings.setVs} />

            <Setting name='Difficulty'
                     options={{
                         easy : 'Easy',
                         novice : 'Novice',
                         expert : 'Expert'
                     }}
                     initialValue={settings.difficulty}
                     setValue={settings.setDiff}
                     condition={settings.versus === 'A'} />

            <Setting name='Play as'
                     type='boolean'
                     options={['X - Play 1st', 'O - Play 2nd']}
                     initialValue={settings.playerStarts}
                     setValue={settings.setStarter}
                     condition={settings.versus === 'A'} />
            </tbody>
        </table>
    );
};

export default SettingsTable;
