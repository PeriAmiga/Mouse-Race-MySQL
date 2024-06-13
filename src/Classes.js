import {getRandomSize} from './Functions'

// class for game elements
export class Element {
    constructor() {
        this.size = getRandomSize();
    }
}


// Subclass for Collect elements
export class Collect extends Element {
    constructor() {
        super();
        this.type = 'Collect';
        this.color = 'green';
        this.shape = 'rectangle';
        this.direction = 1; // 1 = up, -1 = down
    }
}


// Subclass for Avoid elements
export class Avoid extends Element {
    constructor() {
        super();
        this.type = 'Avoid';
        this.color = 'red';
        this.shape = 'circle';
        this.direction = 1; // 1 = right, -1 = left
    }
}

// Subclass for Change elements
export class Change extends Element {
    constructor() {
        super();
        this.type = 'Change';
        this.color = 'green'; // Starts as Collect
        this.shape = 'square';
        this.direction = 1; // 1 = clockwise
    }
}