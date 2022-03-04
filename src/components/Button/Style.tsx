import { ButtonProps } from './Button'
import { StateCSS } from '../../utils/hooks/useInlineStyle'

export function getButtonStyle(
    { hover, active }: StateCSS,
    props?: ButtonProps
): React.CSSProperties {
    const button: React.CSSProperties = {
        outline: 'none',
        userSelect: 'none',
        textAlign: 'center',
        borderRadius: '8px',
        border: '1px solid',
        padding: '8px 12px',
        cursor: 'pointer',
        transition: '0.3s all',
        borderColor: 'red',
        color: 'white',
        backgroundColor: 'red',
        width: 200
    }
    if (props?.label === 'test') {
        button.fontSize = 50
        button.cursor = 'help'
    }

    if (active) {
        button.fontSize = 23
    } else if (hover) {
        button.opacity = 0.4
    }

    return button
}
