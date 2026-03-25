// ============================
// Algoritmos de ordenación
// ============================

function bubbleSort(arr) {
    let a = [...arr];
    let n = a.length;

    for (let i = 0; i < n - 1; i++) {
        // #DECISIÓN: usamos una variable bandera para que detecte si hubo intercambios en el ciclo, si no los hubo podemos salir del ciclo prematuramente.
        let intercambio = false;

        // #DECISIÓN: le restamos i a n porque i indica los elementos que ya ordenamos
        for (let j = 0; j < n - 1 - i; j++) {

            if (a[j] > a[j + 1]) {
                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
                intercambio = true;
            }

        }

        if (!intercambio) break;
    }

    return a;
}

function selectionSort(arr) {
    let a = [...arr];
    let n = a.length;

    for (let i = 0; i < n - 1; i++) {
        // #DECISIÓN: consideramos el primer elemento como el mínimo inicial
        let min = i;

        for (let j = i + 1; j < n; j++) {
            // #DECISIÓN: buscamos el mínimo solo en la parte que aún no ha sido ordenada
            if (a[j] < a[min]) {
                min = j;
            }
        }

        if (min !== i) {
            let temp = a[i];
            a[i] = a[min];
            a[min] = temp;
        }
    }

    return a;
}

function insertionSort(arr) {
    let a = [...arr];
    let n = a.length;

    for (let i = 1; i < n; i++) {
        let key = a[i];
        let j = i - 1;
        // #DECISIÓN: guardamos el índice del elemento para insertarlo después en la posición correcta

        while (j >= 0 && a[j] > key) {
            // #DECISIÓN: movemos los elementos que sean más grandes a la derecha para dejar espacio para la inserción 
            a[j + 1] = a[j];
            j--;
        }

        a[j + 1] = key;
    }

    return a;
}

//////////////////////////////////////////////////
// Generadores de arreglos
//////////////////////////////////////////////////

function generarOrdenado(n) {
    return Array.from({ length: n }, (_, i) => i);
}

function generarInverso(n) {
    return Array.from({ length: n }, (_, i) => n - i);
}

function generarAleatorio(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * n));
}

//////////////////////////////////////////////////
// Función de prueba
//////////////////////////////////////////////////

function probarAlgoritmo(nombre, algoritmo, arreglo) {
    console.time(nombre);
    algoritmo(arreglo);
    console.timeEnd(nombre);
}

//////////////////////////////////////////////////
// Ejecutar pruebas
//////////////////////////////////////////////////

const tamaños = [100, 1000, 10000];

for (let tamaño of tamaños) {

    console.log("\n=============================");
    console.log("Tamaño del arreglo:", tamaño);
    console.log("=============================");

    const ordenado = generarOrdenado(tamaño);
    const inverso = generarInverso(tamaño);
    const aleatorio = generarAleatorio(tamaño);

    // # VALIDA
    console.log("\n--- Arreglo Ordenado ---");
    probarAlgoritmo("Bubble Sort", bubbleSort, ordenado);
    probarAlgoritmo("Selection Sort", selectionSort, ordenado);
    probarAlgoritmo("Insertion Sort", insertionSort, ordenado);

    // # VALIDA
    console.log("\n--- Arreglo Inverso ---");
    probarAlgoritmo("Bubble Sort", bubbleSort, inverso);
    probarAlgoritmo("Selection Sort", selectionSort, inverso);
    probarAlgoritmo("Insertion Sort", insertionSort, inverso);

    console.log("\n--- Arreglo Aleatorio ---");
    probarAlgoritmo("Bubble Sort", bubbleSort, aleatorio);
    probarAlgoritmo("Selection Sort", selectionSort, aleatorio);
    probarAlgoritmo("Insertion Sort", insertionSort, aleatorio);
}

// # VALIDA
// ==========================
// Casos de prueba especiales
// ==========================

console.log("\n=============================");
console.log("Casos de prueba");
console.log("=============================");

// Arreglo vacío
let casoVacio = [];

// Un solo elemento
let casoUno = [42];

// Elementos duplicados
let casoDuplicados = [5, 3, 8, 3, 5, 1, 1];

// --------------------------
// Pruebas Bubble Sort
// --------------------------

console.log("BUBBLE SORT");

console.log("Arreglo vacío:");
console.log(bubbleSort(casoVacio));

console.log("Un elemento:");
console.log(bubbleSort(casoUno));

console.log("Duplicados:");
console.log(bubbleSort(casoDuplicados));


// --------------------------
// Pruebas Selection Sort
// --------------------------

console.log("\nSELECTION SORT");

console.log("Arreglo vacío:");
console.log(selectionSort(casoVacio));

console.log("Un elemento:");
console.log(selectionSort(casoUno));

console.log("Duplicados:");
console.log(selectionSort(casoDuplicados));


// --------------------------
// Pruebas Insertion Sort
// --------------------------

console.log("\nINSERTION SORT");

console.log("Arreglo vacío:");
console.log(insertionSort(casoVacio));

console.log("Un elemento:");
console.log(insertionSort(casoUno));

console.log("Duplicados:");
console.log(insertionSort(casoDuplicados));