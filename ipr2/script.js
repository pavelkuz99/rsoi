const defaultColor = "black";
const defaultFontFamily = "Verdana";

var resultBox = document.getElementById("result-box")
var inputField = document.getElementById("input-text")

var updateButton = document.getElementById('update-button');
var beforeButton = document.getElementById('before-radio-button');
var afterButton = document.getElementById('after-radio-button');

function getPrefixSelector() {
    var prefixSelectorButton = document.getElementById('prefix-selector');
    return prefixSelectorButton.value;
}

updateButton.addEventListener('click', function() {
    var resultOutput = document.createElement("P");
    resultOutput.innerText = inputField.value;
    if (beforeButton.checked) {
        resultOutput.insertAdjacentText('afterbegin', getPrefixSelector());
    }
    if (afterButton.checked) {
        resultOutput.insertAdjacentText('beforeend', getPrefixSelector());
    }
    console.log(resultOutput);
    resultBox.appendChild(resultOutput)
});


function generateRandomTextStyle() {

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
    inputField.style.fontFamily = defaultFontFamily;
    inputField.style.color = defaultColor;
}