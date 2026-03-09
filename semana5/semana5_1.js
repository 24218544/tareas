// Es necesario tener dos pilas para tener tanto el historial de cambios como el historial de cambios deshechos. De esa manera es posible deshacer cambios y rehacerlos

class Nodo {
    constructor(dato) { // Inicializa los valores del nodo
        this.dato = dato;
        this.siguiente = null;
    }
}

class Pila {
    constructor() { // Inicializa la referencia a la cabeza y el contador
        this.tope = null;
        this.contador = 0;
    }

    push(dato) { // Inserta un nuevo nodo 
        let nuevoNodo = new Nodo(dato); // Crea un nuevo nodo mediante el objeto Nodo
        nuevoNodo.siguiente = this.tope; // El nuevo nodo hace referencia al tope actual
        this.tope = nuevoNodo; // Se asigna la referencia del tope al nuevo nodo
        this.contador++;
    }

    pop() { // Elimina el nodo que está en la cima y lo devuelve
        if (this.estaVacia()) return "ERROR! PILA VACÍA"; // Pila vacía 
        let nodoEliminado = this.tope; // Se almacena el nodo a eliminar
        this.tope = this.tope.siguiente; // Se pasa el tope al siguiente nodo
        this.contador--;
        return nodoEliminado.dato; // Devuelve el nodo eliminado
    }

    peek() { // Devuelve el nodo (sin modificar la pila)
        if (this.estaVacia()) return "LA PILA ESTÁ VACÍA!";
        return this.tope.dato;
    }

    estaVacia() { // Si el tope está vacío devuelve "true"
        return !this.tope;
    }

    tamaño() { // Devuelve la cantidad de elementos que hay en la pila
        return this.contador;
    }
}

class EditorCodeLeap {
    constructor() { // Crea dos pilas mediante el objeto Pila
        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }

    escribir(cambio) { // Introduce un nuevo cambio al historial de deshacer
        this.pilaDeshacer.push(cambio);
        this.pilaRehacer = new Pila(); // Limpia el historial de rehacer
    }

    deshacer() { // Elimina un nodo del historial de deshacer y lo incorpora en el historial de rehacer
        if (this.pilaDeshacer.estaVacia()) return null;
        const nodoEliminado = this.pilaDeshacer.pop();
        this.pilaRehacer.push(nodoEliminado);
        return nodoEliminado;
    }

    rehacer() { // Elimina un nodo del historial de rehacer y lo incorpora en el historial de deshacer
        if (this.pilaRehacer.estaVacia()) return null;
        const nodoEliminado = this.pilaRehacer.pop();
        this.pilaDeshacer.push(nodoEliminado);
        return nodoEliminado;
    }

    mostrarHistorial() { // Ambas pilas imprimen en consola todos los nodos empezando desde la cima
        console.log("*** PILA DESHACER ***")
        let actual = this.pilaDeshacer.tope;
        for (let i = 1; i <= this.pilaDeshacer.contador; i++) {
            console.log(actual.dato);
            actual = actual.siguiente;
        }

        console.log("*** PILA REHACER ***")
        actual = this.pilaRehacer.tope;
        for (let i = 1; i <= this.pilaRehacer.contador; i++) {
            console.log(actual.dato);
            actual = actual.siguiente;
        }
    }

    verificarBalanceo(codigoFuente) {
        const pila = new Pila();
        let esValido;

        for (let i = 0; i < codigoFuente.length; i++) {

            if (codigoFuente[i] === "(" || codigoFuente[i] === "{" || codigoFuente[i] === "[") {
                pila.push(codigoFuente[i]);
            }

            if (codigoFuente[i] === ")" || codigoFuente[i] === "}" || codigoFuente[i] === "]") {

                if (pila.estaVacia()) {
                    esValido = false;
                    return "Cierre sin apertura";
                }

                let ultimo = pila.pop();
                
                if ( (ultimo === "(" && codigoFuente[i] !== ")") ||
                    (ultimo === "[" && codigoFuente[i] !== "]") ||
                    (ultimo === "{" && codigoFuente[i] !== "}") )
                {
                    esValido = false;
                    return "Bracket incorrecto al cerrar";
                }
            }
        }

        esValido = true;
        return !pila.estaVacia() ? "Faltan cierres" : "Código válido";
    }
}

// let pila = new Pila();

// pila.push("A");
// pila.push("B");
// pila.push("C");

// pila.pop();
// pila.pop();

// console.log(pila.peek());


// PRUEBAS
// const editor = new EditorCodeLeap();

// editor.escribir("def funcion():");
// editor.escribir("    x = 5");
// editor.escribir("    return x");

// editor.deshacer();
// editor.deshacer();

// editor.rehacer();

// editor.escribir("    print(x)");

// editor.mostrarHistorial();


// PRUEBAS SIGNOS DE AGRUPACIÓN
const verificar = new EditorCodeLeap();
// console.log( verificar.verificarBalanceo("({}[])") )
// console.log( verificar.verificarBalanceo("({[]})") )
// console.log( verificar.verificarBalanceo("({[}])") )
// console.log( verificar.verificarBalanceo("(((") )
// console.log( verificar.verificarBalanceo(")))") )
// console.log( verificar.verificarBalanceo("") );
// console.log( verificar.verificarBalanceo("if (x > 0) { return [a, b]; }") );


// FASE VALIDA
// let pila = new Pila();

// pila.push("A");
// pila.push("B");
// pila.push("C");
// pila.peek();
// console.log(pila.contador);

// console.log(pila.pop());
// console.log(pila.pop());
// console.log(pila.pop());
// console.log(pila.pop());

// console.log(pila.peek());
