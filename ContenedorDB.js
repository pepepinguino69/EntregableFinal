
export const Contenedor = class ContenedorDB {
    constructor(instance,database,selectedTable,options) {
        this.database=database
        this.selectedTable = selectedTable;
        this.options=options;
        this.instance=instance
    }
 

    async init (database,engine) {
        //validamos si la tablaya existe en la base de datos
       const articulosArray = [
    
        {title: "escuadra array",stock:80, price: 99.45, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/mern.jfif?v=1664091624152" },
        {title: "regla",stock:60, price: 9.45, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/regla.jfif?v=1664121572244" },
        {title: "transportador",stock:15, price: 9999.45, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/transportador.jfif?v=1664121609963" },
        {title: "compas",stock:10, price: 0.99, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/compas.jfif?v=1664121223791" },
        {title: "mouse",stock:20, price: 88.88, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/mouse.jfif?v=1664121398670" },
        {title: "teclado",stock:100, price: 888.88, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/keyboard.jfif?v=1664180232239" },
        {title: "monitor",stock:45, price: 777.45, url: "https://cdn.glitch.global/786523fc-0d05-4caa-afba-8403d0037b78/monitor.jfif?v=1664121446179" }]
        const tableExistsChat = await this.database.schema.hasTable('chat');
        const tableExistsProductos = await this.database.schema.hasTable('productos');
        console.log("ACA");//
        if (engine == "mySql" && (!tableExistsProductos)) {
            console.log("creanto tabla");
            await database.schema.createTable(this.selectedTable, table => {
                table.increments("id");
                table.string("title", 15).nullable(true);
                table.integer("stock").nullable(true);
                table.float("price").nullable(true);
                table.string("url", 255);
            })
                try {
                    articulosArray.forEach(e => {
                        console.log(e);
                        let r = database("productos").insert(e).then(()=>{})
                    })}
                           catch(err){console.log(err)};

                }
        
        if (engine=="Sqlite" && (!tableExistsChat)){
            await this.database.schema.createTable(this.selectedTable, table => {
            table.increments("id");
            table.string("timestamp",50);
            table.string("username", 25).nullable(false);
            table.string("message", 255);
                })
        };
    }

    
    async save(newObject){ 
    this.database(this.selectedTable)
			.insert(newObject)
			.then(() => {});
    return newObject;
    }

    async getAll() {
        const result = this.database
					.select("*").from(this.selectedTable)
					
        //console.log(await result,this.selectedTable);
        return result
      
    }

    async putById(id, body) {
        this.database(this.selectedtable)
					.where({ id: id })
					.update(body)
					.then(() => {});
    }

    async getById(id) {
        const result = await this.database
					.select("*")
					.from(this.selectedTable)
					.where({ id: id })
					.then(() => {});
        const records = result.map((elm) => ({ ...elm }));
		
        return records;
        
		
    }

    async deleteById(id) {
        await this.database("articulos")
					.where("id", id)
					.del()
					.then(() => {});

        this.database.destroy();
    }
			

    async deleteAll() {
        await this.database('articulos').del();
        this.database.destroy();

    };
}
