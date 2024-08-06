import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'white',
    className = '',
    ...props
}) {
    return (
        <button className={`${className} ${textColor} ${bgColor}`} {...props}>
            {children}
        </button>
    )
}

export default Button