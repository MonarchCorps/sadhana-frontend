/* eslint-disable react/prop-types */
import FilterSection from './FilterSection'

function PaymentHead({ setFilteredDetails, enrolledCourse }) {

    return (
        <div className="bg-[#1f2125] px-3 pt-5 pb-[4.5rem] mt-16">
            <FilterSection data={enrolledCourse} setFilteredData={setFilteredDetails} />
        </div>
    )
}

export default PaymentHead