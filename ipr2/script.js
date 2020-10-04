var defaultStyle = {
    "color": "black",
    "fontFamily": "Verdana",
}

var resultBox = document.getElementById("result-box")
var inputField = document.getElementById("input-text")

var styleMagicButton = document.getElementById('style-magic-button');
var updateButton = document.getElementById('update-button');
var beforeButton = document.getElementById('before-radio-button');
var afterButton = document.getElementById('after-radio-button');

function getPrefixSelector() {
    var prefixSelectorButton = document.getElementById('prefix-selector');
    return prefixSelectorButton.value;
}

function updateStyle(input, expectedStyle) {
    input.style.fontFamily = expectedStyle.fontFamily;
    input.style.color = expectedStyle.color;
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
    updateStyle(resultOutput, inputField.style);
    resultBox.appendChild(resultOutput)
});

inputField.addEventListener('click', function() {
    updateStyle(this, defaultStyle)
});

styleMagicButton.addEventListener('click', function() {
    var fontFamily = [
        "Arial",
        "Helvetica",
        "Roboto",
        "Trebushet MS",
        "Times New Roman"
    ];
    var color = [
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

    var randomStyle = {
        "color": getRandomStyle(color),
        "fontFamily": getRandomStyle(fontFamily),
    }
    updateStyle(inputField, randomStyle);
});