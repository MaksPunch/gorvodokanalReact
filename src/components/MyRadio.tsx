const MyRadio = ({label, value, name, selectAnswer, selected, id}: {
    label: string;
    value: (number | string);
    name: string;
    selectAnswer: (value: (number | string)) => void;
    selected: boolean;
    id: string;
}) => {
    return (
        <div key={value} className="flex items-center">
            <input
                name={name}
                type="radio"
                value={value}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600 checked:border-0"
                onChange={() => selectAnswer(value)}
                defaultChecked={selected}
                id={id}
            />
            <label
                htmlFor={id}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
        </div>
    );
};

export default MyRadio;
