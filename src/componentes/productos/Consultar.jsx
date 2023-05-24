import React, { useEffect } from "react";
import { useState } from "react";
import {requestGet} from "../../ayudas/requestGet"; 

export default function Ingresar(){

    const [productos, setProductos] = useState();

    useEffect(() => {
        requestGet('consultarProductos')
        .then(data => {
            console.log(data);
            setProductos(JSON.parse(data));
        })
    }, [])


    return(
        <div class="container">
                    <div class="col-md-12 offset-md-1">
                        <div class="card card-primary justify-content-center">
                            <div class="card-header ">
                                <h3 class="card-title">Consultar productos</h3>
                            </div>
                                <div class="card-body">
                                    
                                    <table class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Nombre del producto
                                                </th>
                                                <th>
                                                    Descripción del producto
                                                </th>
                                                <th>
                                                    Stock Mínimo
                                                </th>
                                                <th>
                                                    Stock Máximo
                                                </th>
                                                <th>
                                                    Operaciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="cuerpoTabla">
                                            {
                                                productos &&
                                                 productos.map((producto, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {producto.nombre}
                                                            </td>
                                                            <td>
                                                                {producto.descripcion}
                                                            </td>
                                                            <td>
                                                                {producto.stockminimo}
                                                            </td>
                                                            <td>
                                                                {producto.stockmaximo}
                                                            </td>
                                                            <td>
                                                                <div className="row">
                                                                    <div className="col-4">
                                                                        <div class="btn btn-outline-dark"  >Editar</div>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div class="btn btn-dark"  >Eliminar</div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            
                                            }
                                           
                                        </tbody>
                                    </table>
                                    
                
                                </div>
                                
                            </div>
                        </div>
                </div>
    )

}