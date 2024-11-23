const trim = (content, value) => {
    return (
        content?.length < Number(value) ? content : `${(content)?.slice(0, Number(value))}...`

    )
}

export default trim