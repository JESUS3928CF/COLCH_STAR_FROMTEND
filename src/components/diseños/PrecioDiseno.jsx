import { useEffect, useState } from 'react';
import CancelarModal from '../chared/CancelarModal';
import GuardarModal from '../chared/GuardarModal';
import HeaderModals from '../chared/HeaderModals';
import clienteAxios from '../../config/axios';
import { useForm } from 'react-hook-form';
import AlertaError from '../chared/AlertaError';
import Swal from 'sweetalert2';

const PrecioDiseno = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    // Para poner el precio correspondiente aca tamaño
    const definirPrecio = (precio) => {

        if(!precio) return setValue('precio', '');
        setValue('precio', precios[precio - 1].precio);
    };

    const [precios, setPrecios] = useState([]);

    useEffect(() => {
        const consultarPrecios = async () => {
            const respuesta = await clienteAxios.get('/precio_disenos');
            setPrecios(respuesta.data);
        };
        consultarPrecios();
    }, []);

    const actualizarPrecio = handleSubmit(async (data) => {

        try {
            const res = await clienteAxios.put(`/precio_disenos/${data.id_precio}`, {
                precio: data.precio,
            });

            console.log(res);

            // Lanzar alerta del producto agregado
            Swal.fire({
                title: 'Precio Editado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                location.reload();
            });
        } catch (error) {
            console.log(error);
            // Lanzar alerta de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'Vuelva a intentarlo',
            }).then(location.reload());
        }
    });

    return (
        <div className='modal' id='myModalPrecio'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    {/* Cabecero del modal */}
                    <HeaderModals title='Modificar precio del los diseños' />

                    <div className='modal-body'>
                        {/* formulario para agregar un cliente  */}
                        <form
                            action=''
                            id='formularioModificar'
                            onSubmit={actualizarPrecio}
                        >
                            <select
                                id='select'
                                className='form-select'
                                aria-label='Default select example'
                                onClick={(e) => {
                                    definirPrecio(e.target.value);
                                }}
                                {...register('id_precio', {
                                    required: true,
                                })}
                            >
                                <option value=''>Seleccione un tamaño</option>
                                {precios.map((precio) => (
                                    <option
                                        key={precio.id_precio_diseno}
                                        value={precio.id_precio_diseno}
                                    >
                                        {precio.tamano}
                                    </option>
                                ))}
                            </select>
                            {errors.id_precio && (
                                <AlertaError
                                    message={'Seleccione el tamaño a editar'}
                                />
                            )}

                            <div className='mb-3'>
                                <label
                                    htmlFor='precioGuardar'
                                    className='col-form-label'
                                >
                                    Precio:
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='precioGuardar'
                                    placeholder='Agregar precio para este tamaño'
                                    {...register('precio', {
                                        required: {
                                            value: true,
                                            message: 'El precio es obligatorio',
                                        },

                                        pattern: {
                                            value: /^[0-9]+([.,][0-9]+)?$/,
                                            message:
                                                'Este campo solo puede contener números',
                                        },
                                    })}
                                />
                                {errors.precio && (
                                    <AlertaError
                                        message={errors.precio.message}
                                    />
                                )}
                            </div>
                            <div className='modal-footer'>
                                {/* Botón para cancelar*/}
                                <CancelarModal />

                                {/* Botón para guardar*/}
                                <GuardarModal />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrecioDiseno;
