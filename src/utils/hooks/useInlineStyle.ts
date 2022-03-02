import { useEffect, useMemo, useReducer, useRef } from 'react'

const initialState = {
    hover: false,
    focus: false,
    active: false
}

export function useInlineStyle(styleFn: any, props: any) {
    const ref = useRef(null)
    const [styleState, dispatch] = useReducer(reducer, initialState)
    const setStyle = (type: string, value: boolean) => dispatch({ type, value })
    const style = useMemo(
        () => styleFn(styleState, props),
        [styleFn, styleState, props]
    )
    useEffect(() => {
        let el: EventTarget
        const pointerOver = () => setStyle('hover', true)
        const pointerOut = () => setStyle('hover', false)
        const focus = () => setStyle('focus', true)
        const blur = () => setStyle('focus', false)
        const pointerDown = () => setStyle('active', true)
        const pointerUp = () => setStyle('active', false)
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
    }, [ref, setStyle])
    return [ref, style]
}

function reducer(state: any, action: any) {
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
