import React from 'react'
import BarraLateral from './barraLateral';
import { useState } from 'react';
import { requestGet } from '../ayudas/requestGet';
import UserContext from '../context/UserContext';

export default function Login() {

    const [admitido , setAdmitido] = useState(false);
    const [usuario , setUsuario] = useState('');
    const [contrasena , setContrasena] = useState('');
   
    const [userData, setUserData] =  useState({ //Estado que guarda los datos del usuario, pero es para el contexto
        id: null,
        user: null,
        password: null,
    })


    const usuarioChange = (e) =>{
        setUsuario(e.target.value);
        
    }

    const contrasenaChange = (e) =>{
        setContrasena(e.target.value);
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        requestGet(`existing_user&usuario=${usuario}&contrasena=${contrasena}`)
            .then((res) => {
                console.log('La respuest del login, ',res);
                console.log(JSON.parse(res)[0]);
                
                if(JSON.parse(res)[0].idusuario != null){
                    //alert('Bienvenido');
                    setUserData ({ //Aqui se le pasa los datos traidos desl servidor, para el conetxto
                        id: JSON.parse(res)[0].idusuario,
                        user: JSON.parse(res)[0].usuario,
                        password: JSON.parse(res)[0].contrasena,
                    })
                    setAdmitido(true);
                    
                }else{
                    alert('Usuario o contraseña incorrectos');
                    setAdmitido(false);
                } 
            })

    }

  return (
    <>
        {//para usar el contexto en el componente, se debe de usar el provider, y pasarle el valor del estado que se quiere usar, en este caso userData, que es el estado que guarda los datos del usuario
            admitido ? <UserContext.Provider value={userData}> <BarraLateral/> </UserContext.Provider>: //Si el usuario es admitido, se muestra la barra lateral, si no, se muestra el login, y se le pasa el estado de admitido, para que se pueda usar en el componente
            <section className="vh-100" style={{background: '#34C3FE', height:'100%'}} >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-5">
                    <div className="card" style={{borderradius: "1rem"}}>
                    <div className="row g-0">
                        <div className="col-md-6 col-lg-12 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">

                            <form onSubmit={onSubmit}>

                            <h5 className="fw-normal mb-3 pb-3" style={{letterspacing: "1px"}}>Accede a tu cuenta</h5>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="loginUsuario">Usuario</label>
                                <input type="text" id="loginUsuario" className="form-control form-control-lg" onChange={usuarioChange}/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="loginContraseña">Contraseña</label>
                                <input type="password" id="loginContraseña" className="form-control form-control-lg" onChange={contrasenaChange}/>
                            </div>

                            <div className="pt-1 mb-4">
                                <button  className="btn btn-dark btn-lg btn-block" type="submit">Accesar</button>
                            </div>

                            </form>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>  
                        
        }
        
    </>
        
  )
}

