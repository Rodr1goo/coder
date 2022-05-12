class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    
    }


    getFUllName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(name,author){
        this.libros.push({nombre:name,autor:author});
    }

    getBookNames(){
        return this.libros.map(({ nombre }) => nombre);
    }
}

let usuario = new Usuario('Rodrigo','Flores',[{nombre:'anatomía clínica',autor:'PRO'}],['perro','gato', 'loro']);


let usuario2 = new Usuario('Sofia', 'Carrizo', [{nombre:'anatomía para estudiantes', autor:'Moore'}], ['cerdo', 'vaca']);
    
console.log(usuario);

console.log(usuario2);