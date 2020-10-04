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
        var product;
        var productsString = "";
        for (product of this.products) {
            productsString = productsString + ` ${product["name"]},`;
        }
        return `Company "${this.companyName}" is based in ${this.country}, ${this.address}.<br>` + `Available products:${productsString}`;
    }

    // get object information as list
    // get infoList() {

    // }
}

var nameField = document.getElementById('name');
var countryField = document.getElementById('country');
var addressField = document.getElementById('address');
var phoneField = document.getElementById('phone');
var resultBox = document.getElementById('result-box');

var productName = document.getElementById('product-name');
var productColor = document.getElementById('product-color');
var productPrice = document.getElementById('product-price');

var addButton = document.getElementById('add-button');
var updateButton = document.getElementById('update-button');
var showButton = document.getElementById('show-button');
var showTypeSelector = document.getElementById('show-type-selector');
var showCompanySelector = document.getElementById('show-company-selector');
var shallAllButton = document.getElementById('show-all-button');


addButton.addEventListener('click', function() {
    const defaultStub = "empty";

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
        console.log("Print", companyInstance)
        companyInstance.setCompanyId();
        localStorage.setItem(companyInstance.companyId, JSON.stringify(companyInstance));
        var companyOption = document.createElement("option");
        companyOption.id = companyInstance.companyId;
        companyOption.innerHTML = companyInstance.companyName;
        showCompanySelector.appendChild(companyOption)
    } else {
        console.log("ERROR: WebStorage not supported");
    }
});

showButton.addEventListener('click', function() {
    resultBox.value = "";
    var selectedCompany = showCompanySelector.options[showCompanySelector.options.selectedIndex];
    if (selectedCompany.id != "") {
        var companyInstance = Company.jsonConstructor(JSON.parse(localStorage.getItem(selectedCompany.id)));
        // console.log("RESULT", typeof JSON.parse(localStorage.getItem(selectedCompany.id))["products"]);
        // console.log("RESULT", companyInstance.products);
        resultBox.innerHTML = companyInstance.infoText;
    }
});