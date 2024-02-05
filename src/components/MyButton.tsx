import React from 'react'

type Props = {
    children: React.JSX.Element | string,
    onClick?: (() => void),
    className?: string
}

const MyButton = ({children, onClick, className}: Props) => {
    return (
        <button
            className={"text-white self-start bg-blue-600 transition-colors hover:bg-blue-700 px-5 py-2 rounded btn-show-more " + className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default MyButton;