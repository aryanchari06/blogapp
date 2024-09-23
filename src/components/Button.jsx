import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor,
    textColor,
    className = '',
    ...props
}) {
    return (
        <div className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>{children}</div>
    )
}

export default Button