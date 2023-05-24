import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { requestGet } from '../../ayudas/requestGet';
import  { pdf } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import {useReactToPrint} from 'react-to-print';

const Table = ({ data }) => {
  const componentRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [datos, setDatos] = useState([
    {
      identrada: '',
      fecha: '',
      fechacaptura: '',
      movimiento: '',
      usuario: '',
      observaciones: ''

    }
  ]);
  const[datos2, setDatos2] = useState([
    {
      identrada: '',
      idproducto: '',
      nombre: '',
      cantidad: '',
      precio: ''
    }
  ]);
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);

  const handleShow = (row) => {
      setShow(true)
      setDatos([{
        identrada: (row.identrada),
        fecha: (row.fecha),
        fechacaptura: (row.fechacaptura),
        movimiento: (row.nombre),
        usuario: (row.usuario),
        observaciones: (row.observaciones)
      }])
      console.log('Estos son mis datos:'+ JSON.stringify(datos))
      console.log('Estos son mis datos:'+ JSON.stringify(row.identrada))
      requestGet(`consultarEntradaDetallePorId&idEntrada=`+row.identrada)
        .then((res)=>{
          console.log('Entrada detalle: '+res)
          setDatos2(/* [{
            identrada: (data.identrada),
            idproducto: (data.idproducto),
            nombre: (data.nombre),
            cantidad: (data.cantidad),
            precio: (data.precio)

          }] */
          JSON.parse(res))
          console.log('Estos son mis datos 2:'+ (datos2))
        })
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredRows = searchTerm 
    ? data.filter(row => 
        row.nombre.toLowerCase().includes(searchTerm) || 
        row.usuario.toLowerCase().includes(searchTerm) ||
        row.fecha.toLowerCase().includes(searchTerm) 
      )
    : data;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRows.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderRows = currentRows.map((row) => {
    return (
      <tr key={row.identrada}>
        <td>{row.fecha}</td>
        <td>{row.nombre}</td>
        <td>{row.usuario}</td>
        <td>
          {
            <button type='button' className='btn btn-dark' onClick={()=>handleShow(row)}>
              <i class="bi bi-search"></i>
            </button>
          }
        </td>
      </tr>
    );
  });

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button className={'btn '+currentPage == number?'btn-primary':''} key={number} onClick={(event) => handleChangePage(event, number)}>
        {number}
      </button>
    );
  });

  //PDF?
  /* const handleSubmit = (e) =>{
    e.preventDefault();

    const doc =(
      <Pdf datos={datos} datos2={datos2}/>
    )


    const blob = new Blob([doc], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  } */

  const generarPDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Entrada'
  });

  return (
    <>
    <div className='container'>
      <div className="card col-md-12 offset-md-1">
        <div className="card-header">
          <h3 className=''>
            Entradas
          </h3>
          <div className='row'>
            <div className='col-6'>
              Mostrar <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select> productos por página
            </div>
            <div className="col-6">
              <div className='d-flex justify-content-end'>
                Buscar <input type="text" placeholder="Buscar..." value={searchTerm} onChange={handleSearch} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          
          
          
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Movimiento</th>
                <th>Registrada</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderRows}</tbody>
          </table>
          
        </div>
        <div className="card-footer">
        <div>
            
            <div className="row">
              <div className="col-5">
                Mostrando {indexOfFirstRow + 1} - {indexOfLastRow} de {filteredRows.length} productos
              </div>
              <div className="col-2">
              <div className='d-flex justify-content-center'> Página {currentPage} de {pageNumbers.length}</div>
              </div>
              <div className="col-5">
                <p>
                 
                  <div className='d-flex justify-content-end'>
                  <button className='btn btn-outline-dark' type='link' onClick={(event) => handleChangePage(event, currentPage - 1)}>Anterior</button>
                  <button className='btn btn-outline-secondary'>{currentPage}</button>
                  <button className='btn btn-outline-dark' onClick={(event) => handleChangePage(event, currentPage + 1)}>Siguiente</button>
                </div>
                </p>
                
              </div>
            </div>
              
          </div>
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
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div ref={componentRef} className='container' style={{width: '100%', margin: '2px', position: 'center'}}>
                    <div className="card">
                      <div className="card-header">
                        <h4>Consulta de Entrada</h4>
                      </div>
                    </div>
                  
                    <div  className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="mov">Tipo de Movimiento</label>
                            <input disabled value={(datos[0].movimiento)} className="form-control" type="text" id='mov'>
                            {datos?.movimiento}
                            </input>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="mov">Fecha de entrada</label>
                            <input disabled value={(datos[0].fecha)} className="form-control" type="text" id='mov'/>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="mov">Responsable</label>
                            <input disabled value={(datos[0].usuario)} className="form-control" type="text" id='mov'/>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="mov">Fecha de captura</label>
                            <input disabled value={(datos[0].fechacaptura)} className="form-control" type="text" id='mov'/>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                            <label htmlFor="mov">Observaciones</label>
                            <textarea disabled value={datos[0].observaciones} className="form-control" type="text" id='mov'/>
                          </div>

                    </div>
                    <div className="table">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Descripcion</th>
                          <th>Cantidad</th>
                          <th>Costo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          datos2.map((row)=>{
                            return(
                              <tr>
                                <td>{row.nombre}</td>
                                <td>{row.cantidad}</td>
                                <td>{row.precio}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  
                    <Button variant="primary" onClick={generarPDF}>Imprimir</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
    </>
  );
};

export default Table;
