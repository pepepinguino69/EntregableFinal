const { promises: fs, readFile } = require("fs");

const Contenedor = class Contenedor {
    constructor(path) {
        this.path = path;}
    
    async save(newObject){
        const data = JSON.parse(await fs.readFile(this.path, "utf8"));
        if (data != "") {
            newObject.id = Math.max(...data.map((o) => o.id)) + 1;
        } else {
            newObject.id = 1;
        }
        data.push(newObject);
        await fs.writeFile(this.path, JSON.stringify(data), "utf8");
        return await data;
    };

    async getAll(){
        const data = JSON.parse(
            await fs.readFile(this.path, "utf8", (err, data) => {
                if (err) {
                    console.log(err);
                }
            }
            )
        );
        return data;
    };

    async putById(id,body){
        let found = false;
        const data = await this.getAll();
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                found = true
                data[i].price=body.price;
                data[i].title=body.title;
                data[i].url=body.url
                return await fs.writeFile(
                this.path, JSON.stringify(data),"utf8", (err, data) => {
                    if (err) { console.log(err); }
                })
                
            
            }
        } if (!found) return 'el id seleccionado no existe'
    };

    async getById(id){
        let found = false;
        const data = await this.getAll();
        if(id==-1){id = Math.floor(Math.random()*data.length)}
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                found = true
                return data[i];
            }
        } if (!found) return 'el id seleccionado no existe'
    };

    async deleteById(id){
        const data = JSON.parse(await fs.readFile(this.path, "utf8", (err, data) => {
            ;
            if (err) {
                console.log(err);
            }
        }))
        const newData = data.filter((item) => item.id != id);
        if (newData.length != data.length) {
            return await fs.writeFile(
                this.path, JSON.stringify(newData),"utf8", (err, data) => {
                    if (err) { console.log(err); }
                })
        }
        else {
            return 'El id seleccionado no existe'
        }
    }
        

    async deleteAll(){
        const data = [];
        return await fs.writeFile(this.path, JSON.stringify(data), (err, data) => {
            if (err) {
                console.log(err);
            }
        })
    }
}	


module.exports = class Contenedor{};
//prueba = () => {
		//console.log(this.path);
	//};
module.exports = {Contenedor:Contenedor} 





//********************************************************************* //
//Para probar basta sacar descomentar las lineas que siguen              //
//La Sugerencia es hacerlo de dos en dos para poder ver los resultados
//La entrega incluye un Archivos pord.txt que es un backup de productos.txt//
// su funcion es poder volver a tener un set de 8 productos
//********************************************************************* //

//const myInstance = new Contenedor("./productos.txt");
//console.log('mostrar id 6');
//myInstance.getById(6).then((data) => console.log(data));
//console.log("mostrar todos");
//myInstance.getAll().then((data) => console.log(data));
//console.log('eliminar el 6')
//myInstance.deleteById(6)
//console.log("tratar de mostrar id 6");
//myInstance.getById(6).then((data) => console.log(data));
//myInstance.getAll().then((data) => console.log(data));
//console.log('agregar album del mundial ')
//myInstance.save(newObject)
//    .then((data) => console.log(`elproducto fue creado con el id ${data}`));
//myInstance.getById(10).then((data) => console.log(data));
//console.log('borrar todos los productos')
//myInstance.deleteAll()
//myInstance.save(newObject).then((data) =>
//    console.log(`elproducto fue creado con el id ${data}`));

