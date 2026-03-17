/* 
# COMPRENDE-1:
Si tengo una cola con lista enlazada y quiero enqueue(X), ¿qué pasa exactamente con los punteros frente y final?

    El puntero "frente" no cambia. El nodo final actual se enlaza al nuevo nodo y se reasigna el valor del puntero "final" hace referencia al nuevo nodo.

# COMPRENDE-2:
¿Por qué en una cola circular necesito diferenciar entre "cola vacía" y "cola llena" si en ambos casos frente podría ser igual a (final + 1) % capacidad? ¿Cómo se resuelve ese problema?

    Obviamente necesitamos diferenciar entre una cola llena y una vacía, porque en la llena ya no podemos insertar nada y en la vacía sí. Se resuelve usando una variable extra que acumule el tamaño de la lista.
    
# COMPRENDE-3:
En el escenario del hospital, ¿por qué una cola FIFO simple no es suficiente para el triage?

    Porque en la realidad es negligente atender pacientes solo por orden de llegada. Un paciente con una lesión que amenace su vida debe ser atendido primero que uno que sufre de gripa, aunque este haya llegado primero.
*/


/* 
CHECKPOINT METACOGNITIVO - COMPRENDE

1. ¿Puedes explicar qué hace el Paso 4 de dequeue() en el pseudocódigo (ajustar final = null cuando la cola queda vacía) sin leer el código? Si no puedes, ¿por qué ese paso es crítico para el invariante de la estructura?

    Para indicar que la cola está vacía se reasignan los valores de frente y final en null. Es crítico porque si no se le asigna el valor null a la variable final la cola se quedaría con un nodo fantasma que ya no debería estar ahí. Además, frente es null pero final no lo es, así que se rompe la correspondencia que debería existir entre esas dos variables cuando la cola está vacía.

2. ¿Buscaste en la IA la explicación de la cola circular antes de leer el pseudocódigo de esta sección? Si sí, ¿coincidió con lo que encontraste aquí? Si no coincidió, ¿cuál fue la diferencia y cuál es correcta?

    No la busqué.

3. ¿Podrías implementar enqueue() ahora mismo en papel sin mirar el pseudocódigo? Si no, ¿cuál es la línea que no entiendes del todo?

    Sí puedo. Primero debo crear el nodo, después compruebo si la lista está vacía. Si lo está entonces frente y final hacen referencia al nuevo nodo. Si no está vacía entonces el último nodo hace referencia al nuevo nodo y después final hace referencia al nuevo nodo. Por último se incrementa la variable tamaño.
*/

class Nodo {
    constructor(nombre) {
        this.nombre = nombre;
        this.siguiente = null;
    }
}

class Cola { 
    constructor() {
        this.frente = null;
        this.final = null;
        this.tamaño = 0;
    }
    
    estaVacia() {
        return this.frente === null;
    }
    
    // # DECISIÓN: solo toma un paramétro porque solo se necesita conocer el orden de llegada, sin su prioridad
    encolar(nombre) {
        const nuevoPaciente = new Nodo(nombre);

        if (this.estaVacia()) {
            this.frente = nuevoPaciente;
            this.final = nuevoPaciente;
        }
        else {
            this.final.siguiente = nuevoPaciente;
            this.final = nuevoPaciente;
        }

        this.tamaño++;
    }
    
    desencolar() {
        if (this.estaVacia()) return "No hay más pacientes";
        
        const pacienteAtendido = this.frente.nombre;
        
        if (this.frente.siguiente === null) {
            this.frente = null;
            this.final = null;
        }
        else {
            this.frente = this.frente.siguiente;
        }
        
        this.tamaño--; 

        return pacienteAtendido;
    }
    
    verFrente() {
        if (this.estaVacia()) return null;
        return this.frente.nombre;
    }
}

class NodoPrioridad {
    constructor(nombre, prioridad) {
        this.nombre = nombre;
        this.prioridad = prioridad;
        this.siguiente = null;
    }
}

class ColaPrioridad {
    constructor() {
        this.frente = null;
    }

    encolar(nombre, prioridad) {
        const nuevoPaciente = new NodoPrioridad(nombre, prioridad);
        if (this.frente === null) {
            this.frente = nuevoPaciente;
        }
        else if (prioridad < this.frente.prioridad) {
            nuevoPaciente.siguiente = this.frente;
            this.frente = nuevoPaciente;
        }
        else {
            let actual = this.frente;
            while (actual.siguiente !== null && actual.siguiente.prioridad <= prioridad) 
            {
                actual = actual.siguiente;
            }
            nuevoPaciente.siguiente = actual.siguiente;
            actual.siguiente = nuevoPaciente;
        }
    }

    desencolar() {
        if (this.frente === null) return null;
        const pacienteAtendido = this.frente.nombre;
        this.frente = this.frente.siguiente;
        return pacienteAtendido;
    }
}

class SistemaTriage {
    // # DECISIÓN: Se crean dos colas de distinto tipo para simular el sistema de un hospital real
    constructor() {
        this.recepcion = new Cola;
        this.triage = new ColaPrioridad;
    }

    registrarLlegada(nombre, prioridad) {
        
        // # DECISIÓN: se crea un objeto para mandar un solo argumento con todos los datos necesarios a la clase Cola, de otra manera no sería posible hacerlo porque el método encolar solo tiene un parámetro
        const paciente = {
            nombre: nombre,
            prioridad: prioridad
        };
        
        this.recepcion.encolar(paciente);
    }

    asignarTriage() {
        const pacienteAtendido = this.recepcion.desencolar();

        if (pacienteAtendido === null) return null;

        this.triage.encolar(pacienteAtendido.nombre, pacienteAtendido.prioridad);
    }

    siguientePaciente() {
        return this.triage.desencolar();
    }
}


// ## PRUEBAS UNITARIAS DE CLASE Cola

// const cola = new Cola();

// cola.encolar("Ana");
// cola.encolar("José");
// cola.encolar("María");

// console.log(cola.desencolar());

// console.log(cola.verFrente());

// console.log(cola.desencolar());
// console.log(cola.desencolar());


// ## PRUEBAS UNITARIAS DE CLASE ColaPrioridad

// const triage = new ColaPrioridad();

// triage.encolar("Ana", 3);
// triage.encolar("José", 1);
// triage.encolar("María", 2);

// console.log(triage.desencolar());
// console.log(triage.desencolar());
// console.log(triage.desencolar());


// ## PRUEBAS DE LA CLASE SistemaTriage

// const hospital = new SistemaTriage();

// hospital.registrarLlegada("Ana", 3);
// hospital.registrarLlegada("José", 1);
// hospital.registrarLlegada("María", 2);
// hospital.registrarLlegada("Carlos", 4);
// hospital.registrarLlegada("Luisa", 1);

// hospital.asignarTriage();
// hospital.asignarTriage();
// hospital.asignarTriage();
// hospital.asignarTriage();
// hospital.asignarTriage();
// console.log(hospital);

// console.log(hospital.siguientePaciente());
// console.log(hospital.siguientePaciente());
// console.log(hospital.siguientePaciente());
// console.log(hospital.siguientePaciente());
// console.log(hospital.siguientePaciente());


// # VALIDA

// const colaValida = new Cola();
// const colaPrioridadValida = new ColaPrioridad();

// colaValida.encolar("X");
// console.log(colaValida.verFrente());
// console.log(colaValida);

// colaValida.encolar("A");
// colaValida.desencolar();
// console.log(colaValida.estaVacia(), colaValida.tamaño);
// console.log(colaValida);

// console.log(colaValida.desencolar());

// colaPrioridadValida.encolar("A", 3)
// colaPrioridadValida.encolar("B", 1)
// colaPrioridadValida.encolar("C", 2)
// console.log(colaPrioridadValida.desencolar());

// colaPrioridadValida.encolar("Ana", 2);
// colaPrioridadValida.encolar("María", 2);
// console.log(colaPrioridadValida.desencolar());

// colaValida.encolar("A");
// colaValida.encolar("B");
// colaValida.encolar("C");
// colaValida.desencolar();
// console.log(colaValida.tamaño);


/* 
# REFLEXIONA-1:
    A partir de 1000 pacientes, desde este número la diferencia entre el heap y la lista es demasiado grande.   
# REFLEXIONA-2:
    Mi implementación actual usa el principio FIFO cuando los pacientes tienen la misma prioridad. En el caso de la prueba, si Ana llegó después que María entonces Ana sería atendida luego de María.
# REFLEXIONA-3:
    Llegan los pacientes a la recepción y lo primero que se hace es integrarlos en la cola simple que solo sigue el principio FIFO y nada más. Una vez que se tienen todos los pacientes registrados entonces se les asigna una prioridad de acuerdo a la gravedad de su situación médica. Cuando se atiende a un paciente se saca de la cola y se inserta en un pila que fungirá como el historial de atenciones del hospital.
*/


/* CHECKPOINT METACOGNITIVO - REFLEXIONA
1. ¿Tu análisis de trade-offs fue tuyo o fue esencialmente lo que la IA dijo? Si fue lo que dijo la IA, ¿puedes reformularlo con un ejemplo diferente que no usó la IA?

    Fue mío aunque la IA si me ayudó a comprenderlo mejor.

2. Si tuvieras que elegir ahora entre lista ordenada y heap para un hospital con 500 pacientes simultáneos, ¿qué elegirías? ¿Por qué es ahora más fácil responder esta pregunta que antes de implementar?

    Usaría un heap porque ahora conozco el costo que puede tener el comparar la prioridad de cada paciente con la prioridad del paciente recién llegado.

3. ¿Identificaste alguna limitación de tu implementación que la IA no mencionó? Si no encontraste ninguna, intenta un caso extremo: ¿qué pasa si haces 1000 enqueue seguidos sin hacer dequeue?

    No sé qué pasaría, pero deduzco que funcionaría como debería.
*/


/* # CHECKPOINT METACOGNITIVO - VALIDA
1. ¿Encontraste algún bug con el checklist que no habrías detectado solo ejecutando el Caso de Prueba 1? ¿Cuál fue y qué lo causó?

    No.

2. ¿Los casos de prueba que usaste para validar tu código los escribiste tú o los generó la IA? Si los generó la IA, ¿agregaste algún caso adicional propio? Si no, ¿por qué no?

    Los casos de prueba que indicaban cada uno de los puntos del checklist los hice yo mismo.

3. ¿Alguno de los 4 errores comunes apareció en tu implementación? Si sí, ¿cómo lo corregiste? ¿La IA detectó ese error sola o necesitaste señalárselo?

    La IA me señaló que yo había olvidado actualizar la variable tamaño en mi código
*/
