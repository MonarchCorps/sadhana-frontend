const convertToKobo = (value) => {
    return (
        (parseInt(value) * 100).toFixed(2)
    )
}

export default convertToKobo