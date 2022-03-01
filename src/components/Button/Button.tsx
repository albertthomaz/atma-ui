import React from 'react';

type ButtonProps = {
    label: string;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    
    return <button>{props.label}</button>
}
export default Button;