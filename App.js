import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

export default function App() {

  const [mostrarForm, guardarMostrarForm] = useState(false)
  
  //definir state
  const [citas, setCitas] = useState([]);

  // eliminar paciente del state
  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
      return citasActuales.filter( cita => cita.id !== id)
    })
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm)
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de citas</Text>

      <View>
          <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>{mostrarForm? 'Cancelar crear cita' : 'Crear nueva cita'}</Text>
          </TouchableHighlight>
      </View>

      <View style={styles.contenido}>

        { mostrarForm ? (
          <>
            <Text style={styles.titulo}>Crear nueva cita</Text>
            <Formulario 
              citas={citas}
              setCitas={setCitas}
              guardarMostrarForm={guardarMostrarForm } />
          </>
        ) : (
          <>
          <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas' : 'No hay citas. Agrega una'}</Text>
          <FlatList 
            style={styles.listado}
            data={citas}
            renderItem = { ({item}) => 
            <Cita cita={item} eliminarPaciente={eliminarPaciente} />
            }
            keyExtractor={ cita => cita.id}
          />
        </>
        
        )}
        
        
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom : 20,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  contenido: {
    flex: 1,
    marginHorizontal : '2.5%'
  },
  listado : {
    flex: 1,
  },
  btnMostrarForm: {
      padding: 10,
      backgroundColor : '#AA076B',
      borderRadius : 5
  },
  textoMostrarForm: {
      color: '#FFF',
      textAlign : 'center',
      fontWeight: 'bold'
  } 
});
