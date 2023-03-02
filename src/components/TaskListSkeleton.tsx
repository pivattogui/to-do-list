export default function TaskListSkeleton() {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md animate-pulse">
            <ul role="list" className="divide-y divide-gray-200">
                {[...Array(3)].map((_, i) => (
                    <li>
                        <div className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center" />
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <div className='w-20 h-4 bg-gray-200 rounded-md' />
                                            <span className="mt-2 flex items-center">
                                                <div className='w-40 h-4 bg-gray-300 rounded-md' />
                                            </span>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className='w-20 h-4 bg-gray-200 rounded-md' />
                                            <span className="mt-2 flex items-center text-sm text-gray-500">
                                                <div className="h-15 w-15 rounded-full bg-gray-500 flex items-center justify-center" />
                                                <div className='w-10 h-4 bg-gray-300 rounded-md' />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <i className='fas fa-chevron-right text-gray-400' />
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}