import React, { Fragment, useState } from 'react';
import {Form} from "react-bootstrap";
import uuid from  'uuid/dist/v4';
import PropTypes from 'prop-types/prop-types';
//import '../index.css';
const Formulario = ({crearCita}) => {
    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',

    })
    const [error, actualizarError] = useState(false)
    
    
    // Función que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        //console.log('escribiendo');
        //console.log(e.target.name);
        //console.log(e.target.value);
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value,
        })
    }



    // Extrer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario presiona agregar cita
    const submitCita = e =>{
        //alert('Enviando');
        e.preventDefault();
        console.log(mascota)
        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''||
        hora.trim() === '' || sintomas.trim() === ''){
            //console.log('hay un error');
            actualizarError(true);
            return;
        }
        //console.log('agregando...')
        // Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();
        //console.log(cita)
        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })
    }
    return ( 
        //<h1>Desde formulario</h1>
        <Fragment>

            <h2>Crear Cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p>
            : null}
            <Form
               onSubmit={submitCita} 
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                  className="u-full-width"
                  name="sintomas"  
                  onChange={actualizarState}
                  value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>


            </Form>       
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
  }
export default Formulario;