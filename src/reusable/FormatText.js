
const FormatText = (data) => {
    return data.replace(/\w\S*/g, function(t) { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(); });

}

export default FormatText;

