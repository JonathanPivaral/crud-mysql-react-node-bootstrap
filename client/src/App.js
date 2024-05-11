import './App.css';
import { useState } from "react";
import Axios from "axios";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';



function App() {


  //Creacion de variables
  
  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState();
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState();
  const [id,setid] = useState();

  const [editar,setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);


  //constante que llevara el url del methodo POST de nuestro servidor
  const createEmp = ()=>{
    axios.post("http://localhost:3001/create",
    {
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }  ).then(()=>{
      getEmp();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con éxito!</i>",
        icon: 'success'
      })
    });
  }

  const updateEmp = ()=>{
    axios.put("http://localhost:3001/update",
    {
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }  ).then(()=>{
      getEmp();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con éxito!</i>",
        icon: 'success'
      }).then(res=>{
        if (res) {
          
        }
      })
    });
  }

  const deleteEmp = (value)=>{

    Swal.fire({
      title: "Confirmar eliminado",
      html: "<i>Realmente desea eliminar a <strong>"+value.nombre+"</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/delete/${value.id}`).then(()=>{
        getEmp();
        limpiarCampos();
        Swal.fire({
          title: "Eliminado!",
          text: value.nombre + " fue eliminado.",
          icon: "success",
          timer: 3000
        });
        });
      }
    });
    
  }

  const limpiarCampos = ()=>{
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);
  }

  const editarEmp = (value)=>{
    setEditar(true);

    setNombre(value.nombre);
    setEdad(value.edad);
    setCargo(value.cargo);
    setPais(value.pais);
    setAnios(value.anios);
    setid(value.id);
  }

  const getEmp = ()=>{
    axios.get("http://localhost:3001/empleados",).then((response)=>{
      setEmpleados(response.data);
    })
  }

  getEmp();

  return (
    <div className="container">
          <div className="card text-center">
            <div className="card-header">
              GESTION DE EMPLEADOS
            </div>
            <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input type="text" 
              onChange={(event) =>{
                setNombre(event.target.value);
              }}
              className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Edad:</span>
              <input type="number" value={edad}
              onChange={(event) =>{
                setEdad(event.target.value);
              }}
              className="form-control" placeholder="Ingrese edad" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
               
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">País:</span>
              <input type="text" value={pais}
              onChange={(event) =>{
                setPais(event.target.value);
              }}
              className="form-control" placeholder="Ingrese país" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">cargo:</span>
              <input type="text" value={cargo}
              onChange={(event) =>{
                setCargo(event.target.value);
              }}
              className="form-control" placeholder="Ingrese cargo" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">años:</span>
              <input type="number" value={anios}
              onChange={(event) =>{
                setAnios(event.target.value);
              }}
              className="form-control" placeholder="Ingrese años" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            </div>
            <div className="card-footer text-muted">
              {
                editar==true?
                <div>
                <button className='btn btn-warning m-2' onClick={updateEmp}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
                </div>
                :<button className='btn btn-success' onClick={createEmp}>Registrar</button>
              }
              
            </div>
          </div>
          <table className="table table-dark table-striped">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Edad</th>
                <th scope="col">Pais</th>
                <th scope="col">Cargo</th>
                <th scope="col">Experiencia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
               {
                empleadosList.map((value,key)=>{
                  return <tr key={value.id}>
                        <th scope="row">{value.id}</th>
                        <td>{value.nombre}</td>
                        <td>{value.edad}</td>
                        <td>{value.pais}</td>
                        <td>{value.cargo}</td>
                        <td>{value.anios}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" 
                          onClick={()=>{
                            editarEmp(value)
                          }}
                          className="btn btn-warning">Editar</button>
                          <button type="button" onClick={()=>{
                            deleteEmp(value);
                          }} className="btn btn-danger">Eliminar</button>
                        </div>
                        </td>
                        </tr>
                        })
              }
              
            </tbody>
          </table>
    </div>
  );
}

export default App;
