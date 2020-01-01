export  default  class Mypuzzle {
    static _id=0;
    constructor(img,hide=true) {
        this._id = Mypuzzle._id;
        this._img = img;
        this._hide = hide;
        Mypuzzle._id++
    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get hide() {
        return this._hide;
    }

    set hide(value) {
        this._hide = value;
    }
}