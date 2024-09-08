let v = Vue.createApp({
    data() {
        return {
            rowCount: 5,
            colCount: 5,
            score: 0,
            moles: [],
            moleCount: 0,
            time: 30,
            timer: "00:00"
        };
    },
    methods: {
        level() {
            return Math.floor(this.score / 5);
        },
        probability() {
            let prob = 1/(1 + (Math.E**(-this.score))) - 0.5;
            return prob / 2;
        },
        indexToXY(cell) {
            cell = cell - 1;
            let y = Math.floor(cell / this.colCount);
            let x = cell % this.rowCount;
            return [x, y];
        },
        molesContains(position) {
            let [x, y] = position;
            for (let i = 0; i < this.moles.length; i++) {
                if (this.moles[i].x === x && this.moles[i].y === y) {
                    return true;
                }
            }
            return false;
        },
        addMole(x = -1, y = -1) {
            if (x === -1 || y === -1) {
                x = Math.floor(Math.random() * this.colCount);
                y = Math.floor(Math.random() * this.rowCount);
            }
            console.log(x, y);
            this.moles.push({x: x, y: y});
        },
        removeMole(position) {
            (position);
            let [x, y] = position;
            for (let i = 0; i < this.moles.length; i++) {
                let mole = this.moles[i];
                if (mole.x === x && mole.y === y) {
                        this.moles.splice(i, 1);
                    i--;
                    this.score++;
                }
            }
        },
        updateMoles() {
            let level = this.level();
            this.moleCount = level + 1;
            let prob = this.probability();
            molesNum = level + 1;
            for (let i = 0; i < this.moles.length; i++) {
                let mole = this.moles[i];
                let choice = Math.random();
                if (choice < prob) {
                    console.log(choice, prob);
                    mole.x = Math.floor(Math.random() * this.colCount);
                    mole.y = Math.floor(Math.random() * this.rowCount);
                }
                else if (choice < prob / 1000) {
                    mole.x = -1;
                    mole.y = -1;
                }
            }
            if (molesNum > this.moles.length) {
                this.addMole();
            }
        },
        updateTimer() {
            this.timer = `00:${this.time.toString().padStart(2, '0')}`;
            this.time--;
        }
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.colCount}, 1fr)`,
                gridTemplateRows: `repeat(${this.rowCount}, 1fr)`
            }
        }
    },
    created: function() {
        this.addMole(0, 0);
        setInterval(this.updateMoles, 1000);
        setInterval(this.updateTimer, 1000);
    }
}).mount("#app");
