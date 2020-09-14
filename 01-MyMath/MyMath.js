/**
 * 'export' ist nötig falls wir MyMath in einem anderen Modul importieren wollen.
 * 'class' legt fest dass es sich hierbei um eine Klasse handelt.
 * 'MyMath' ist der Name der Klasse.
 */
export class MyMath {

    /**
     * Der Konstruktor wird aufgerufen um neue Instanzen der Klasse zu generieren.
     * vgl. let myNumber = new MyMath(3);
     * 
     * @param value Unser Initialwert für den Wert von unserer MyMath Instanz.
     */
    constructor(value) {
        // 'this' referenziert den Kontext in dem die aktuelle Funktion aufgerufen wird. 
        // Hier referenziert es die Instanz der Klasse MyMath die wir gerade erstellen.
        // mit 'value * 1' erzwingen wir, dass value als number gelesen wird.

        this.value = (value == null) ? this.value = 0 : this.value = value * 1;
    }

    add(value) {
        if (value != null) this.value += value;
    }

    subtract(value) {
        if (value != null) this.value -= value;
    }

    multiply(value) {
        if (value != null) this.value *= value;
    }

    divide(value) {
        if (value != null) this.value = (value !== 0) ? this.value / value : this.value;
            
    }

    pow(value) {
        if (value != null && value >= 0) {
            if (value === 0) this.value = 1;
            else if (value === 1) this.value = this.value;
            else {
                let begin = this.value;
                for (let i = 1; i < value; i++) this.value *= begin;
            }
            
        }
    }

    faculty() {
        if (this.value % 1 === 0) {
            if (this.value === 0 || this.value === 1) this.value = 1; 
            else {
                var num = this.value;
                while (num > 1) { 
                    num--;
                    this.value *= num; 
                }
            }
        }
    }
}
