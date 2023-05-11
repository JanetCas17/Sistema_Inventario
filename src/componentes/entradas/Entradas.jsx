import React, { useEffect, useContext } from 'react'
import { useState } from 'react';
import { requestGet } from '../../ayudas/requestGet';
import { requestPost } from '../../ayudas/requestPost';
import { useFetch_RequestGet } from '../../ayudas/useFetch_RequestGet';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../ayudas/useForm';
import useUser from '../../hooks/useUser';


export default function Entradas() {


    const [productos, setProductos] = useState();

    useEffect(() => {
        requestGet('consultarProductos')
        .then(data => {
            setProductos(JSON.parse(data)); 
        })
    }, [])



    const [getDataProducts, setDataProducts] = useState([]);

    const { dataForm, handleOnChange } = useForm({});

    const [movimiento, setMovimiento] = useState([]);
    const [admitido, setAdmitido] = useState(false);
    const [show, setShow] = useState(false);
    const [idEntrada, setIdEntrada] = useState(0);
    const [idProducto, setIdProducto] = useState(0);
    const [productosEntradaDetalle, setProductosEntradaDetalle] = useState([]);

    const [productoSeleccionado, setProductoSeleccionado] = useState('');

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true)
    };

    const userData = useUser(); // Custom hook, es mi contexto de usuario, lo uso para obtener el id del usuario que esta logueado


    useEffect(() => {

        try {
            
                requestGet('getTipoMovimiento')
                .then( data => {
                    setMovimiento(JSON.parse(data));
                })

                


        } catch (error) {
            console.log(error);
        }


    }, [])


    const capturarPro = () => {


        const formData = new FormData();
/* 
        console.log('idMovimiento: ', dataForm.tipoMov); */


        formData.append('idusuario', userData.id);
        formData.append('idMovimiento', dataForm.tipoMov);
        formData.append('fecha', dataForm.fecha);
        formData.append('observaciones', dataForm.observaciones);

        requestPost('insertEntrada', formData)
            .then( (data) => {
                console.log('data: ', data);
                if (JSON.parse(data) > 1) {
                    setAdmitido(true);
                    setIdEntrada(JSON.parse(data))
                    //console.log('productos: ', JSON.parse(productos));
                    //setDataProducts(productos);
/*                     console.log('getDataPro: ', (getDataProducts));
 */                }
                else {
                    setAdmitido(false);

                }/* 
                console.log(data); */
            })
    }

    const agregarEntrada = (id,pro) => {
        
        handleClose();
        setProductoSeleccionado(pro);
        setIdProducto(id)
        
        console.log('productoSeleccionado: ', productoSeleccionado);
    }

    const entradaDetalle = () =>{
        const formData = new FormData();

        formData.append('idEntrada', idEntrada);
        formData.append('idProducto', idProducto);
        formData.append('cantidad', dataForm.cantidad);
        formData.append('precio', dataForm.precio);

        requestPost('insertEntradaDetalle', formData)
            .then( (data) => {
                console.log('entrada detalle: ', data);
                //handleOnChange({cantidad:'', costo:''});
                    requestGet(`consultarEntradaDetalle&idEntrada=${idEntrada}`)
                        .then((data) => {
                            console.log('Consultar entradadetalle: ', data);
                            setProductosEntradaDetalle(JSON.parse(data));
                        })
                        setProductoSeleccionado('');
                        dataForm.cantidad = '';
                if(JSON.parse(data) > 0){
                    
                }
            })


    }

    return (
        <>
            <div class="container">
                <div class="mx-auto">
                    <div class="card card-primary justify-content-center">
                        <div class="card-header ">
                            <h3 class="card-title">Registro de entrada de inventario</h3>
                        </div>
                        <form id="frm_entrada">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-6">
                                        <label for="idtipo">Tipo de movimiento</label>
                                        <select className='form-control' name="tipoMov" id="idtipo" onChange={handleOnChange}>
                                            <option selected value="0">Seleccione un tipo de movimiento</option>
                                            {
                                                movimiento && movimiento.map((movimiento, index) => (
                                                    <option
                                                        key={index}
                                                        value={movimiento?.idtipo}
                                                    >
                                                        {movimiento?.nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>



                                    </div>

                                    <div class="col-6">
                                        <label for="fecha">Fecha de entrada</label>
                                        <input type="date" id="fecha" onChange={handleOnChange} name="fecha" class="form-control" placeholder="Fecha de entrada" />
                                    </div>

                                    <div class="col-12">
                                        <label for="observaciones">Observaciones</label>
                                        <textarea id="observaciones" onChange={handleOnChange} name="observaciones" class="form-control" placeholder="Observaciones"></textarea>
                                    </div>

                                </div>


                            </div>
                            <div class="card-footer text-center">
                                <div class="row">
                                    <div class="col-12" id="footer">

                                        {
                                            admitido ?

                                                <table>
                                                    <thead>
                                                        <th className='col-2'>Descripcion</th>
                                                        <th className='col-2'></th>
                                                        <th className='col-2'>Cantidad</th>
                                                        <th className='col-2'>Costo</th>
                                                        <th className='col-2'></th>
                                                    </thead>
                                                    <tbody>
                                                        <td>
                                                            <input className='form-control' disabled name='productoName' type="text" value={productoSeleccionado} />
                                                            <input type="hidden" value={idProducto} onChange={handleOnChange}/>
                                                        </td>
                                                        <td>
                                                            <button type='button' className='' onClick={handleShow}>
                                                                <i class="bi bi-search"></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <input className='form-control' type="number" name="cantidad" id="" value={dataForm.cantidad} onChange={handleOnChange} />
                                                        </td>
                                                        <td>
                                                            <input className='form-control' type="number" name="precio" id="" value={dataForm.costo} onChange={handleOnChange}/>
                                                        </td>
                                                        <td>
                                                            <button type='button' className='btn btn-success' onClick={entradaDetalle}>
                                                                <i class="bi bi-bag-plus-fill"></i>
                                                            </button>
                                                        </td>
                                                        {
                                                            productosEntradaDetalle &&
                                                            productosEntradaDetalle.map((producto, index) => (
                                                                <tr key={index}>
                                                                    <td>{producto?.nombre}</td>
                                                                    <td></td>
                                                                    <td>{producto?.cantidad}</td>
                                                                    <td>{producto?.precio}</td>
                                                                    <td></td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                :
                                                <div class="btn btn-primary" onClick={capturarPro}>Capturar productos</div>

                                        }
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    Producto
                                </th>
                                <th>
                                    Descripcion
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
                                                                
                                                                 <div className="row">
                                                                    <div className="col-4">
                                                                       
                                                                        <button className=' btn btn-primary' onClick={() =>agregarEntrada(producto.idproducto, producto.nombre)}>
                                                                        <i class="bi bi-bookmark-plus"></i>
                                                                        </button>
                                                                        

                                                                    </div>

                                                                </div>

                                                                
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            
                                            }
                                           
                                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>

    )
}
