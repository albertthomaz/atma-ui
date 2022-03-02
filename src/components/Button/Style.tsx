import { ButtonProps } from './Button'

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: 300,
        height: 300,
        margin: '50px auto',
        backgroundColor: 'orange',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    }
}

type StateInterface = {
    default: string
    hover: string
    active: string
    focus: string
}

const theme: { [key: string]: StateInterface | any } = {
    borderColor: {
        default: 'black',
        hover: 'red',
        active: 'blue',
        focus: 'blue'
    },
    color: {
        default: 'black',
        hover: 'white',
        active: 'white',
        focus: 'blue'
    },
    backgroundColor: {
        default: 'white',
        hover: 'red',
        active: 'navy',
        focus: 'white'
    },
    getColor(prop: string, { hover, focus, active }: any): StateInterface {
        const v = this[prop]
        if (active) return v['active']
        if (focus && !hover) return v['focus']
        if (hover) return v['hover']
        return v['default']
    }
}

export function getButtonStyle(state: any, props: ButtonProps) {
    return {
        outline: 'none',
        userSelect: 'none',
        textAlign: 'center',
        borderRadius: '8px',
        border: '1px solid',
        padding: '8px 12px',
        cursor: 'pointer',
        transition: '0.3s all',
        borderColor: theme.getColor('borderColor', state),
        color: theme.getColor('color', state),
        backgroundColor: theme.getColor('backgroundColor', state),
        width: '200px'
    }
}
