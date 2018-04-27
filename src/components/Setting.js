import React from 'react';

// Reusable Setting component that renders a Settings option based on a set of props.

// Types of Settings: 'selection', 'boolean' and 'counter'. default type='selection'.

/* When type is 'selection' props.options must be provided as an object { key : 'optionName' }
       key is the value that be passed to setValue() and 'optionName' is the Name that we present to the user.
       Example: options={{ easy : 'Easy', novice : 'Novice', expert : 'Expert'}} */

/* When type is 'boolean' simply provide an array of 2 options to props.options
       the first element will be treated as true and the second as false.
       Example: options={['X - Play 1st', 'O - Play 2nd']} */

// props.param = an optional additional parameter to pass to setValue(option, param);
// if props.condition is passed, the component will be shown only when its true (configure '.hidden' & '.shown' in css).
// props.boundaries = an optional prop that sets limitation of 'counter' settings. default boundaries = [0, 10].

const Setting = (props) => {
    const { name, initialValue, setValue, boundaries, param, condition, type } = props;
    const hasCondition = condition === undefined ? true : condition;
    const hasType = type === undefined ? 'selection' : type;

    if (hasType === 'selection') {
        const options = Object.keys(props.options).map(key => {
            let option = key;
            if (!isNaN(key)){
                option = Number(key)
            }
            return (
                <button key={option}
                        onClick={() => setValue(option, param)}
                        className={initialValue === option ? 'selected' : ''}>
                    {props.options[option]}
                </button>
            )
        });
        return (
            <tr className={hasCondition ? 'shown' : 'hidden'}>
                <td>
                    {name}:
                </td>
                <td className='setting_value'>
                    {options}
                    <hr className='hr_settings' />
                </td>
            </tr>
        )
    }

    if(hasType === 'boolean') {
        return (
            <tr className={hasCondition ? 'shown' : 'hidden'}>
                <td>
                    {name}:
                </td>
                <td className='setting_value'>
                    <button onClick={()=> setValue(true)}
                            className={ initialValue ? 'selected' : '' }>
                        {props.options[0]}
                    </button> /
                    <button onClick={() => setValue(false)}
                            className={ initialValue ? '' : 'selected' }>
                        {props.options[1]}
                    </button>
                    <hr className='hr_settings' />
                </td>
            </tr>
        )
    }

    if (hasType === 'counter') {
        const hasBoundaries = boundaries === undefined ? [0, 10] : boundaries;
        return (
            <tr className={hasCondition ? 'shown' : 'hidden'}>
                <td>
                    {name}:
                </td>
                <td className='setting_value'>
                    <button onClick={() => setValue(initialValue - 1) }
                            className={initialValue <= hasBoundaries[0] ?
                                'set_pace hidden' : 'set_pace'}>
                        -
                    </button>
                    {initialValue} sec
                    <button onClick={() => setValue(initialValue + 1) }
                            className={initialValue >= hasBoundaries[1] ?
                                'set_pace hidden' : 'set_pace'}>
                        +
                    </button>
                    <hr className='hr_settings' />
                </td>
            </tr>
        )
    }
};

export default Setting;