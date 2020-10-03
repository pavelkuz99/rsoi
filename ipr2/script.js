const defaultColor = "black";
const defaultFontFamily = "Verdana";


function generateRandomTextStyle() {
    var inputField = document.getElementById("input-text")

    var fontType = [
        "Arial",
        "Helvetica",
        "Roboto",
        "Trebushet MS",
        "Times New Roman"
    ];
    var fontColor = [
        "red",
        "bisque",
        "cyan", "orange",
        "listcyan",
        "mistyrose",
        "gray",
        "darkred"
    ];

    function getRandomStyle(styleArray) {
        var index = Math.floor(Math.random() * styleArray.length);
        return styleArray[index];
    }

    inputField.style.color = getRandomStyle(fontColor);
    inputField.style.fontFamily = getRandomStyle(fontType);
    inputField.style.width = "100%";
}

function resetDefaultInputSyle() {
    var inputField = document.getElementById("input-text");
    inputField.style.fontFamily = defaultFontFamily;
    inputField.style.color = defaultColor;
}