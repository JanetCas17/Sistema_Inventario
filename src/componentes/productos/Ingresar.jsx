import React, { useState } from 'react'
import { requestPost } from '../../ayudas/requestPost';

export default function Ingresar() {

   
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [minimo, setMinimo] = useState('');
    const [maximo, setMaximo] = useState('');


     const onSubmit = (e) => {
        e.preventDefault();
        

        const formData = new FormData();
        
        formData.append('nombre', nombre)
        formData.append('descripcion', descripcion)
        formData.append('minimo', minimo)
        formData.append('maximo', maximo)

        requestPost('agregar_productos', formData)
            .then(response => {
                console.log(response);
            })

    } 

  return (
                <div class="container">
                    <div class="mx-auto">
                        <div class="card card-primary justify-content-center">
                            <div class="card-header ">
                                <h3 class="card-title">Datos del producto</h3>
                            </div>
                            <form >
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="pNombre">Nombre del producto</label>
                                        <input type="text"  name="nombre" onChange={(e) => setNombre(e.target.value)} class="form-control" id="pNombre" placeholder="Nombre del producto"/>
                                        </div>
                                    <div class="form-group">
                                        <label for="pDescripcion">Descripcion del producto</label>
                                        <input type="text" name="descripcion" onChange={(e) => setDescripcion(e.target.value)}  class="form-control" id="pDescripcion" placeholder="Descrripcion del producto"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pMinimo">Stock Minimo</label>
                                        <input type="text" name="minimo" onChange={(e) => setMinimo(e.target.value)}   class="form-control" id="pMinimo" placeholder="Stock minimo del producto"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="pMaximo">Stock Maximo</label>
                                        <input type="text" name="maximo"  onChange={(e) => setMaximo(e.target.value)}  class="form-control" id="pMaximo" placeholder="Stock mXIMO del producto"/>
                                    </div>
                
                                </div>
                                <div class="card-body">
                                    <div class="btn btn-success"  onClick={onSubmit} >Guardar Producto</div>
                                </div>
                            </form>
                            </div>
                        </div>
                </div>
  )
}