"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Esto es un comentario
/* Esto es un comentario
  de múltiples líneas
*/
// Tipos de Datos
// Boolean
let esActivo = true; // let: El ámbito es local, dentro del scope (funcion, ciclo, if, {})
var esActivo2 = false; // var: El ámbito es global, funciona en todo el archivo
const esActivo3 = true; // const: Para constantes, no se puede reasignar el valor
// Number
let entero = 12;
let enteroLargo = 123456789000;
let real = 3.1416;
let binario = 0b101;
let octal = 0o10;
let hexadecimal = 0xA;
// String
let sigla = 'SIS257';
let materia = 'Desarrollo de Aplicación Int/Internet II';
let concatenar = sigla + ' - ' + materia;
let concatenar2 = `${sigla} - ${materia}`;
let mayusculas = materia.toUpperCase();
let minusculas = materia.toLowerCase();
let reemplazo = materia.replace(/a/g, '@');
let repetir = sigla.repeat(3);
let quitarEspaciosExtremos = ('      ' + materia + '   ').trim();
let subcadena = materia.substring(10, 20);
let longitud = materia.length;
let contiene = materia.includes('Int');
let caracter = materia.charAt(15);
let separar = materia.split(' ');
// Array
let numeros = [1, 2, 3, 4, 5];
let numeros2 = [5, 2, 8, 6, 1, 3, 7, 4];
let letras = ['a', 'b', 'c', 'd'];
let longitudArray = numeros.length;
let dobles = numeros.map(numero => numero * 2);
let invertir = numeros.reverse();
let multiplicar = numeros.reduce((prev, cur) => prev * cur, 1);
let impares = numeros.reverse().filter(numero => numero % 2 !== 0);
let ordenar = numeros2.sort((a, b) => a - b);
letras.push('e');
letras.shift();
letras.pop();
letras.unshift('z');
// Tuple
let tuple = [1, 'uno', true];
// Enum
var Sexo;
(function (Sexo) {
    Sexo["M"] = "Masculino";
    Sexo["F"] = "Femenio";
})(Sexo || (Sexo = {}));
;
var Color;
(function (Color) {
    Color["red"] = "Rojo";
    Color["yellow"] = "Amarillo";
    Color["green"] = "Verde";
})(Color || (Color = {}));
;
// Any
let cualquierValor = 'Cualquier Valor';
cualquierValor = 123;
cualquierValor = true;
// Object
let objeto = { nombre: 'Juan', apellido: 'Pérez' };
// Estructuras de Control
let incluyeSigla;
if (concatenar.includes(sigla))
    incluyeSigla = true;
else
    incluyeSigla = false;
incluyeSigla = concatenar.includes(sigla) ? true : false;
incluyeSigla = concatenar.includes(sigla);
// switch, while, do-while
for (let i = 0; i < letras.length; i++)
    console.log(`for clásico: ${letras[i]}`);
for (const letra of letras)
    console.log(`for of: ${letra}`); // Obtiene valores
for (const indice in letras)
    console.log(`for in: ${indice}`); // Obtiene posiciones
letras.forEach(letra => console.log(`forEach: ${letra}`));
let automovil = { placa: 'ABC-123', chasis: 'AFDADF545FD' };
// Funciones
function saludar(nombre, edad) {
    console.log(`Mi nombre es ${nombre} y tengo ${edad}`);
}
saludar('Juan', 19);
function sumar(numero1, numero2) {
    return numero1 + numero2;
}
const sumar2 = (numero1, numero2) => numero1 + numero2;
console.log(sumar2(5, 7));
//# sourceMappingURL=index.js.map