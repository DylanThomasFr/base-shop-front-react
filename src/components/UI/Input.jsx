import { forwardRef } from 'react'

import classes from './Input.module.css'

export default forwardRef(function Input(props, ref) {
    return (
        <div className={props.className ?? classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    )
})