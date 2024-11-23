const extractMimeType = (base64String) => {
    return base64String.match(/data:([^;]+);base64,/)[1];
};

export default extractMimeType