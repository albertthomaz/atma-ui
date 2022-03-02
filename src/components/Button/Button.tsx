import React from 'react'
import { useInlineStyle } from '../../utils/hooks/useInlineStyle'
import { getButtonStyle } from './Style'

export type ButtonProps = {
    label: string
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    const [buttonRef, buttonStyle] = useInlineStyle(getButtonStyle, props)

    return (
        <button ref={buttonRef} style={buttonStyle}>
            {props.label}
        </button>
    )
}
export default Button
