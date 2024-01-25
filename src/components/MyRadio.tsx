const MyRadio = ({label, value, name}: {label: string, value: number, name: string}) => {
    return (
            <div key={value} className="flex items-center">
                <input
                    id={value.toString()}
                    name={name}
                    type='radio'
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600 checked:border-0"
                />
                <label htmlFor={value.toString()} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            </div>
    );
};

export default MyRadio;