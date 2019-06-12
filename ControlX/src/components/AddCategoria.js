import React, { Component } from "react";
import { Text, ScrollView, View, Picker, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import{ setCat, editCat } from './API';


export default class Inicio extends Component {

  constructor (props) {
    super(props)
    this.state = {user: '', nome: (this.props.editCat.edit == true) ? this.props.editCat.nome : null, id: (this.props.editCat.edit == true) ? this.props.editCat.id : ''}

    this.setNome = this.setNome.bind(this)
  }
    
    onChangeValue = (name, value) => {
        alert(`${name}, ${value}`)
        // Set the state according to your needs here
    }

    setNome (event) {
      this.setState({ nome: event.nativeEvent.text });
    }



  render() {
    return (
      <ScrollView style={{ margin: 10, flex: 1 }}>
        
        <View>
            <Input 
              value={this.state.nome}
              placeholder='Nome' 
              onChange={this.setNome}
              name={'Nome'}
            />

            <Button
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                colors: ['#751102', '#A72F1D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
                }}
                style={{ flex: 1, width: 50, marginTop: 50, paddingTop: 50, marginStart: 0}}
                title="Enviar"
                type="solid"
                //nome: '', qtd : '', fornecedor:'', cat: '', tipo_un: '', preco: '', estoque_min: '', url_foto: ''
                onPress={() => 
                  {

                    const newCat = {
                      nome: this.state.nome,
                      deleted: false
                    }

                    const editCate = {
                        id: this.state.id,
                        nome: this.state.nome,
                        deleted: false
                    }

                    result = (this.props.editCat.edit == true) ? editCat(editCate) : setCat(newCat);

                    alert((this.props.editCat.edit == true) ? 'Editado Com Sucesso ' : 'Criado Com Sucesso ')

                    
                    
                  } }
            />
        </View>

      </ScrollView>
    );
  }
}
