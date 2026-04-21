#!/usr/bin/env python3
"""
Semana 9 — Divide y Vencerás: Merge Sort
Curso:  Estructura de Datos Básica
Equipo: Individual
Integrantes: Miguel Ángel Cedano Orozco
Fecha:  [Fecha de entrega]
"""

""" 
CHECKPOINT DE COMPRENSIÓN (FASE 1)

¿Por qué Merge Sort garantiza O(n log n) incluso en el peor caso? ¿Qué propiedad del árbol de recursión lo hace posible?

    El algoritmo siempre divide el arreglo a la mitad hasta que ya no pueda hacerlo más, esto tiene una complejidad de O(log n). Al momento de combinar y ordenar se tiene una complejidad de O(n). Siempre se toma el mismo punto de partida, es decir, la mitad. Por consiguiente, en todos los casos la complejidad temporal siempre será la misma: O(n log n)

Si el árbol de Merge Sort tiene 20 niveles, ¿cuántos elementos contiene el arreglo? (Pista: 2²⁰ = 1 048 576)

    Como la complejidad del árbol de recursión siempre es de O(log n), entonces la cantidad de elementos que tiene el arreglo es de 2²⁰ = 1 048 576

¿Qué ocurriría con la estabilidad de Merge Sort si cambiáramos <= por < en el ciclo de fusión? Construye un ejemplo concreto donde el resultado cambia.

    Se rompería la estabilidad. Si se compara, por ejemplo, el elemento arr[i], que está a la izquierda, con el elemento arr[j] que está a la derecha, se colocaría primero el elemento de la derecha en el nuevo arreglo y no se respetería el orden original.

En el escenario StreamMX, los registros se ordenaron primero por fecha y luego se quieren ordenar por puntaje. ¿Por qué la estabilidad de Merge Sort garantiza que películas con el mismo puntaje mantengan su orden cronológico?   

    Porque se respeta el orden relativo original. Si se comparan dos puntajes iguales se colocaran de acuerdo a su orden anterior.


#IA-REFLEXIÓN-C:
    Los arreglos base (esos que tienen un solo elemento) ya están ordenados. Al combinarse dos subarreglos ordenados, naturalmente debe producirse un subarreglo más grande que también está ordenado. 
"""

import time
import random
import copy

# ─────────────────────────────────────────────────────────────
#  SECCIÓN 1: MERGE SORT
# ─────────────────────────────────────────────────────────────

# COMPRENDE-1: ¿Qué propiedad garantiza que merge() siempre
#              produce un subarreglo ordenado?
# 
# Los arreglos base siempre están ordenados, 
# por eso al combinar dos subarreglos ordenados 
# se produce un subarreglo ordenado más grande

# COMPRENDE-2: ¿Por qué el árbol de recursión tiene altura log₂(n)
#              y qué implica eso para la complejidad total?
# 
# Porque en cada iteración se divide a la mitad cada conjunto de datos. 
# Eso provoca que la complejidad sea O(log n)

def merge_sort(arr: list, inicio: int, fin: int, key=lambda x: x) -> None:
    """
    Ordena arr[inicio..fin] usando Merge Sort.
    DECISIÓN: Usar slicing haría que el código se viera más ordenado, pero ocuparía demasiada memoria porque se crearían copias de cada mitad del arreglo. Para ahorrar memoria es mejor solo usar variables para representar el primer y último índice del arreglo.
    """
    if inicio >= fin:
        return arr # Caso base: 0 o 1 elemento ya está ordenado

    # TODO: calcular el punto medio (división entera)
    medio = (inicio + fin) // 2

    merge_sort(arr, inicio, medio, key)   # TODO: llamada recursiva mitad izquierda
    merge_sort(arr, medio + 1, fin, key)   # TODO: llamada recursiva mitad derecha
    merge(arr, inicio, medio, fin, key)

    return arr


def merge(arr: list, inicio: int, medio: int, fin: int, key) -> None:
    """
    Fusiona dos subarreglos ordenados: arr[inicio..medio] y arr[medio+1..fin].
    DECISIÓN: Se usan arreglos auxiliares para evitar sobrescribir datos antes de haber comparado completamente cada uno de ellos.
    """
    # COMPRENDE-3: Invariante del ciclo de fusión:
    # Al finalizar cada iteración, arr[inicio..k-1] contiene los k-inicio
    # elementos más pequeños de izquierda y derecha, en orden.
    # 
    # Lo que quiere decir es que el arreglo resultante de la 
    # fusión contiene a los elementos ya procesados 
    # y ordenados de la mitad izquierda y la mitad derecha.

    izquierda = arr[inicio:medio + 1]
    derecha   = arr[medio + 1:fin + 1]

    i = 0; j = 0; k = inicio

    while i < len(izquierda) and j < len(derecha):
        # DECISIÓN: Se usa <= para mantener el orden original de los datos 
        # cuando se comparen dos elementos iguales. 
        # Si se usa solo < se perdería el orden original.
        if key(izquierda[i]) <= key(derecha[j]):
            arr[k] = izquierda[i]
            i += 1
        else:
            arr[k] = derecha[j]   # TODO
            j += 1
        k += 1

    while i < len(izquierda):
        arr[k] = izquierda[i]
        i += 1; k += 1

    while j < len(derecha):
        arr[k] = derecha[j]
        j += 1; k += 1;


# ─────────────────────────────────────────────────────────────
#  SECCIÓN 2: VERIFICACIÓN DE ESTABILIDAD
# ─────────────────────────────────────────────────────────────

def merge_sort_estable_demo():
    """
    Demuestra que Merge Sort es estable:
    elementos con la misma clave mantienen su orden relativo original.
    
    Contexto StreamMX: registros ordenados primero por fecha, luego por puntaje.
    Si el algoritmo es estable, películas con el mismo puntaje mantienen
    el orden cronológico de la ordenación anterior.
    
    REFLEXIONA-2: 
        Se mantuvo el orden cronológico. Si no se hubiera mantenido el orden, las películas más recientes que tienen el mismo puntaje que otras más viejas se hubieran colocado primero que estas últimas.
    """
    
    # Simulación: (titulo, puntaje, posicion_original_cronologica)
    registros = [
        ("Pelicula_C", 90, 1),   # más antigua con puntaje 90
        ("Pelicula_A", 85, 2),
        ("Pelicula_E", 90, 3),   # más reciente con puntaje 90
        ("Pelicula_B", 75, 4),
        ("Pelicula_D", 85, 5),
    ]

    merge_sort(registros, 0, len(registros) - 1, key=lambda x: x[1])

    print(registros)

    # Ordenar por puntaje (clave secundaria) usando merge_sort
    # Para usar merge_sort con tuplas, necesitas una versión con comparador
    # DECISIÓN: Solo es necesario utilizar una "clave", la cual será comparada en la condición del if.

    pass


# ─────────────────────────────────────────────────────────────
#  SECCIÓN 3: BENCHMARKING vs SEMANA 8
# ─────────────────────────────────────────────────────────────

def bubble_sort_s8(arr: list) -> None:
    """Referencia de Semana 8 para comparación empírica."""
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]


def medir_tiempo(func, arr: list, *args) -> float:
    """Mide tiempo sobre una copia — el arreglo original no se modifica."""
    copia = copy.deepcopy(arr)
    inicio = time.perf_counter()
    func(copia, *args)
    fin = time.perf_counter()
    return round(fin - inicio, 6)


def generar_arreglo(n: int, distribucion: str) -> list:
    if distribucion == 'aleatorio':
        return [random.randint(0, n * 10) for _ in range(n)]
    elif distribucion == 'ordenado':
        return list(range(n))
    elif distribucion == 'inverso':
        return list(range(n, 0, -1))
    raise ValueError(f"Distribución desconocida: {distribucion}")


def benchmark_completo():
    """
    ESTRATEGIA: 
        Debería haber una gran mejora, porque Bubble Sort es O(n²) en el peor de los casos mientras que Merge Sort es O(n log n) en todos los casos. Se notará más la diferencia en la distribución inversa, porque ese es el peor caso.
    """
    # REFLEXIONA-1: Esperaba que Merge Sort fuera mucho mejor en todos los casos, 
    # y en la práctica parece ser así. Dependiendo del tamaño de entrada y de
    # la distribución, el ahorro de tiempo está entre 30 y 250 veces al compararlo con 
    # Bubble Sort
    tamanios     = [1_000, 10_000, 100_000]
    distribuciones = ['aleatorio', 'ordenado', 'inverso']

    print(f"{'Algoritmo':<18} {'n':>8} {'Distribución':<12} {'Tiempo (s)':>12}")
    print("-" * 58)

    for n in tamanios:
        for dist in distribuciones:
            arr = generar_arreglo(n, dist)

            t_merge  = medir_tiempo(merge_sort, arr, 0, len(arr) - 1)

            # Solo incluir Bubble Sort para n <= 10_000 (O(n²) es muy lento para 100k)
            if n <= 10_000:
                t_bubble = medir_tiempo(bubble_sort_s8, arr)
                print(f"{'Bubble Sort (S8)':<18} {n:>8} {dist:<12} {t_bubble:>12.6f}")

            print(f"{'Merge Sort':<18} {n:>8} {dist:<12} {t_merge:>12.6f}")
        print()

    # VALIDA: Al pasar de n = 1000 a n = 10 000 en el algoritmo de Merge Sort 
    # hubo un incremento de tiempo de ~9 veces, mientras 
    # que en el de Bubble Sort fue de ~100 veces

def agrupar_por_puntaje(registros: list) -> dict:
    grupos = {}
    for r in registros:
        puntaje = r[1]
        if puntaje not in grupos:
            grupos[puntaje] = []
        grupos[puntaje].append(r)
    return grupos

def extraer_ids_por_puntaje(registros: list) -> dict:
    grupos = agrupar_por_puntaje(registros)
    resultado = {}

    for puntaje, lista in grupos.items():
        # usamos posición cronológica (índice 2)
        resultado[puntaje] = [r[2] for r in lista]

    return resultado

def verificar_estabilidad(antes: list, despues: list) -> None:
    ids_antes = extraer_ids_por_puntaje(antes)
    ids_despues = extraer_ids_por_puntaje(despues)

    for puntaje in ids_antes:
        assert ids_antes[puntaje] == ids_despues[puntaje], \
            f"Inestabilidad detectada en puntaje {puntaje}"

def experimento_estabilidad_streamMX():
    registros = [
        ("Pelicula_C", 90, 1),   # más antigua
        ("Pelicula_A", 85, 2),
        ("Pelicula_E", 90, 3),   # más reciente mismo puntaje
        ("Pelicula_B", 75, 4),
        ("Pelicula_D", 85, 5),
    ]

    # IMPORTANTE:
    # Este arreglo YA está en orden cronológico (simula paso 1 del sistema)

    antes = registros[:]  # copia para comparación

    # Paso 2: ordenar por puntaje (descendente)
    merge_sort(registros, 0, len(registros) - 1, key=lambda x: -x[1])

    despues = registros

    print("Antes (por fecha):")
    print(antes)

    print("\nDespués (por puntaje):")
    print(despues)

    # Verificación formal de estabilidad
    verificar_estabilidad(antes, despues)

    # IA-REFLEXION-B: Me hizo la pregunta: "Si ya ordenaste por fecha, ¿debería perderse ese orden relativo cuando aplicas el segundo criterio?"

# VALIDA:
def pruebas_casos_frontera():
    casos = {
        "vacio": [],
        "un_elemento": [42],
        "ya_ordenado": [1, 2, 3, 4, 5],
        "inverso": [5, 4, 3, 2, 1],
        "todos_iguales": [3, 3, 3],
        "con_duplicados": [3, 1, 2, 3, 2, 1, 3],
        "negativos": [9, -3, 0, 7, -1, 4]
    }

    for nombre, arr in casos.items():
        original = arr[:]

        # Ejecutar Merge Sort solo si hay elementos
        if len(arr) > 0:
            merge_sort(arr, 0, len(arr) - 1)

        print(f"\nCaso: {nombre}")
        print(f"Entrada : {original}")
        print(f"Salida  : {arr}")

        # Verificación de orden correcto
        assert arr == sorted(original), f"Error en caso: {nombre}"

    print("\n✔ Todos los casos frontera básicos pasaron")

# ─────────────────────────────────────────────────────────────
#  EJECUCIÓN
# ─────────────────────────────────────────────────────────────
if __name__ == '__main__':
    prueba = [64, 34, 25, 12, 22, 11, 90]
    copia  = prueba[:]
    merge_sort(copia, 0, len(copia) - 1)
    print("Merge Sort:", copia)   # Esperado: [11, 12, 22, 25, 34, 64, 90]

    print("\n--- DEMO ESTABILIDAD ---")
    merge_sort_estable_demo()

    print("\n--- BENCHMARK vs SEMANA 8 ---\n")
    benchmark_completo()

    experimento_estabilidad_streamMX()

    pruebas_casos_frontera()

    # Caso 1 — Subarreglo izquierdo de tamaño 1
    arr1 = [2, 1, 3, 4]
    expected1 = [1, 2, 3, 4]

    result1 = merge_sort(arr1, 0, len(arr1) - 1)
    assert result1 == expected1, f"Caso 1 falló: {result1} != {expected1}"

    # VALIDA: caso adversarial 1 → [1, 2, 3, 4] (igual a lo esperado)

    # Caso 2 — Error en cálculo del punto medio
    arr2 = [5, 4, 3, 2, 1]
    expected2 = [1, 2, 3, 4, 5]

    result2 = merge_sort(arr2, 0, len(arr2) - 1)
    assert result2 == expected2, f"Caso 2 falló: {result2} != {expected2}"
    
    # VALIDA: caso adversarial 2 → [1, 2, 3, 4, 5] (igual a lo esperado)

    # Caso 3 — Estabilidad con tuplas (puntaje, título)
    arr3 = [(10, "A"), (5, "B"), (10, "C"), (3, "D")]
    expected3 = [(3, "D"), (5, "B"), (10, "A"), (10, "C")]

    result3 = merge_sort(arr3, 0, len(arr3) - 1)
    assert result3 == expected3, f"Caso 3 falló (estabilidad): {result3} != {expected3}"
    
    # VALIDA: caso adversarial 3 → [(3, "D"), (5, "B"), (10, "A"), (10, "C")] (todo correcto)

    # Caso 4 — Subarreglos internos con inicio != 0
    arr4 = [9, 8, 7, 3, 2, 1, 6, 5, 4]
    expected4 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    result4 = merge_sort(arr4, 0, len(arr4) - 1)
    assert result4 == expected4, f"Caso 4 falló: {result4} != {expected4}"

    # VALIDA: caso adversarial 4 → [1, 2, 3, 4, 5, 6, 7, 8, 9] (igual a lo esperado)

    # IA-REFLEXION-A: La IA dijo que si no se usan los arreglos auxiliares el algoritmo terminaría 
    # "pisando" elementos después de comparar, lo que provocaría que se perdieran datos, 
    # eso hizo que me quedara clara su razón de ser.

# REFLEXIONA-3: Merge Sort necesita de arreglos auxiliares para dividir el arreglo original en 
# mitades. Es por eso que puede llegar a usar mucha memoria, cosa que se debe tener en cuenta 
# en equipos con memoria limitada.

# IA-REFLEXION-R: La de invariante de ciclo, le pedí a la IA 
# que me lo explicara varias veces de varias maneras

# VALIDA: caso 1 → esperado [] obtenido []
# VALIDA: caso 2 → esperado [42] obtenido [42]
# VALIDA: caso 3 → esperado [1, 2, 3, 4, 5] obtenido [1, 2, 3, 4, 5]
# VALIDA: caso 4 → esperado [5, 4, 3, 2, 1] obtenido [1, 2, 3, 4, 5]
# VALIDA: caso 5 → esperado [3, 3, 3] obtenido [3, 3, 3]
# VALIDA: caso 6 → esperado [3, 1, 2, 3, 2, 1, 3] obtenido [1, 1, 2, 2, 3, 3, 3]
# VALIDA: caso 7 → esperado [9, -3, 0, 7, -1, 4] obtenido [-3, -1, 0, 4, 7, 9]

# IA-REFLEXION-V: Solo hubo un problema. La función merge no devolvía nada, 
# y por eso no podía hacer la aserción. Solo tuve que hacer que devolviera el arreglo para
# resolver eso. Los casos en sí no presentaron ningún problema.


