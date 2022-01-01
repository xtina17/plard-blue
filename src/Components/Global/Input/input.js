import React from 'react';
import style from "./input.module.css"

const Input = ({cn,...props}) => {
    return (
            <label>
                <input
                    className={style[cn]}
                    {...props}
                />
            </label>
    );
};

export default Input;
