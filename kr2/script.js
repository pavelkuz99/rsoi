
const tableHeadersArray = ["City name", "Picture"];
const tableContentMap = {
    "Amsterdam": [
        "Amsterdam is the Netherlands’ capital, known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age. Its Museum District houses the Van Gogh Museum, works by Rembrandt and Vermeer at the Rijksmuseum, and modern art at the Stedelijk. Cycling is key to the city’s character, and there are numerous bike paths.",
        "amsterdam.jpg"
    ],
    "Malaga": [
        "Malaga is a port city on southern Spain’s Costa del Sol, known for its high-rise hotels and resorts jutting up from yellow-sand beaches. Looming over that modern skyline are the city’s 2 massive hilltop citadels, the Alcazaba and ruined Gibralfaro, remnants of Moorish rule. The city's soaring Renaissance cathedral is nicknamed La Manquita ('one-armed lady') because one of its towers was curiously left unbuilt.",
        "malaga.jpg"
    ],
    "London": [
        "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex, and the entire city.",
        "london.jpg"
    ],
}

class Content {
    static createButton(buttonName, buttonId, styleClass) {
        return `<div><input type="button" id="${buttonId}" class="${styleClass}" value="${buttonName}"></div>`;
    }

    static createTable(tableHeadersArray, tableContentMap) {
        var headers = "<thead><tr>";
        var rows = "<tbody>";
        // create headers
        for (var header of tableHeadersArray) {
            headers += `<th>${header}</th>`;
        }
        headers += "</tr></thead>";
        // create table data rows
        for (var key in tableContentMap) {
            var data_header = `<h2>${key}</h2>`;
            var data = tableContentMap[key];
            let [text, image] = data;
            image = `<img id="${key}-img" src="${image}">`
            rows += `<tr><td>${data_header}<p>${text}</p></td><td>${image}</td></tr>`;
        }
        rows += "</tbody>";
        return `<div class="container"><table>${headers + rows}</table></div>`;
    }
}

var $updateTextButton = $(Content.createButton("Update text", "update-text", "button"));
var $updatePicturesButton = $(Content.createButton("Update pictures", "update-pictures", "button"));
var $dataTable = $(Content.createTable(tableHeadersArray, tableContentMap));

$(document).ready(function () {
    // create content
    $("body").append($updateTextButton, $updatePicturesButton);
    $("body").append($dataTable);
    // change cells with text to italic
    $("#update-text").click(function () {
        textCells = $("td").filter(function () {
            return $(this).text();
        });
        for (var cell of textCells) {
            cell.style.fontStyle = "italic";
            if (cell.textContent.includes("London")) {
                cell.style.textDecoration = "underline";
            }
        };
    });;
    // change pictures width
    $("#update-pictures").click(function () {
        for (var image of $("img")) {
            image.src = "stub.jpg";
        }
    });;
});
