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
console.log(letras);
//# sourceMappingURL=index.js.map