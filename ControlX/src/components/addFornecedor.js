import React, { Component } from "react";
import { Text, ScrollView, View, Picker, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import{ setFor, editFor } from './API';


export default class Inicio extends Component {

  constructor (props) {
    super(props)
    this.state = {  user: '',
                    id: (this.props.editFor.edit == true) ? this.props.editFor.id  : "",
                    nome: (this.props.editFor.edit == true) ? this.props.editFor.nome  : null,
                    cnpj: (this.props.editFor.edit == true) ? this.props.editFor.cnpj  : null,
                    telefone: (this.props.editFor.edit == true) ? this.props.editFor.telefone  : null,
                    cep: (this.props.editFor.edit == true) ? this.props.editFor.cep  : null,
                    num: (this.props.editFor.edit == true) ? this.props.editFor.num  : null,
                    rua: (this.props.editFor.edit == true) ? this.props.editFor.rua  : null,
                    comp: (this.props.editFor.edit == true) ? this.props.editFor.comp  : null,
                    bairro: (this.props.editFor.edit == true) ? this.props.editFor.bairro  : null,
                    cidade: (this.props.editFor.edit == true) ? this.props.editFor.cidade  : null,
                    estado: (this.props.editFor.edit == true) ? this.props.editFor.estado  : null,
                    deleted: false
                }

    this.setNome = this.setNome.bind(this)
    this.setCnpj  = this.setCnpj.bind(this)
    this.setTelefone = this.setTelefone.bind(this)
    this.setCep = this.setCep.bind(this)
    this.setNum = this.setNum.bind(this)
    this.setRua = this.setRua.bind(this)
    this.setBairro = this.setBairro.bind(this)
    this.setCidade = this.setCidade.bind(this)
    this.setEstado = this.setEstado.bind(this)
  }
    
    onChangeValue = (name, value) => {
        alert(`${name}, ${value}`)
        // Set the state according to your needs here
    }

    setNome (event) {
      this.setState({ nome: event.nativeEvent.text });
    }

    setCnpj (event) {
      this.setState({ cnpj: event.nativeEvent.text });
    }

    setTelefone (event) {
      this.setState({ telefone: event.nativeEvent.text });
    }

    setCep (event) {
      this.setState({ cep: event.nativeEvent.text });
    }

    setRua (event) {
      this.setState({ rua: event.nativeEvent.text });
    }

    setBairro (event) {
      this.setState({ bairro: event.nativeEvent.text });
    }

    setNum (event) {
      this.setState({ num: event.nativeEvent.text });
    }

    setComp (event) {
      this.setState({ comp: event.nativeEvent.text });
    }

    setCidade (event) {
        this.setState({ cidade: event.nativeEvent.text });
    }

    setEstado (event) {
        this.setState({ estado: event.nativeEvent.text });
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
            <Input 
              value={this.state.cnpj}
              placeholder='Cnpj' 
              onChange={this.setCnpj}
              name={'Cnpj'}
            />
            <Input 
              value={this.state.telefone}
              placeholder='Telefone' 
              onChange={this.setTelefone}
              name={'telefone'}
            />
            <Input 
              value={this.state.cep}
              placeholder='Cep' 
              onChange={this.setCep}
              name={'cep'}
            />
            <Input 
              value={this.state.rua}
              placeholder='Rua' 
              onChange={this.setRua}
              name={'rua'}
            />
            <Input 
              value={this.state.bairro}
              placeholder='Bairro' 
              onChange={this.setBairro}
              name={'bairro'}
            />
            <Input 
              value={this.state.num}
              placeholder='Numero' 
              onChange={this.setNum}
              name={'Numero'}
            />
            <Input 
              value={this.state.comp}
              placeholder='Complemento (Opcional)' 
              onChange={this.setComp}
              name={'Complemento'}
            />
            <Input 
              value={this.state.cidade}
              placeholder='Cidade' 
              onChange={this.setCidade}
              name={'cidade'}
            />
            <Input 
              value={this.state.estado}
              placeholder='Estado' 
              onChange={this.setEstado}
              name={'estado'}
            />
            
            

            <Button
                style={{ flex: 1, width: 50, marginTop: 100, padding: 50, marginStart: 0}}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                colors: ['#751102', '#A72F1D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
                }}                
                title="Enviar"
                type="solid"
                //nome: '', qtd : '', fornecedor:'', cat: '', tipo_un: '', preco: '', estoque_min: '', url_foto: ''
                onPress={() => 
                  {

                    const newCat = {
                        nome: this.state.nome,
                        cnpj: this.state.cnpj,
                        telefone: this.state.telefone,
                        cep: this.state.cep,
                        num: this.state.num,
                        rua: this.state.rua,
                        comp: this.state.comp,
                        bairro: this.state.bairro,
                        cidade: this.state.cidade,
                        estado: this.state.estado,
                        deleted: false
                    }

                    const editForne = {
                        id: this.state.id,
                        nome: this.state.nome,
                        cnpj: this.state.cnpj,
                        telefone: this.state.telefone,
                        cep: this.state.cep,
                        num: this.state.num,
                        rua: this.state.rua,
                        comp: this.state.comp,
                        bairro: this.state.bairro,
                        cidade: this.state.cidade,
                        estado: this.state.estado,
                        deleted: false
                    }

                    alert((this.props.editFor.edit == true) ? editFor(editForne) : setFor(newCat))
                    
                  } }
            />
        </View>

      </ScrollView>
    );
  }
}
