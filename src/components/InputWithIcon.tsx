import { EnvelopeIcon } from '@heroicons/react/20/solid'
import {classNames} from "../utils/classNames.ts";

interface propsTypes {
    Icon: typeof EnvelopeIcon,
    placeholder: string,
    type: string,
    className?: string;
}

export default function InputWithIcon({Icon, placeholder, type, className}: propsTypes) {
    return (
        <div>
            <div className="relative rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type={type}
                    name={type}
                    id={type}
                    className={classNames("block w-96 rounded-md border-0 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 input-with-icon", className ? className : "")}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}