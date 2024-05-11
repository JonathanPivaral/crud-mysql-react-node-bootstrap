const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


//constante que tendra la cadena de conexion de mysql
const db = mysql.createConnection({
    host:"sql3.freesqldatabase.com",
    user:"sql3705186",
    password:"VeSCjDyYHv",
    database:"sql3705186"
});


//POST para crear un nuevo empleado
app.post("/create",(solicitud,respuesta)=>{
    const nombre = solicitud.body.nombre;
    const edad = solicitud.body.edad;
    const pais = solicitud.body.pais;
    const cargo = solicitud.body.cargo;
    const anios = solicitud.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
    (error,result)=>{
        if (error) {
            console.log(error)
        }else{
            respuesta.send(result);
        }
    }
    );
})

//SELECT para mostrar empleados
app.get("/empleados",(solicitud,respuesta)=>{
     db.query('SELECT * FROM empleados',
    (error,result)=>{
        if (error) {
            console.log(error)
        }else{
            respuesta.send(result);
        }
    }
    );
})

//Update para actualizar empleados

app.put("/update",(solicitud,respuesta)=>{
    const id = solicitud.body.id;
    const nombre = solicitud.body.nombre;
    const edad = solicitud.body.edad;
    const pais = solicitud.body.pais;
    const cargo = solicitud.body.cargo;
    const anios = solicitud.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
    (error,result)=>{
        if (error) {
            console.log(error)
        }else{
            respuesta.send(result);
        }
    }
    );
})

app.delete("/delete/:id",(solicitud,respuesta)=>{
    const id = solicitud.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
    (error,result)=>{
        if (error) {
            console.log(error)
        }else{
            respuesta.send(result);
        }
    }
    );
})

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})