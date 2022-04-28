import React from 'react'

import { createPortal } from 'react-dom'

import classes from './Modal.module.css'

const Backdrop = props => {
    return (
        <div
            className={classes.backdrop}
            onClick={props.onToggleCart}
        />
    )
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById('overlays')

export default function Modal(props) {
    return (
        <React.Fragment>
            {createPortal(<Backdrop onToggleCart={props.onToggleCart} />, portalElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </React.Fragment>
    )
}