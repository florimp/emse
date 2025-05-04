const codeExamples = {
    sumArray: {
        top: `
    // Summiert alle Werte in einem Array
    // startet bei 0
    // geht jedes Element durch
    // addiert Elemente zum Ergebnis
    // gibt die Summe zurück
    function sumArray(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }`,

        inline_raw: `
    function sumArray(arr) { // summiert alle Werte im Array
        let sum = 0; // startet bei 0
        for (let i = 0; i < arr.length; i++) { // gehe jedes Element durch
            sum += arr[i]; // addiere Element zum Ergebnis
        }
        return sum; // gib die Summe zurück
    }`,

        inline_formatted: `
    function sumArray(arr) {                    // summiert alle Werte im Array
        let sum = 0;                            // startet bei 0
        for (let i = 0; i < arr.length; i++) {  // gehe jedes Element durch
            sum += arr[i];                      // addiere Element zum Ergebnis
        }
        return sum;                             // gib die Summe zurück
    }`
    },

    findMax: {
        top: `
    // Findet das größte Element im Array
    // initialisiert max mit dem ersten Element
    // prüft jedes Element
    // aktualisiert max, wenn ein größeres gefunden wird
    // gibt das Maximum zurück
    function findMax(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }`,

        inline_raw: `
    function findMax(arr) { // findet das größte Element
        let max = arr[0]; // initialisiert mit dem ersten Element
        for (let i = 1; i < arr.length; i++) { // prüft alle restlichen Elemente
            if (arr[i] > max) { // aktualisiert max, falls größer
                max = arr[i];
            }
        }
        return max; // gibt das Maximum zurück
    }`,

        inline_formatted: `
    function findMax(arr) {                      // findet das größte Element
        let max = arr[0];                        // initialisiert mit dem ersten Element
        for (let i = 1; i < arr.length; i++) {   // prüft alle restlichen Elemente
            if (arr[i] > max) {                  // aktualisiert max, falls größer
                max = arr[i];
            }
        }
        return max;                              // gibt das Maximum zurück
    }`
    },

    findMin: {
        top: `
    // Findet das kleinste Element im Array
    // initialisiert min mit dem ersten Element
    // prüft jedes Element
    // aktualisiert min, wenn ein kleineres gefunden wird
    // gibt das Minimum zurück
    function findMin(arr) {
        let min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    }`,

        inline_raw: `
    function findMin(arr) { // findet das kleinste Element
        let min = arr[0]; // initialisiert mit dem ersten Element
        for (let i = 1; i < arr.length; i++) { // prüft alle restlichen Elemente
            if (arr[i] < min) { // aktualisiert min, falls kleiner
                min = arr[i];
            }
        }
        return min; // gibt das Minimum zurück
    }`,

        inline_formatted: `
    function findMin(arr) {                      // findet das kleinste Element
        let min = arr[0];                        // initialisiert mit dem ersten Element
        for (let i = 1; i < arr.length; i++) {   // prüft alle restlichen Elemente
            if (arr[i] < min) {                  // aktualisiert min, falls kleiner
                min = arr[i];
            }
        }
        return min;                              // gibt das Minimum zurück
    }`
    }
};
