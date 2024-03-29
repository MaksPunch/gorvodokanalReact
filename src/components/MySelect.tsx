import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {classNames} from "../utils/classNames.ts";
import {Link} from "react-router-dom";

const people = [
    {id: 1, name: 'Wade Cooper'},
    {id: 2, name: 'Arlene Mccoy'},
    {id: 3, name: 'Devon Webb'},
    {id: 4, name: 'Tom Cook'},
    {id: 5, name: 'Tanya Fox'},
    {id: 6, name: 'Hellen Schmidt'},
    {id: 7, name: 'Caroline Schultz'},
    {id: 8, name: 'Mason Heaney'},
    {id: 9, name: 'Claudie Smitham'},
    {id: 10, name: 'Emil Schaefer'},
]

export default function MySelect({label, name, items, createText, className, createLink}: {label: string, name: string, items: {id: number, name: string}[], createText?: string, className?: string, createLink?:string}) {
    const [selected, setSelected] = useState(items[0] || people[0]);

    useEffect(() => {
        if (items) {
            setSelected(items[0])
        }
    }, [items]);

    return (
        <Listbox value={selected} onChange={setSelected} name={name}>
            {({open}) => (
                <div className={className}>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {createLink && createText ? <Link to={createLink + "/"  + (items[items.length - 1]?.id + 1 || 1)}>
                                    <Listbox.Option value={{id: 0, name: "Создать тест"}} className={({active}) =>
                                        classNames(
                                            active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                    }>
                                        <span>Создать {createText}</span>
                                    </Listbox.Option>
                                </Link> : ""}
                                {items.map((item) => (
                                    <Listbox.Option
                                        key={item.id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {item.name}
                        </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-blue-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}