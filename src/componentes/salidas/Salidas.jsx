import React, {useState, useEffect} from 'react'
import { requestGet } from '../../ayudas/requestGet';
import { requestPost } from '../../ayudas/requestPost';
import SalidaModal from './SalidaModal';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import useUser from '../../hooks/useUser';
import { useForm } from '../../ayudas/useForm';

export default function Salidas() {

    const [movimiento, setMovimiento] = useState('');
    const [user, setUser] = useState('');

    const [admitido , setAdmitido] = useState(false);
    const [usuario , setUsuario] = useState('');
    const [contrasena , setContrasena] = useState('');
    const [idUsuario, setIdUsuario] = useState('');

    const [capturar, setCapturar] = useState(false);

    const [opcion, setOpcion] = useState('');

    const [modal, setModal] = useState(false);

    const [show, setShow] = useState(false);

    const userData = useUser();

    const { dataForm, handleOnChange } = useForm({});

    const [productos, setProductos] = useState();

    const [idSalida, setIdSalida] = useState(0);
    const [idProducto, setIdProducto] = useState(0);
    const [productosSalidaDetalle, setProductosSalidaDetalle] = useState([]);

    const [productoSeleccionado, setProductoSeleccionado] = useState('');


    useEffect(() => {
        requestGet('consultarProductosExistencia')
        .then(data => {
            console.log(JSON.parse(data))
            setProductos(JSON.parse(data)); 
        })
    }, []) //Nomas llegando hago una consulat de los productos que hay en existencia

    const agregarSalida = (id,pro) => {
        
        handleClose();
        setProductoSeleccionado(pro);
        setIdProducto(id)
        
        console.log('productoSeleccionado: ', productoSeleccionado);
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        setAdmitido(false);
        setCapturar(false);
    }, [opcion])



    const usuarioChange = (e) =>{
        setUsuario(e.target.value);
        
    }

    const contrasenaChange = (e) =>{
        setContrasena(e.target.value);
        
    }

    const onSubmit = () =>{

        requestGet(`existing_user&usuario=${usuario}&contrasena=${contrasena}`)
            .then((res) => {
                console.log('Esta es la respuesta de existing_user, ',res);
                console.log('La respuest del login, ',res);
                console.log('Quien eres: ',JSON.parse(res)[0]);

                if(JSON.parse(res)[0].idusuario != null){
                    setIdUsuario(JSON.parse(res)[0].idusuario);
                    
                    console.log('Este es el usuario,',user )
                    console.log('id usuario conJSON,',JSON.parse(res)[0].idusuario )
                    setIdUsuario(JSON.parse(res)[0].idusuario);
                    console.log('id usuario con estados,',idUsuario )
                    //alert('Bienvenido');
                    setAdmitido(true);
                    console.log('capturarSalida funcion ');
                        const formData = new FormData();

                        formData.append('idusuarioasigna', JSON.parse(res)[0].idusuario);
                        formData.append('idMovimiento', dataForm?.tipoMov);
                        formData.append('idusuarioregistra', userData?.id);
                        formData.append('fecha', dataForm?.fechaEntrada);
                        formData.append('observaciones', dataForm?.observaciones);

                        requestPost('insertSalida', formData)
                            .then((data) =>{
                                if(JSON.parse(data) > 1){
                                    setCapturar(true);
                                    setIdSalida(JSON.parse(data))
                                }else{
                                    setCapturar(false);
                                }
                                console.log('data, ',data);
                            })
                                
                            /*  capturarSalida(); */
                            }else{
                                alert('Usuario o contraseña incorrectos');
                                setAdmitido(false);
                            } 
            })

    }

    

    useEffect(() => {
        requestGet('getTipoMovimientoSalida')
        .then(data =>{
            setMovimiento(JSON.parse(data));
        })
        requestGet('getUser') //Si es necesasrio, para el select de los usuarios 
        .then(data =>{
            setUser(JSON.parse(data));
        })
        setAdmitido(false);
    },[])

    const capturarSalida = () =>{
        console.log('capturarSalida funcion ');
            const formData = new FormData();

            formData.append('idusuarioasigna', idUsuario);
            formData.append('idMovimiento', dataForm?.tipoMov);
            formData.append('idusuarioregistra', userData?.id);
            formData.append('fecha', dataForm?.fechaEntrada);
            formData.append('observaciones', dataForm?.observaciones);

            requestPost('insertSalida', formData)
                .then((data) =>{
                    if(JSON.parse(data) > 1){
                        setCapturar(true);
                    }else{
                        setCapturar(false);
                    }
                    console.log('data, ',data);
                })
        
    }

    const changeModal = () => {
        setModal(!modal);
        
        console.log(modal);
    }

    const salidaDetalle = () =>{
        const formData = new FormData();

        formData.append('idSalida', idSalida);
        formData.append('idProducto', idProducto);
        formData.append('cantidad', dataForm.cantidad);

        requestPost('insertSalidaDetalle', formData)
            .then( (data) => {
                console.log('entrada detalle: ', data);
                //handleOnChange({cantidad:'', costo:''});
                if(JSON.parse(data)){
                    alert(data);
                }
                
                    requestGet(`consultarSalidaDetalle&idSalida=${idSalida}`)
                        .then((data) => {
                            console.log('Consulatar Salidadetalle: ', data);
                            setProductosSalidaDetalle(JSON.parse(data));
                        })
                    
            })


    }

  return (
    <>
    <div class="container">
    <div class="mx-auto">
        <div class="card card-primary justify-content-center">
            <div class="card-header ">
                <h3 class="card-title">Registro de salida de inventario</h3>
            </div>
            <form id="frm_entrada">
                <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                            <label for="idtipo">Tipo de movimiento</label>
                            <select className='form-control' name="tipoMov"  onChange={handleOnChange} id="idtipo">
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
                                <input type="date" id="fechaEntrada" name="fechaEntrada" onChange={handleOnChange} class="form-control" placeholder="Fecha de entrada"/>
                            </div>

                            <div class="col-6">
                                <label for="idusuario">Usuario</label>
                                <select className='form-control' name="idusuario" id="idusuario"  onChange={usuarioChange}>
                                    <option selected value="0">Seleccione un usuario</option>
                                    {
                                        user && user.map((user, index) => (
                                            <option 
                                                key={index} 
                                                value={user?.usuario}
                                                >
                                                {user?.usuario}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div class="col-6">
                                <label for="fecha">Contrasena</label>
                                <input type="password" name='contrasena' onChange={contrasenaChange} id="pass"class="form-control" placeholder="Ingrese su contrasena"/>
                            </div>
                            
                            <div class="col-12">
                                <label for="observaciones">Observaciones</label>
                                <textarea id="observaciones" name="observaciones"  onChange={handleOnChange} class="form-control" placeholder="Observaciones"></textarea>
                            </div>

                        </div>
                        
                        
                    </div>
                        <div class="card-footer text-center">
                            <div class="row">
                                <div class="col-12" id="footer">
                                    {
                                        capturar ?
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
                                                            <input className='form-control' disabled type="number" name="precio" id="" value={dataForm.costo} onChange={handleOnChange}/>
                                                        </td>
                                                        <td>
                                                            <button type='button' className='btn btn-success' onClick={salidaDetalle}>
                                                                <i class="bi bi-bag-plus-fill"></i>
                                                            </button>
                                                        </td>
                                                        {
                                                            productosSalidaDetalle &&
                                                            productosSalidaDetalle.map((producto, index) => (
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
                                        <button type="button" onClick={onSubmit} class="btn btn-primary">Registrar</button>
                                       
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
                                                                       
                                                                        <button className=' btn btn-primary' onClick={() =>agregarSalida(producto.idproducto, producto.nombre)}>
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
