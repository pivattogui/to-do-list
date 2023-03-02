import { Disclosure, Menu, Transition } from "@headlessui/react"
import { getSession, useSession } from "next-auth/react"
import { Fragment, useMemo, useState } from "react"
import { classNames } from "../helpers/commum"
import { useRouter } from "next/router"


const pathsWithoutLayout = ['/login', '/register']
import { signOut } from 'next-auth/react'

export default function AppLayout({ children }) {
    const router = useRouter()

    const { status, data: session } = useSession()
    const [loading, setLoading] = useState(true)

    useMemo(() => {
        //@ts-ignore
        if (status != "authenticated" || !session?.user?.id) return setLoading(true)
        setLoading(false)

    }, [status])

    if (pathsWithoutLayout.some(path => path === router.pathname)) {
        return children
    }

    return (
        <>
            {loading ?
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
                :
                <>
                    <div>
                        <Disclosure as="nav" className="bg-white border-b border-gray-300 drop-shadow-sm">
                            {({ open }) => (
                                <>
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-1" >
                                        <div className="flex justify-between h-16">
                                            <div className="flex">
                                                <div className="flex-shrink-0 flex items-center">
                                                    <i className="fas fa-sticky-note mr-2 text-gray-700" />
                                                    <p className="text-lg text-gray-700 "><span className="font-semibold">Todo</span>List</p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                                <Menu as="div" className="ml-3 relative">
                                                    <div>
                                                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-0 ">
                                                        <div className="flex flex-col justify-end items-end mr-2">
                                                                <p className="text-gray-700 font-medium text-sm ml-2">{session?.user?.name}</p>
                                                                <p className="text-gray-500 text-xs ml-2">{session?.user?.email}</p>
                                                            </div>
                                                            <div className="h-9 w-9 rounded-full bg-gray-500 flex items-center justify-center" >
                                                                <i className="fas fa-user text-white" />
                                                            </div>
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg py-1 bg-white ring-transparent focus:outline-none">
                                                            <div className="py-1 px-2 cursor-pointer" onClick={() => signOut()}>
                                                                <div className="block px-4 py-2 text-base text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md">
                                                                    Sair
                                                                </div>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                            <div className="-mr-2 flex items-center sm:hidden">
                                                <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 shadow-none rounded-md text-gray-400 focus:outline-none focus:ring-transparent focus:ring-offset-2 ">
                                                    {open ? (
                                                        <i className="fas fa-chevron-up" />
                                                    ) : (
                                                        <i className="fas fa-chevron-down" />
                                                    )}
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Disclosure.Panel className="sm:hidden absolute w-full bg-white border-b shadow-sm">
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="flex items-center px-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center" >
                                                        <i className="fas fa-user text-white text-lg" />
                                                    </div>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-base font-medium text-gray-800">{session?.user?.name}</div>
                                                    <div className="text-sm font-medium text-gray-500">{session?.user?.email}</div>
                                                </div>
                                            </div>
                                            <div className="mt-3 space-y-1 mb-1" onClick={() => signOut()}>
                                                <div className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                                    Sair
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                    {children}
                </>
            }
        </>
    )
}