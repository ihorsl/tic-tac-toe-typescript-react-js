/**
 * In file contains the Generic React component, which implements HTML select/option picker.
 * It can render numeric and string options and handle onChange events. Supported props are:
 * label - the text near the picker
 * options - the list of options to pick from
 * value - the current value
 * onChange - the change event handler
 * className - additions CSS classes for the component wrapper
 *
 * The author's homepage: https://ihorsl.com
 */

import React, { useContext } from 'react';
import { themeContext } from '../theme-picker/ThemeProvider';
import styles from './picker.module.scss';

export type PickerProps<U> = {
    label: string,
    options: U[];
    value: U,
    onChange: (newValue: U) => void,
    className?: string
}

export default function Picker<T extends string | number>({
    label,
    options,
    value,
    onChange,
    className
}: PickerProps<T>)
{
    const theme = useContext(themeContext);

    let divClassName = styles.div;
    if (className) {
        divClassName = className + ' ' + divClassName;
    }

    let selectClassName = styles.select;

    switch (theme) {
        case 'Light':
            divClassName += ' ' + styles.divLight;
            selectClassName += ' ' + styles.divLight + ' ' + styles.selectLight;
            break;

        case 'Dark':
            divClassName += ' ' + styles.divDark;
            selectClassName += ' ' + styles.divDark + ' ' + styles.selectDark;
            break;
    }

    function isValueType(value: any): value is T
    {
        return options.includes(value);
    }

    function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>)
    {
        if (isValueType(event.target.value)) {
            onChange(event.target.value);
        }
    }

    return (
        <div className={divClassName}>
            {label && <span>{label}:&nbsp;</span>}
            <select className={selectClassName} value={value} onChange={onSelectChange}>
                {
                    options.map((opt) =>
                    {
                        return <option key={opt}>{opt}</option>;
                    })
                }
            </select>
        </div>
    );
}

