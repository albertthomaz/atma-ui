import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import { ButtonProps } from '../../components/Button/Button'

enum ActionKind {
    ACTIVE = 'active',
    FOCUS = 'focus',
    HOVER = 'hover'
}

interface Action {
    type: ActionKind
    value: boolean
}

export interface StateCSS {
    hover: boolean
    focus: boolean
    active: boolean
}

type Props = ButtonProps

const initialState: StateCSS = {
    hover: false,
    focus: false,
    active: false
}

type StyleFn = (stateCSS: StateCSS, props?: Props) => React.CSSProperties

export function useInlineStyle(styleFn: StyleFn, props?: Props) {
    const ref = useRef(null)
    const [styleState, dispatch] = useReducer(reducer, initialState)
    const setAction = (type: ActionKind, value: boolean) =>
        dispatch({ type, value })
    const style = useMemo(
        () => styleFn(styleState, props),
        [styleFn, styleState, props]
    )
    useEffect(() => {
        let el: EventTarget
        const pointerOver = () => setAction(ActionKind.HOVER, true)
        const pointerOut = () => setAction(ActionKind.HOVER, false)
        const focus = () => setAction(ActionKind.FOCUS, true)
        const blur = () => setAction(ActionKind.FOCUS, false)
        const pointerDown = () => setAction(ActionKind.ACTIVE, true)
        const pointerUp = () => setAction(ActionKind.ACTIVE, false)
        if (ref.current) {
            el = ref.current
            el.addEventListener('pointerover', pointerOver)
            el.addEventListener('pointerout', pointerOut)
            el.addEventListener('focus', focus)
            el.addEventListener('blur', blur)
            el.addEventListener('pointerdown', pointerDown)
            el.addEventListener('pointerup', pointerUp)
        }
        return () => {
            el.removeEventListener('pointerover', pointerOver)
            el.removeEventListener('pointerout', pointerOut)
            el.removeEventListener('focus', focus)
            el.removeEventListener('blur', blur)
            el.removeEventListener('pointerdown', pointerDown)
            el.removeEventListener('pointerup', pointerUp)
        }
    }, [ref, setAction])
    return [ref, style] as const
}

function reducer(state: StateCSS, action: Action) {
    switch (action.type) {
        case 'hover':
            return { ...state, hover: action.value }
        case 'focus':
            return { ...state, focus: action.value }
        case 'active':
            return { ...state, active: action.value }
        default:
            return state
    }
}
