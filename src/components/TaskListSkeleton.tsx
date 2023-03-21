export default function TaskListSkeleton() {
    return (
        <div className="overflow-hidden animate-pulse rounded-md">
            <ul role="list" className="space-y-2 sm:space-y-0">
                {[...Array(3)].map((_, i) => (
                    <li className="rounded-md border sm:border-0">
                        <div className="block hover:bg-gray-50 sm:bg-white">
                                <div className="flex items-center sm:p-0 py-5 px-2">
                                    <div className="relative w-2 transition-all bg-gray-500 sm:block hidden items-center justify-center py-10" />
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <div className='sm:w-20 w-32 h-4 bg-gray-200 rounded-md' />
                                            <span className="mt-2 flex items-center">
                                                <div className='sm:w-40 w-64 h-4 bg-gray-300 rounded-md' />
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
                                    <div className="flex items-center sm:px-8 px-3">
                                        <i className='fas fa-chevron-right text-gray-400' />
                                    </div>
                                </div>
                                <div className="py-1 bg-gray-300 sm:hidden rounded-b-md" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}