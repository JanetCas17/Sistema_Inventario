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
                    <div class="mx-auto">
                        <div class="card card-primary justify-content-center">
                            <div class="card-header ">
                                <h3 class="card-title">Consultar productos</h3>
                            </div>
                                <div class="card-body">
                                    
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Nombre del producto
                                                </th>
                                                <th>
                                                    Descripcion del producto
                                                </th>
                                                <th>
                                                    Stock Minimo
                                                </th>
                                                <th>
                                                    Stock Maximo
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
                                                                        <div class="btn btn-primary"  >Editar</div>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <div class="btn btn-danger"  >Eliminar</div>
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