import {ReactNode} from 'react'

type Props = {
    children: ReactNode
}

const MyButton = ({children}: Props) => {
    return (
        <button className="text-white self-start bg-blue-600 transition-colors hover:bg-blue-700 px-5 py-2 rounded btn-show-more">{children}</button>
    );
};

export default MyButton;