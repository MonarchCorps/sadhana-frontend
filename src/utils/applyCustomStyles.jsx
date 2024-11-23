const applyCustomStyles = (text) => {
    const listText = text.replace(/^\s*\*\s+/gm, '• ');
    const boldRegex = /\*\*(.*?)\*\*/g;

    const processedText = listText.split(boldRegex).map((part, index) => {
        if (index % 2 !== 0) {
            return <span key={index} style={{ fontWeight: 'bold', color: '#000' }}>{part}</span>;
        }
        return part;
    });

    return processedText;
};

export default applyCustomStyles