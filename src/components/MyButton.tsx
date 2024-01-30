import React from 'react'

type Props = {
    children: React.JSX.Element | string,
    onClick?: (() => void)
}

const MyButton = ({children, onClick}: Props) => {
    return (
        <button
            className="text-white self-start bg-blue-600 transition-colors hover:bg-blue-700 px-5 py-2 rounded btn-show-more"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default MyButton;