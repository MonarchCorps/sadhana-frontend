const trim = (content, value) => {
    return (
        content?.length < parseInt(value) ? content : `${(content)?.slice(0, parseInt(value))}...`

    )
}

export default trim