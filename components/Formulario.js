import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button,TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Form = ({citas, setCitas, guardarMostrarForm}) => {


    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono , guardarTelefono] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [sintomas, guardarSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        const opciones = { year : 'numeric', month : 'long', day : '2-digit'}
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

  
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

    const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

    const confirmarHora = (time) => {
        const opciones = { hour: 'numeric', minute: '2-digit' };
        guardarHora(time.toLocaleTimeString('es-ES',opciones));
        hideTimePicker();
  };

  const crearNuevaCita = () => {
    if(paciente.trim() === '' || 
        propietario.trim() === '' || 
        telefono.trim() === '' || 
        fecha.trim() === '' ||
        hora.trim() === '' ||
        sintomas.trim() === '' ){
            //falla la validacion
            mostrarAlerta();
            return;
        }

        const cita = { 
            paciente, 
            propietario, 
            telefono, 
            fecha, 
            hora, 
            sintomas
};

    cita.id = shortid.generate();
    //agregar al state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    //ocultar form
    guardarMostrarForm(false)
  }

  

  //resetearForm


  //mostrar alerta
  const mostrarAlerta = () => {
      Alert.alert(
          'Error', //titulo
          'Todos los campos son obligatorios', // mensaje
        [{
            text: 'OK' // arrays de botones
        }]
      )
  }

    return (
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => guardarPaciente(texto)}
                />
            </View>
            <View>
                <Text style={styles.label}>Propietario:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => guardarPropietario(texto)}
                
                />
                <Text style={styles.label}>Teléfono:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(texto) => guardarTelefono(texto)}
                    keyboardType = 'number-pad'
                />
                <View>
                    <Text style={styles.label}>Fecha:</Text>
                    <Button title="Seleccionar fecha" onPress={showDatePicker} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={confirmarFecha}
                            onCancel={hideDatePicker}
                            locale="es_ES"
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                <Text style={styles.label}>Hora:</Text>
                    <Button title="Seleccionar hora" onPress={showTimePicker} />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={confirmarHora}
                            onCancel={hideTimePicker}
                            locale="es_ES"
                            is24Hour
                    />
                    <Text>{hora}</Text>
                </View>
                <Text style={styles.label}>Síntomas:</Text>
                <TextInput 
                    multiline
                    style={styles.input}
                    onChangeText={(texto) => guardarSintomas(texto)}
                />
                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnEliminar}>
                        <Text style={styles.textoEliminar}>Crear nueva cita</Text>
                    </TouchableHighlight>
                </View>
                
            </View>
        </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    formulario : {
        backgroundColor : '#FFF',
        paddingHorizontal : 20,
        paddingVertical : 2
    },
    label : {
        fontWeight: 'bold',
        fontSize : 18,
        marginTop : 10
    },
    input: {
        marginVertical : 6,
        height : 50,
        borderColor : '#e1e1e1',
        borderWidth : 1,
        borderStyle : 'solid'
    },
    btnEliminar: {
        padding: 10,
        backgroundColor : '#AA076B',
        marginVertical: 10,
        borderRadius : 5
    },
    textoEliminar: {
        color: '#FFF',
        textAlign : 'center',
        fontWeight: 'bold'
    }
})

export default Form;