import React, { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

interface MultiListBoxProps {
  activePersons: Array<{ id: number, name: string }>;
  setActivePersons: (activePersons: Array<{ id: number, name: string }>) => void;
}

export default function MultiListBox({ activePersons, setActivePersons }: MultiListBoxProps) {

  return (
    <div className="w-full max-w-4xl">
      <div className="space-y-1">

        <Listbox value={activePersons} onChange={setActivePersons} name="people" multiple>
          <div>
            <Listbox.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
              <span className="block flex flex-wrap gap-2">
                {activePersons.length === 0 ? (
                  <span className="p-0.5">All</span>
                ) : (
                  activePersons.map((person) => (
                    <span
                      key={person.id}
                      className="flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5"
                    >
                      <span>{person.name}</span>
                      <svg
                        className="h-4 w-4 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          setActivePersons((existing) => existing.filter((p) => p !== person))
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  ))
                )}
              </span>
              <ChevronUpIcon
                className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
                aria-hidden="true"
              />
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
                aria-hidden="true"
              />
            </Listbox.Button>

          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >

            <Listbox.Options className="left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

              {people.map((person) => (
                <Listbox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) => {
                    return classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9 focus:outline-none',
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    )
                  }}
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          'block truncate',
                          selected ? 'font-semibold' : 'font-normal',
                          "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                        )}
                      >
                        {person.name}
                      </span>
                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="w-4 h-4 text-bold" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  )
}







// export default function MultiListBox() {
//   return (
//     <MultiPeopleList />
//   )
// }

// function MultiPeopleList() {
//   let [activePersons, setActivePersons] = useState([people[2], people[3]])

//   return (
//     <div className="w-full max-w-4xl">
//       <div className="space-y-1">
//         {/* <form
//           onSubmit={(e) => {
//             e.preventDefault()
//             // console.log([...new FormData(e.currentTarget).entries()])
//           }}
//         > */}
//         <Listbox value={activePersons} onChange={setActivePersons} name="people" multiple>
//           <div>
//             <Listbox.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
//               <span className="block flex flex-wrap gap-2">
//                 {activePersons.length === 0 ? (
//                   <span className="p-0.5">Empty</span>
//                 ) : (
//                   activePersons.map((person) => (
//                     <span
//                       key={person.id}
//                       className="flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5"
//                     >
//                       <span>{person.name}</span>
//                       <svg
//                         className="h-4 w-4 cursor-pointer"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           e.preventDefault()
//                           setActivePersons((existing) => existing.filter((p) => p !== person))
//                         }}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </span>
//                   ))
//                 )}
//               </span>
//               <ChevronUpIcon
//                 className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
//                 aria-hidden="true"
//               />
//               <ChevronDownIcon
//                 className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
//                 aria-hidden="true"
//               />
//             </Listbox.Button>
//           </div>


//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >

//             <Listbox.Options className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               {people.map((person) => (
//                 <Listbox.Option
//                   key={person.id}
//                   value={person}
//                   className={({ active }) => {
//                     return classNames(
//                       'relative cursor-default select-none py-2 pl-3 pr-9 focus:outline-none',
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
//                     )
//                   }}
//                 >
//                   {({ active, selected }) => (
//                     <>
//                       <span
//                         className={classNames(
//                           'block truncate',
//                           selected ? 'font-semibold' : 'font-normal',
//                           "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
//                         )}
//                       >
//                         {person.name}
//                       </span>
//                       {selected && (
//                         <span
//                           className={classNames(
//                             'absolute inset-y-0 right-0 flex items-center pr-4',
//                             active ? 'text-white' : 'text-indigo-600'
//                           )}
//                         >
//                           <CheckIcon className="w-4 h-4 text-bold" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </Listbox.Option>
//               ))}
//             </Listbox.Options>

//           </Transition>

//         </Listbox>
//         {/* <button className="mt-2 inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//             Submit
//           </button> */}
//         {/* </form> */}
//       </div>
//     </div>
//   )
// }