class CustomComponent {
    constructor(name) {
        this.name = name;
    }

    get customName() {
        return this.name;
    }
}

const customBtn = new CustomComponent('Custom name');

console.debug(customBtn.customName);