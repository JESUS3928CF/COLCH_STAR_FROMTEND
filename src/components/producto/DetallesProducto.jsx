import PropTypes from 'prop-types';
import HeaderModals from '../chared/HeaderModals';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import styles from '../../css-general/estilosReutilizables.module.css';
import React, { useState } from 'react';
const DetallesProducto = ({ detallesProductos }) => {


    const [startIndex, setStartIndex] = useState(0);
    const numVisibleColors = 2;

    const handleNext = () => {
        if (detallesProductos.colores && detallesProductos.colores.length > startIndex + numVisibleColors) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    return (
        <div>
            <div className='modal' id='modalDetallesProductos'>
                <div className='modal-dialog modal-dialog-centered modal '>
                    <div className='modal-content '>
                        <HeaderModals title='Imagen del producto' NoReset={true} />
                        <div className='formulario'>
                            <div className='modal-body'>
                                <div className='container'>
                                    <div className='col'>
                                        <div className='row'>
                                            {/* Carousel */}
                                            <div className='row d-flex justify-content-center align-items-center'>
                                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                                                    <div className="carousel-inner">
                                                        {/* Carousel Items */}
                                                        <div className={`carousel-item active ${styles.tamano}`}>
                                                            {/* Product Image */}
                                                            <div className={styles.titu}>
                                                                <h2>Producto:</h2>
                                                            </div>
                                                            <img
                                                                src={
                                                                    detallesProductos.imagen
                                                                        ? `${import.meta.env.VITE_BACKEND_URL}/${detallesProductos.imagen}`
                                                                        : ''
                                                                }
                                                                alt={detallesProductos.nombre}
                                                                title={detallesProductos.nombre}
                                                                className={styles.contenedor_imagen}
                                                                onClick={() => {
                                                                    // Abre la imagen en una nueva pestaña al hacer clic
                                                                    window.open(
                                                                        detallesProductos.imagen
                                                                            ? `${import.meta.env.VITE_BACKEND_URL}/${detallesProductos.imagen}`
                                                                            : '',
                                                                        '_blank' // Abre en una nueva pestaña
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                        {/* Other Images */}
                                                        {/* (Assuming detallesProductos.prenda.imagen and detallesProductos.disenos exist) */}
                                                        <div className={`carousel-item ${styles.tamano}`}>
                                                            <div className={styles.titu}>
                                                                <h2>Prenda</h2>
                                                            </div>
                                                            <img
                                                                src={
                                                                    detallesProductos.imagen
                                                                        ? `${import.meta.env.VITE_BACKEND_URL}/${detallesProductos.prenda && detallesProductos.prenda.imagen}`
                                                                        : ''
                                                                }
                                                                alt={detallesProductos.nombre}
                                                                title={detallesProductos.nombre}
                                                                className={styles.contenedor_imagen}
                                                                onClick={() => {
                                                                    // Abre la imagen en una nueva pestaña al hacer clic
                                                                    if (detallesProductos.imagen && detallesProductos.prenda && detallesProductos.prenda.imagen) {
                                                                        window.open(
                                                                            `${import.meta.env.VITE_BACKEND_URL}/${detallesProductos.prenda.imagen}`,
                                                                            '_blank' // Abre en una nueva pestaña
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        {detallesProductos.disenos && detallesProductos.disenos.map((diseno, index) => (
                                                            <div key={`${diseno.nombre}-${index}`} className={`carousel-item ${styles.tamano}`}>
                                                                <div className={styles.titu}>
                                                                    <h2>Diseños</h2>
                                                                </div>
                                                                <a href={`${import.meta.env.VITE_BACKEND_URL}/${diseno.imagen}`} target="_blank" rel="noopener noreferrer" className={styles.contenedor_imagen}>
                                                                    <img
                                                                        src={diseno.imagen ? `${import.meta.env.VITE_BACKEND_URL}/${diseno.imagen}` : ''}
                                                                        alt={diseno.nombre}
                                                                        title={diseno.nombre}
                                                                        className={styles.contenedor_imagen}
                                                                        style={{ width: 180, marginLeft: 30 }}
                                                                    />
                                                                </a>
                                                                <br />
                                                                <p>Tamaño: {diseno.tamano}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Carousel Controls */}
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                        <span className={` carousel-control-prev-icon ${styles.flecha}`} aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                        <span className={`carousel-control-next-icon ${styles.flecha}`} aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                                {/* Product Details */}
                                                <div className={` card-body  ${styles.car}`}>
                                                    <div className="row">
                                                        {/* Genero */}
                                                        <div className={` col-md-6  ${styles.carr}`}>
                                                            <h2 htmlFor='nombre' className='card-title'>
                                                                <b>Género:</b> {detallesProductos.prenda && detallesProductos.prenda.genero}
                                                            </h2>
                                                            {/* Colores */}
                                                            <h3 htmlFor='Colores' className='card-title'>
                                                                <b>Colores:</b>
                                                                <div className='colors-div'>
                                                                    {/* Mapping colors */}
                                                                    {detallesProductos.colores && detallesProductos.colores.slice(startIndex, startIndex + numVisibleColors).map((color, index) => (
                                                                        <div key={`${color.id_color}_${index}`} className='color-block'>
                                                                            <span className='color-name'>
                                                                                {index !== detallesProductos.colores.length - 1 ? color.color + ',' : color.color}
                                                                            </span>
                                                                            <div className='color-div' style={{ backgroundColor: `${color.codigo}`, width: '40px' }}></div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {/* Arrow Buttons for Colors */}
                                                                {detallesProductos.colores && detallesProductos.colores.length > numVisibleColors && (
                                                                    <div className={styles.arrowButtons}>
                                                                        <button className="btn btn-link" onClick={handlePrevious}><BiChevronLeft /></button>
                                                                        <button className="btn btn-link" onClick={handleNext}><BiChevronRight /></button>
                                                                    </div>
                                                                )}
                                                            </h3>
                                                        </div>
                                                        {/* Tela */}
                                                        <div className={` col-md-6  ${styles.carrr}`}>
                                                            <h2 htmlFor='nombre' className='card-title' style={{ marginBottom: '10%' }} >
                                                                <b>Tela:</b>
                                                                <div className='tallas-div text-center'><p> {detallesProductos.prenda && detallesProductos.prenda.tipo_de_tela}</p></div>
                                                            </h2>
                                                            {/* Tallas */}
                                                            <h3 htmlFor='tallas' className='card-title'>
                                                                <b>Tallas:</b>
                                                                <div className='tallas-div text-center'>
                                                                    {/* Mapping sizes */}
                                                                    {detallesProductos.tallas && Array.isArray(detallesProductos.tallas) ? detallesProductos.tallas.map((tallas, index) => (
                                                                        <p key={index}>{tallas},</p>
                                                                    )) : null}
                                                                </div>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Publicado */}
                                            <div className='text-center mt-3 d-flex justify-content-center align-items-center'>
                                                <h3 htmlFor='publicado' className='card-title'>
                                                    <b>Publicado </b>
                                                </h3>
                                                <div style={{ fontSize: '40px', paddingLeft: '10px', paddingBottom: '5px' }}>
                                                    {detallesProductos.publicado && detallesProductos.estado ? <FcApproval /> : <FcCancel />}
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
}

export default DetallesProducto;
