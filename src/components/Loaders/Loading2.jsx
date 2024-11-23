/* eslint-disable react/prop-types */
function Loading2({ data, isLoading }) {
    return (
        isLoading && (
            <div className="bg-[#065132df] w-full text-slate-200 font-400 px-3 py-2 text-base rounded-sm" >
                <div className="loader2" data-value={`Loading ${data}...`}>
                </div>
            </div>
        )
    )
}

export default Loading2