// Esto es un comentario
/* Esto es un comentario
  de múltiples líneas
*/
// Tipos de Datos
// Boolean
let esActivo: boolean = true; // let: El ámbito es local, dentro del scope (funcion, ciclo, if, {})
var esActivo2: boolean = false; // var: El ámbito es global, funciona en todo el archivo
const esActivo3: boolean = true; // const: Para constantes, no se puede reasignar el valor

// Number
let entero: number = 12;
let enteroLargo: number = 123456789000;
let real: number = 3.1416;
let binario: number = 0b101;
let octal: number = 0o10;
let hexadecimal: number = 0xA;

// String
let sigla: string = 'SIS257';
let materia: string = 'Desarrollo de Aplicación Int/Internet II';
let concatenar: string = sigla + ' - ' + materia;
let concatenar2: string = `${sigla} - ${materia}`;
let mayusculas: string = materia.toUpperCase();
let minusculas: string = materia.toLowerCase();
let reemplazo: string = materia.replace(/a/g, '@');
let repetir: string = sigla.repeat(3);
let quitarEspaciosExtremos: string = ('      ' + materia + '   ').trim();
let subcadena: string = materia.substring(10, 20);
let longitud: number = materia.length;
let contiene: boolean = materia.includes('Int');
let caracter: string = materia.charAt(15);
let separar: string[] = materia.split(' ');

// Array
let numeros: number[] = [1, 2, 3, 4, 5];
let numeros2: number[] = [5, 2, 8, 6, 1, 3, 7, 4];
let letras: string[] = ['a', 'b', 'c', 'd'];
let longitudArray: number = numeros.length;
let dobles: number[] = numeros.map(numero => numero * 2);
let invertir: number[] = numeros.reverse();
let multiplicar: number = numeros.reduce((prev, cur) => prev * cur, 1);
let impares: number[] = numeros.reverse().filter(numero => numero % 2 !== 0);
let ordenar: number[] = numeros2.sort((a, b) => a - b);
letras.push('e');
letras.shift();
letras.pop();
letras.unshift('z');

// Tuple
let tuple = [1, 'uno', true] as [number, string, boolean];

// Enum
enum Sexo { M = 'Masculino', F = 'Femenio' };
enum Color { red = 'Rojo', yellow = 'Amarillo', green = 'Verde' };

// Any
let cualquierValor: any = 'Cualquier Valor';
cualquierValor = 123;
cualquierValor = true;

// Object
let objeto: object = { nombre: 'Juan', apellido: 'Pérez' };

// Estructuras de Control
let incluyeSigla: boolean;
if (concatenar.includes(sigla)) incluyeSigla = true;
else incluyeSigla = false;
incluyeSigla = concatenar.includes(sigla) ? true : false;
incluyeSigla = concatenar.includes(sigla);

// switch, while, do-while

for (let i = 0; i < letras.length; i++) console.log(`for clásico: ${letras[i]}`);
for (const letra of letras) console.log(`for of: ${letra}`);   // Obtiene valores
for (const indice in letras) console.log(`for in: ${indice}`); // Obtiene posiciones
letras.forEach(letra => console.log(`forEach: ${letra}`));

// Interface
interface IVehiculo {
  placa: string,
  chasis: string,
}
let automovil: IVehiculo = { placa: 'ABC-123', chasis: 'AFDADF545FD' };

// Funciones
function saludar(nombre: string, edad: number): void {
  console.log(`Mi nombre es ${nombre} y tengo ${edad}`);
}
saludar('Juan', 19);

function sumar(numero1: number, numero2: number): number {
  return numero1 + numero2;
}

const sumar2 = (numero1: number, numero2: number): number => numero1 + numero2;

console.log(sumar2(5, 7));
