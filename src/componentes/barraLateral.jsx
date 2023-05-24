import React, { useContext, useEffect, useState } from 'react';
import Ingresar from './productos/Ingresar';
import Consultar from './productos/Consultar';
import Entradas from './entradas/Entradas';
import Salidas from './salidas/Salidas';
import Table from './entradas/ConsultarEntradas'
import ConsultarSalidas from './salidas/ConsultarSalidas'
import {requestGet} from "../ayudas/requestGet";
import '../css/SideBar.css';

const BarraLateral = () => {
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

    const [activeMenu, setActiveMenu] = useState(null);

    const handleSubMenuToggle = (index) => {
        setActiveMenu(activeMenu === index ? null : index);
    };

    return (
        <div className="row">
            <div className="sidebar">
                <h1 className="sidebar-title">Sistema de Inventarios</h1>
                <ul className="menu">
                    <li
                        className={`menu-item ${activeMenu === 1 ? 'active' : ''}`}
                        onClick={() => handleSubMenuToggle(1)}
                    >
                        Productos
                        {activeMenu === 1 && (
                            <ul className="submenu">
                                <li className="submenu-item" onClick={() => setActiveView('Ingresar Productos')}>Agregar Productos</li>
                                <li className="submenu-item" onClick={() => setActiveView('Consultar Productos')}>Consultar Productos</li>
                            </ul>
                        )}
                    </li>
                    <li
                        className={`menu-item ${activeMenu === 2 ? 'active' : ''}`}
                        onClick={() => handleSubMenuToggle(2)}
                    >
                        Entradas
                        {activeMenu === 2 && (
                            <ul className="submenu">
                                <li className="submenu-item" onClick={() => setActiveView('Entradas de inventarios')}>Entrada de inventario</li>
                                <li className="submenu-item" onClick={() => setActiveView('Consultar entradas')}>Consultar Entradas</li>
                            </ul>
                        )}
                    </li>
                    <li
                        className={`menu-item ${activeMenu === 3 ? 'active' : ''}`}
                        onClick={() => handleSubMenuToggle(3)}
                    >
                        Salidas
                        {activeMenu === 3 && (
                            <ul className="submenu">
                                <li className="submenu-item" onClick={() => setActiveView('Salida de inventarios')}>Salida de inventario</li>
                                <li className="submenu-item" onClick={() => setActiveView('Consultar salidas')}>Consultar Salidas</li>
                            </ul>
                        )}
                    </li>
                </ul>
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
};

export default BarraLateral;

