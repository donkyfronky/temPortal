"use strict"
class Label {
    constructor(label,date) {
        this.label = label;
        this.date = date;
    }

    getLabel(){
        return this.label;
    }
    getDate(){
        return this.date;
    }
    getFormattedDate(){
        return this.date.toLocaleString();
    }
}

module.exports = Label;