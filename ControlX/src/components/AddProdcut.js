import React, { Component } from "react";
import { Text, ScrollView, View, Picker, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import{ setProduct, editProd } from './API';


export default class Inicio extends Component {

  constructor (props) {
    super(props)
    this.state = {
      id: (this.props.editProd.edit == true) ? this.props.editProd.id : '',
      user: '', 
      nome: (this.props.editProd.edit == true) ? this.props.editProd.nome : null, 
      qtd : (this.props.editProd.edit == true) ? ''+this.props.editProd.qtd : null, 
      fornecedor:(this.props.editProd.edit == true) ? this.props.editProd.fornecedor : null,
      id_fornecedor:  (this.props.editProd.edit == true) ? this.props.editProd.id_fornecedor : null,
      cat: (this.props.editProd.edit == true) ? this.props.editProd.categoria : null, 
      tipo_un: (this.props.editProd.edit == true) ? this.props.editProd.tipoUn : null, 
      preco: (this.props.editProd.edit == true) ? ''+this.props.editProd.preco : null, 
      estoque_min: (this.props.editProd.edit == true) ? ''+this.props.editProd.estoqueMin : null, 
      tipo : this.props.tipo, 
      url_foto: (this.props.editProd.edit == true) ? this.props.editProd.linkFoto : null, 
      codbarras: (this.props.editProd.edit == true || this.props.cam == true) ? (this.props.editProd.edit == true) ? this.props.editProd.codbarras : this.props.codbarras : null,
      data: [], dataCat: []
    }

    this.setNome = this.setNome.bind(this)
    this.setQtd  = this.setQtd.bind(this)
    this.setFornecedor = this.setFornecedor.bind(this)
    this.setCat = this.setCat.bind(this)
    this.setTipo_un = this.setTipo_un.bind(this)
    this.setPreco = this.setPreco.bind(this)
    this.setEstoque_min = this.setEstoque_min.bind(this)
    this.setUrl_foto = this.setUrl_foto.bind(this)
    this.setCodBarras = this.setCodBarras.bind(this)


  }

  componentWillMount() {
    this.fetchData();
    this.fetchDataCat();
  }

  fetchData = async () => {

      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/fornecedores/listarTodos");
      const json = await response.json();
      this.setState({ data: json });
    
  };

  fetchDataCat = async () => {

    const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/categorias/listarTodas");
    const json = await response.json();
    this.setState({ dataCat: json });
  
};
    
    onChangeValue = (name, value) => {
        alert(`${name}, ${value}`)
        // Set the state according to your needs here
    }

    setNome (event) {
      this.setState({ nome: event.nativeEvent.text });
    }

    setQtd (event) {
      this.setState({ qtd: event.nativeEvent.text });
    }

    setFornecedor (event) {
      this.setState({ fornecedor: event.nativeEvent.text });
    }

    setCat (event) {
      this.setState({ cat: event.nativeEvent.text });
    }

    setTipo_un (event) {
      this.setState({ tipo_un: event.nativeEvent.text });
    }

    setEstoque_min (event) {
      this.setState({ estoque_min: event.nativeEvent.text });
    }

    setPreco (event) {
      this.setState({ preco: event.nativeEvent.text });
    }

    setUrl_foto (event) {
      this.setState({ url_foto: event.nativeEvent.text });
    }

    setCodBarras (event) {
      this.setState({ codbarras: event.nativeEvent.text });
    }



  render() {
    return (
      <ScrollView style={{ margin: 10, flex: 1 }}>

        <View>
            <Input 
              value={this.state.codbarras}
              placeholder='Codigo de Barras' 
              onChange={this.setCodBarras}
              name={'Barras'}
            />
            <Input 
              value={this.state.nome}
              placeholder='Nome' 
              onChange={this.setNome}
              name={'Nome'}
            />
            <Input 
              value={this.state.preco}
              placeholder='Preco' 
              onChange={this.setPreco}
              name={'Preco'}
            />
            <Input 
              value={this.state.estoque_min}
              placeholder='Estoque Minimo' 
              onChange={this.setEstoque_min}
              name={'Estoque_Minimo'}
            />
            <Input 
              value={this.state.tipo_un}
              placeholder='Tipo de Unidade: ex. Kg' 
              onChange={this.setTipo_un}
              name={'tipo_un'}
            />
            <Input 
              value={this.state.url_foto}
              placeholder='Link da foto. ex. https://site.com.br/foto.png' 
              onChange={this.setUrl_foto}
              name={'url_foto'}
            />
            <Input 
              value={this.state.qtd}
              placeholder='Quantidade'
              onChange={this.setQtd}
              name={'Quantidade'}
            />
            <Text style={{paddingTop: 30}}>Fornecedor</Text>
            <Picker
              selectedValue={this.state.id_fornecedor}
              style={{height: 60, width: 500}}
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({id_fornecedor: itemValue})
              }>

              <Picker.Item label="Fornecedor" value="1" />

              {this.state.data.map((forn) => {
                  return(<Picker.Item label={forn.nome} value={forn.id} />);
              })
              }
            
            </Picker>
            <Text>Categoria</Text>
            <Picker
              selectedValue={this.state.cat}
              style={{height: 60, width: 500}}
              onValueChange={(itemValue, itemIndex) =>
                  this.setState({cat: itemValue})
              }>
              <Picker.Item label="Categoria" value="1" />
              {this.state.dataCat.map((forn) => {
                  return(<Picker.Item label={forn.nome} value={forn.id} />);
              })
              }
            </Picker>

            <Button
                style={{ flex: 1, width: 50, marginTop: 50, padding: 50, marginStart: 0}}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                  colors: ['#751102', '#A72F1D'],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 },
                }}
                title="Enviar"
                type="solid"
                onPress={() => 
                  {

                        /*{
                          {"id": 51 ,
                          "nome": "un",
                          "preco": "1",
                          "qtd": "1",
                          "tipoUn":"Un",
                          "estoqueMin": "1",
                          "categoria": { "id": "1" },
                          "imagemUrl": "a",
                          "fornecedor": { "id": "1" },
                          "codigoBarras": 1,
                          "deleted": false}
                        } */

                      const newProd = {
                        nome: this.state.nome,
                        preco: parseInt(this.state.preco),
                        qtd: parseInt(this.state.qtd),
                        tipoUn: this.state.tipo_un,
                        estoqueMin: parseInt(this.state.estoque_min),
                        categoria: { id: parseInt(this.state.cat) },
                        imagemUrl: this.state.url_foto,
                        fornecedor: { id: parseInt(this.state.id_fornecedor) },
                        codigoBarras: this.state.codbarras,
                        deleted: false,
                      }

                      const editsProds1 = {
                        id: this.state.id,
                        nome: this.state.nome,
                        preco: parseInt(this.state.preco),
                        qtd: parseInt(this.state.qtd),
                        tipoUn: this.state.tipo_un,
                        estoqueMin: parseInt(this.state.estoque_min),
                        categoria: { id: parseInt(this.state.cat) },
                        imagemUrl: this.state.url_foto,
                        fornecedor: { id: parseInt(this.state.id_fornecedor) },
                        codigoBarras: this.state.codbarras,
                        deleted: false,
                      }

                      result = (this.props.editProd.edit == true) ? editProd(editsProds1) : setProduct(newProd);

                      alert((this.props.editProd.edit == true) ? 'Editado Com Sucesso ' : 'Criado Com Sucesso ');
                      //'Editado Com Sucesso '
                  } 
                }
            />
        </View>

      </ScrollView>
    );
  }
}
