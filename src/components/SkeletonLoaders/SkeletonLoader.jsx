function SkeletonItem() {
    return (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mb-4">
            <div className="animate-pulse grid space-x-4">
                <div className="rounded-full bg-slate-700 h-14 w-14 mb-3"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SkeletonLoader({ value }) {
    const skeletons = Array(parseInt(value)).fill(null); // Create an array with 4 items

    return (
        <>
            {skeletons.map((_, index) => (
                <SkeletonItem key={index} />
            ))}
        </>
    );
}

export default SkeletonLoader;
