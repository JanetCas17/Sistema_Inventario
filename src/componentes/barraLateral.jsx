import React, { useContext, useEffect, useState } from 'react';
import Ingresar from './productos/Ingresar';
import Consultar from './productos/Consultar';
import Entradas from './entradas/Entradas';
import Salidas from './salidas/Salidas';
import Table from './entradas/ConsultarEntradas'
import ConsultarSalidas from './salidas/ConsultarSalidas'
import {requestGet} from "../ayudas/requestGet";

export default function BarraLateral() {

    const [activeView, setActiveView] = useState('ingresarProductos')

    
    useEffect(() => {
        console.log(activeView);
    }, [activeView]);

    const [productos, setProductos] = useState();
    const [salidas, setSalidas] = useState();

    useEffect(() => {
        requestGet('consultarEntrada')
        .then(data => {
            console.log(data);
            setProductos(JSON.parse(data));
        })
        requestGet('consultarSalidas')
        .then(data => {
            console.log('Datos de salida: '+data);
            setSalidas(JSON.parse(data));
        })
    }, [activeView])

  return (
    <div className="row">
            <div className="col-3">
                <nav className="fixed-left nav d-flex justify-content-center sidebar-dark-secondary d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#"><img width="30%" src="./img/logo-itesi.png"/></a>
                    </li>
                    <li className="nav-item">
                        <a className="" aria-current="page" href="#" >Sistema de Inventarios</a>
                    </li>
                    
                    <li className="nav-item mb-1" id="productos">
                        <a className="nav-link" data-bs-toggle="collapse" data-bs-target="#productos-collapse" aria-expanded="true" href="#" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                            </svg> 
                        Productos
                        </a>
                        <div className="collapse show" id="productos-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><button onClick={() => setActiveView('Ingresar Productos')} className="btn text-success">Ingresar Productos</button></li>
                              <li><a onClick={() => setActiveView('Consultar Productos')} className="btn text-success">Consultar Productos</a></li>
                            </ul>
                          </div>

                    </li>
                    
                    <li className="nav-item">
                        <a className="nav-link" href="#" data-bs-toggle="collapse" data-bs-target="#entradas-collapse" aria-expanded="true" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-arrow-down" viewBox="0 0 16 16">
                                <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5z"/>
                                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                            </svg>
                        Entradas
                        </a>
                        <div className="collapse show" id="entradas-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><a onClick={() => setActiveView('Entradas de inventarios')} className="btn text-success ">Entradas de inventarios</a></li>
                            </ul>
                          </div>
                          <div className="collapse show" id="entradas-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><a onClick={() => setActiveView('Consultar entradas')} className="btn text-success ">Consultar entradas</a></li>
                            </ul>
                          </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-arrow-up" viewBox="0 0 16 16">
                        <path d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"/>
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg> 
                    Salida
                        </a>
                        <div className="collapse show" id="entradas-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li><a onClick={() => setActiveView('Salida de inventarios')} className="btn text-success ">Salida de inventarios</a></li>
                              <li><a onClick={() => setActiveView('Consultar salidas')} className="btn text-success ">Consultar salidas</a></li>
                            </ul>
                          </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                    </svg> 
                    Usuario</a>
                    </li>
                    
                    </ul>
                    
    
                </nav>
            </div>

            <div className="col-8 m-2">
                {
                    activeView === 'Ingresar Productos' && 
                    <Ingresar/>
                }
                {
                    activeView === 'Consultar Productos' && 
                   <Consultar/>
                }
                {
                    activeView === 'Entradas de inventarios' &&
                    <Entradas/>
                }
                {
                    activeView === 'Salida de inventarios' &&
                     <Salidas/>
                }
                {
                    activeView === 'Consultar entradas' &&
                        <Table data={productos}/>
                }
                {
                    activeView === 'Consultar salidas' &&
                        <ConsultarSalidas data={salidas}/>
                }
            </div>

    </div>

    
  );
}
