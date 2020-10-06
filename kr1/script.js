function hashCode(s) {
    return s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
}

class Company {
    constructor(name, country, address, phone, product) {
        this.companyName = name;
        this.country = country;
        this.address = address;
        this.phone = phone;
        if (typeof product != "undefined") {
            this.addProduct(product);
        } else {
            this.products = []
        }
    }

    static jsonConstructor(jsonCompanyObject) {
        var product;
        var companyInstance = new Company(
            jsonCompanyObject["companyName"],
            jsonCompanyObject["country"],
            jsonCompanyObject["address"],
            jsonCompanyObject["phone"]
        )
        for (product of jsonCompanyObject["products"]) {
            companyInstance.addProduct(product);
        }
        return companyInstance;
    }

    // method to add id attribute to object
    setCompanyId() {
        this.companyId = hashCode(this.companyName);
    }

    // static method to create product dict
    static createProduct(name, color, price) {
        return {
            "name": name,
            "color": color,
            "price": price
        };
    }

    // add given product to object products array
    addProduct(product) {
        if (!this.products) {
            this.products = [product];
        } else {
            this.products.push(product)
        }
    }

    // get object information as text
    get infoText() {
        var productsString = "";
        for (var product of this.products) {
            productsString = productsString + `${product["name"]} `;
        }
        return `Company "${this.companyName}" is based in ${this.country}, ${this.address}.<br>` + `Available products: ${productsString}`;
    }

    // get object information as list
    get infoList() {
        var productsString = "";
        var companyDataString = "";
        for (var companyData of [this.companyName, this.country, this.address, this.phone]){
            companyDataString = companyDataString + `<li>${companyData}</li>`;
        }
        for (var product of this.products) {
            productsString = productsString + `<li>${product["name"]}, ${product["color"]}, ${product["price"]}</li>`
        }
        return `<ul>${companyDataString + productsString}</ul>`;
    }
}


// company info fields
var nameField = document.getElementById('name');
var countryField = document.getElementById('country');
var addressField = document.getElementById('address');
var phoneField = document.getElementById('phone');

// product info fields
var productName = document.getElementById('product-name');
var productColor = document.getElementById('product-color');
var productPrice = document.getElementById('product-price');

// selector inputs
var showTypeSelector = document.getElementById('show-type-selector');
var showCompanySelector = document.getElementById('show-company-selector');

// buttons
var addButton = document.getElementById('add-button');
var showButton = document.getElementById('show-button');
var updateButton = document.getElementById('update-button');
var showAllButton = document.getElementById('show-all-button');

var resultBox = document.getElementById('result-box');

function clearInputFields(fieldsList) {
    for (var field of fieldsList){
        field.value = '';
    }
};

addButton.addEventListener('click', function() {
    const defaultStub = "empty";
    try {
        if (typeof(Storage) !== "undefined") {
            name = nameField.value ? nameField.value : defaultStub;
            country = countryField.value ? countryField.value : defaultStub;
            address = addressField.value ? addressField.value : defaultStub;
            phone = phoneField.value ? phoneField.value : defaultStub;
            if (productPrice.value && productName.value) {
                product = Company.createProduct(productName.value, productColor.value, productPrice.value);
            } else {
                product = "undefined"
            }
            var companyInstance = new Company(name, country, address, phone, product);
            console.log("New Company object created: ", companyInstance)
            companyInstance.setCompanyId();
            localStorage.setItem(companyInstance.companyId, JSON.stringify(companyInstance));
            var companyOption = document.createElement("option");
            companyOption.id = companyInstance.companyId;
            companyOption.innerHTML = companyInstance.companyName;
            showCompanySelector.appendChild(companyOption)
        } else {
            console.log("ERROR: WebStorage not supported");
        }
    } 
    catch (error) {
        console.log(error)
    } 
    finally {
        clearInputFields([nameField, countryField, addressField, phoneField, productName, productColor, productPrice])
    } 
});

showButton.addEventListener('click', function() {
    resultBox.value = "";
    const as_text = "as text";
    const as_list = "as list";
    var selectedCompany = showCompanySelector.options[showCompanySelector.options.selectedIndex];
    if (selectedCompany.id != "") {
        var companyInstance = Company.jsonConstructor(JSON.parse(localStorage.getItem(selectedCompany.id)));
        if (showTypeSelector.value == as_text){
            resultBox.innerHTML = companyInstance.infoText;
        } else if (showTypeSelector.value == as_list){
            resultBox.innerHTML = companyInstance.infoList;
        }
    }
});

updateButton.addEventListener('click', function() {
    var selectedCompany = showCompanySelector.options[showCompanySelector.options.selectedIndex];
    try{
        if (selectedCompany.id != "") {
            var companyInstance = Company.jsonConstructor(JSON.parse(localStorage.getItem(selectedCompany.id)));
            if (nameField.value != "") {
                companyInstance.companyName = nameField.value;
                companyInstance.setCompanyId();
                localStorage.removeItem(companyInstance.companyId);
                selectedCompany.id = companyInstance.companyId;
            }
            if (countryField.value != "") {
                companyInstance.country = countryField.value;
            }
            if (addressField.value != "") {
                companyInstance.address = addressField.value;
            }
            if (phoneField.value != "") {
                companyInstance.phone = phoneField.value;
            }
            if (productName.value != "" && productColor.value != "" && productPrice.value != ""){
                companyInstance.addProduct(Company.createProduct(productName.value, productColor.value, productPrice.value))
            } else {
                resultBox.innerHTML = "<p>Please enter all product attributes to add it!</p>";
            }
            console.log("LOG", companyInstance);
            companyInstance.setCompanyId();
            localStorage.setItem(companyInstance.companyId, JSON.stringify(companyInstance));
        }
    }
    catch (error) {
        console.log(error)
    } 
    finally {
        clearInputFields([nameField, countryField, addressField, phoneField, productName, productColor, productPrice])
    }
});

showAllButton.addEventListener('click', function() {
    tablesArray = [];
    var tableHeaderHTML = "<tr><th>Key</th><th>Value</th></tr>";
    for (var i = 0; i < localStorage.length; i++){
        var companyInstance = Company.jsonConstructor(JSON.parse(localStorage.getItem(localStorage.key(i))));
        var tableContent = `
        <tr><td>Name</td><td>${companyInstance.companyName}</td></tr>
        <tr><td>Country</td><td>${companyInstance.country}</td></tr>
        <tr><td>Address</td><td>${companyInstance.address}</td></tr>
        <tr><td>Phone</td><td>${companyInstance.phone}</td></tr>
        `;
        tablesArray.push(`${tableHeaderHTML}${tableContent}`);
    }
    var allCompaniesData = "";
    for (var item of tablesArray) {
        allCompaniesData = allCompaniesData + `<table border="1" style="table-layout: fixed; width: 25%;">${item}</table>`;
    }
    console.log("Results: ", allCompaniesData);
    var newWindow = window.open("", "",);
    newWindow.document.write(allCompaniesData);
});