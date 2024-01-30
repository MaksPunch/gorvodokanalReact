interface PropTypes {
    name: string;
    type: string;
    label: string;
    value?: string;
    onChangeHandle?: (() => void);
    className?: string
}

const MyInput = ({name, type, label, value, onChangeHandle, className}: PropTypes) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="text-sm font-medium leading-6 text-gray-900 block">
                {label}
            </label>
            <div className="mt-2 flex flex-col gap-1">
                <input
                    id={name}
                    name={name}
                    type={type}
                    autoComplete={name}
                    required
                    value={value}
                    onChange={onChangeHandle}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
};

export default MyInput;