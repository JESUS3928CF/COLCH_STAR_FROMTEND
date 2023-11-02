import PropTypes from 'prop-types';

import HeaderModals from '../chared/HeaderModals';
// import { useForm } from 'react-hook-form';
// import { useEffect } from 'react';

export const DetallesPrendas = ({ detallesPrendas }) => {
    // const {setValue}=useForm

    // useEffect(()=>{
    //     if(detallesPrendas){
    //         setValue('publicado', detallesPrendas.publicado)
    //     }
    // },[detallesPrendas])

    
    return (
        <div className='modal' id='modalDetallePrendas'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <HeaderModals title='Detalle de la prenda' />
                    <div className='formulario'>
                        <div className='modal-body'>
                            <div className='container'>
                                <div className='col'>
                                    <div className='row'>
                                        <div className='row gx-0'>
                                            <div className='col-md-4'>
                                            <img   src={`${
                                                    import.meta.env
                                                        .VITE_BACKEND_URL
                                                }/${detallesPrendas.imagen}`}
                                                width='250px'
                                                height='200px'
                                                alt=''/>                                   
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h1 htmlFor="nombre" className='card-title'>Nombre: {detallesPrendas.nombre}</h1>
                                                    <h1 htmlFor="cantidad" className='card-title'>Cantidad: {detallesPrendas.cantidad}</h1>
                                                    <h1 htmlFor="precio" className='card-title'>Precio: {detallesPrendas.precio}</h1>
                                                    <h1 htmlFor="Tela" className="card-title"> Tipo de tela: {detallesPrendas.tipo_de_tela}</h1>
                                                    <h1 htmlFor="genero" className="card-title"> Genero: {detallesPrendas.genero}</h1>                                        
                                                    <h1 htmlFor="Publicado" name='publicado' className="card-title" > Publicado: {detallesPrendas.publicado}</h1>                                        
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetallesPrendas.propTypes = {
    detallesPrendas: PropTypes.object.isRequired,
};