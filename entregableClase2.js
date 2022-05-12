const fs = require("fs");


const fileToArray = async (fileName) => {
  try {
    return JSON.parse(await fs.promises.readFile(fileName));
  } catch (error) {
    console.log("Se produjo un error!");
    throw error;
  }
};


const arrayToFile = async (fileName, array) => {
  try {
   
    await fs.promises.writeFile(fileName, JSON.stringify(array));
  } catch (error) {
    throw error;
  }
};


const createEmptyFile = async (fileName) => {
  try {
    await fs.promises.writeFile(fileName, "[]");
  } catch (e) {
    throw error;
  }
};


const fileChecker = async (fileName) => {
  
  const stats = fs.existsSync(fileName);

  if (stats == false) {
    console.log(`Creo archivo vacio: ${fileName}`);
    await createEmptyFile(fileName);
  }
};

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

 
  async save(obj) {
    try {
      await fileChecker(this.fileName);

    
      let array = await fileToArray(this.fileName);
      let longitud = array.length;
      let index = 0;
     
      if (longitud == 0) {
        index = 1;
      } else {
        index = array[longitud - 1].id + 1;
      }

      obj.id = index;
      array.push(obj);  
      await arrayToFile(this.fileName, array);
      return obj.id;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {

      await fileChecker(this.fileName);

      let array = await fileToArray(this.fileName);

      array = array.filter((x) => {
        return x.id == id;
      });

      return array[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      await fileChecker(this.fileName);

  
      return  fileToArray(this.fileName);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      
      await fileChecker(this.fileName);
     
      let array = await fileToArray(this.fileName);
     
      array = array.filter((x) => {
        return x.id != id;
      });
      await arrayToFile(this.fileName, array);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    await createEmptyFile(this.fileName);
  }
}

async function main() {
  try {

    let objeto = {
      title: "",
      price: 0.0,
      thumbnail: "",
      id: 0,
    };

    objeto.title = "Producto1";
    objeto.price = 9.99;
    objeto.thumbnail = "http://URI";


    productos = new Contenedor("productos.txt");

    console.log('Llamo a save 11 veces');

    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));
    console.log(await productos.save(objeto));

    console.log('Traigo el elemento con id 8');

    console.log(await productos.getById(8));

    console.log('Borro el elemento con el ID 10');

    await productos.deleteById(10);

    console.log('Agrego un nuevo elemento');

    console.log(await productos.save(objeto));


    console.log('Traigo todos');
    console.log(await productos.getAll());


    console.log('Borro el elemento con el ID 8');

    await productos.deleteById(8);


    console.log('Agrego un nuevo elemento');

    console.log(await productos.save(objeto));

    console.log('Traigo todos para validar que no se repita ningun id');
    console.log(await productos.getAll());



    console.log('Vacio el archivo');
    await productos.deleteAll();


  } catch (error) {
    console.log("El error es: ", error);
  }
}

main();