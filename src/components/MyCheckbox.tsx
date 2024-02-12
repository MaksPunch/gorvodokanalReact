const MyCheckbox = ({label, value, name, selectAnswer, selected, id}: {
    label: string;
    value: (number | string);
    name: string;
    selectAnswer: (value: (number | string), type: string) => void;
    selected: boolean;
    id: string;
}) => {
    return (
        <div className="flex items-center gap-2.5">
            <input
                type="checkbox"
                id={"answer_" + id}
                name={name}
                value={value}
                onChange={() => selectAnswer(id, "checkbox")}
                checked={selected}
                className="rounded"
            />
            <label htmlFor={"answer_" + id} className="w-full">{label}</label>
        </div>
    );
};

export default MyCheckbox;