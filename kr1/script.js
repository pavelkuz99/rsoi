import crypto from 'crypto';

class DeviceDistibutor {
    constructor(name, country, address, deviceMap) {
        this.companyName = name;
        this.country = country;
        this.address = address;
        this.deviceMap = deviceMap;
    }

    /**
     * @param {any} id
     */
    set companyeId(id) {
        this.companyId = crypto.createHash('sha1').update(id);
    }

    get infoText() {

    }

    get infoList() {

    }

    get infoDropdown() {

    }

}