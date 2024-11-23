/* eslint-disable react/prop-types */
import ReactPaginate from 'react-paginate' // for pagination
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai' // icons form react-icons
import { IconContext } from 'react-icons' // for customizing icons

function ReactPagination({ data, setPage, n, isLoading = false, filteredData }) {
    return (
        !isLoading && filteredData && filteredData.length > 0 && (
            <div className='w-full text-center mt-5'>
                <ReactPaginate
                    containerClassName={"list-none flex justify-center items-center mt-2 cursor-pointer select-none"}
                    pageClassName={"w-10 h-10 flex mx-1 justify-center items-center mt-1 list-none px-3 py-3"}
                    activeClassName={"rounded-full bg-[#052708] text-slate-100"}
                    onPageChange={(event) => setPage(event.selected)}
                    pageCount={Math.ceil(data.length / n)}
                    breakLabel="..."
                    previousLabel={
                        <IconContext.Provider value={{ color: "#B8C1CC", size: "32px" }}>
                            <AiFillLeftCircle />
                        </IconContext.Provider>
                    }
                    nextLabel={
                        <IconContext.Provider value={{ color: "#B8C1CC", size: "32px" }}>
                            <AiFillRightCircle />
                        </IconContext.Provider>
                    }
                />
            </div>
        )
    )
}

export default ReactPagination