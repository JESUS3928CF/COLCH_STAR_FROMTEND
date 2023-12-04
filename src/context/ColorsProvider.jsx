import { createContext, useContext, useEffect, useState } from "react";
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';


const  ColorsContex = createContext();


const ColorsProvider=({children})=>{
    const {token,auth} = useAuth()
    const [colors, setColores]= useState([]);
    const [colorsDb, setColorsDb]= useState([])

    const agregarColors= (data)=>{
        const  newColors = [...colors,data];
        setColores(newColors);
    };

    const eliminarColors=(index)=>{
        console.log(index);
        const newColors=[...colors]
        newColors.splice(index,1)
        setColores(newColors)
    }

    const consultColors = async ()=>{
        const res = await clienteAxios.get('/colors')
        setColorsDb(res.data)
    }

    useEffect(()=>{
        consultColors()
    },[auth])

    const agregarColorsDb = async (formData, handleClose, reset)=>{
        try{
            const res = await clienteAxios.post('/colors', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },

            });

            Swal.fire({
                title: 'Color Agregado',
                text: res.data.message,
                icon: 'success',
            }).then(() => {
                reset();
                setColorsDb([...colorsDb, res.data.newColors]);
                handleClose();
            });
        }catch (error) {
            console.log(error);
            // Lanzar alerta de error
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error',
                icon: 'Vuelva a intentarlo',
            }).then(handleClose());
        }
    }

  
   

    const contextValue = {
        colors,
        agregarColors,
        colorsDb,
        setColorsDb,
        agregarColorsDb,
        eliminarColors,
        setColores,
    };

    

    return(
        <ColorsContex.Provider value={contextValue}>
            {children}
        </ColorsContex.Provider>
    );
};


export {ColorsProvider}

export default ColorsContex