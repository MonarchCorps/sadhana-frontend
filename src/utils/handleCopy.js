const handleCopy = (event, i, copySuccess, setCopySuccess) => {
    const content = event.currentTarget.dataset.content;
    const cleanContent = content.replace(/\*/g, '');

    navigator.clipboard.writeText(cleanContent)
        .then(() => {
            const updatedSuccess = [...copySuccess];
            updatedSuccess[i] = true;
            setCopySuccess(updatedSuccess);  // Set success to true for that index

            setTimeout(() => {
                // Create a new copy to reset success after 2400ms
                const resetSuccess = [...copySuccess];
                resetSuccess[i] = false;
                setCopySuccess(resetSuccess);
            }, 1500);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
};

export default handleCopy