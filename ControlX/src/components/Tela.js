import React, { Component } from "react";
import { Text, ScrollView, ActivityIndicator, View, FlatList, TouchableOpacity, TouchableHighlight, StyleSheet, RefreshControl, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button, ThemeProvider, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import 'prop-types';

import{ fetchDelete } from './API';

console.disableYellowBox = true;


export default class Inicio extends Component {

  

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true, tipo : this.props.tipo,
      basic: true,
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
      refreshing: false,
      data: [] 
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {

    if(this.state.tipo == 'produtos'){
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/produtos/listarTodos");
      const json = await response.json();
      this.setState({ data: json,  isLoading: false });
    }

    if(this.state.tipo == 'fornecedor'){
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/fornecedores/listarTodos");
      const json = await response.json();
      this.setState({ data: json,  isLoading: false });
    }

    if(this.state.tipo == 'categoria'){
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/categorias/listarTodas");
      const json = await response.json();
      this.setState({ data: json,  isLoading: false });
    }
    
  };
 
  
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) =>  {

    if(this.state.tipo == 'produtos'){
      return(
        ( item.deleted != 'false' ) ?
          <ListItem
            title={`${item.nome} - R$ ${item.preco}`}
            subtitle={`Quantidade em estoque - ${item.qtd}${item.tipoUn}`}
            leftAvatar={{
              source: item.imagemUrl && { uri: item.imagemUrl },
              title: item.nome
            }}

            button onPress={() => { 
              Alert.alert(
                'Produto',
                `ID: ${item.id} \n\nNome: ${item.nome} 
              \nR$ ${item.preco} 
              \nEstoque Minimo: ${item.estoqueMin} 
              \nQuantidade: ${item.qtd} 
              \nTipo de Unidade: ${item.tipoUn} 
              \nCategoria: ${item.categoria.id} - ${item.categoria.nome} 
              \nFornecedor: ${item.fornecedor.id} - ${item.fornecedor.nome} 
              \nCodigo de Barras: ${item.codigoBarras} `,
                [
                  {text: 'Editar', onPress: () => {
                    if(this.props.user.role.nomeRole == 'ROLE_ADMIN'){
                    const editProd = {
                      id: item.id,
                      edit : true,
                      nome: item.nome,
                      preco: item.preco,
                      estoqueMin: item.estoqueMin,
                      tipoUn: item.tipoUn,
                      linkFoto: item.imagemUrl,
                      qtd: item.qtd,
                      fornecedor: item.fornecedor.nome,
                      id_fornecedor: item.fornecedor.id,
                      categoria: item.categoria.id,
                      codbarras: item.codigoBarras,
                      deleted: false
                  }
      
                    Actions.addP({editProd})
                  }
                    this._onRefresh
                  
                  }},
                  {
                    text: 'Cancelar',
                    onPress: () => this._onRefresh,
                    style: 'cancel',
                  },
                  {text: 'Ok' /*,onPress: () => alert('OK Pressed')*/ },
                ],
                {cancelable: false},
              ); }}
          /> 

          : 

          <ListItem
            title={''}
            subtitle={''}
            leftAvatar={''}
          />
      
      )  ;
    }

    

    if(this.state.tipo == 'fornecedor'){
      // "id","nome","bairro","cep","cidade","cnpj","comp","estado","num","rua","telefone", "deleted" 
      return(
      <ListItem
        title={`ID: ${item.id} \n${item.nome}`}
        subtitle={`${item.rua} - ${item.num}, ${item.bairro} ,${item.cidade} - ${item.estado}`}
        rightAvatar={{
          icon: { name: 'caret-right', color: '#EEE', type: 'font-awesome' },
          overlayContainerStyle: {backgroundColor: 'white'}  
        }}

        button onPress={() => { 
          Alert.alert(
            'Fornecedor',
            `ID: ${item.id} 
        \nCPNJ: ${item.cnpj}
        \nNome: ${item.nome} 
        \nEndereço: ${item.rua} - ${item.num}, ${item.bairro} ,${item.cidade} - ${item.estado}
        \nCEP: ${item.cep} 
        \nTelefone: ${item.telefone}`,
            [
              {text: 'Editar', onPress: () => {

                const editFor = {
                  edit : true,
                  id: item.id,
                  nome: item.nome,
                  cnpj: item.cnpj,
                  telefone: item.telefone,
                  cep: item.cep,
                  num: item.num,
                  rua: item.rua,
                  comp: item.comp,
                  bairro: item.bairro,
                  cidade: item.cidade,
                  estado: item.estado,
                  deleted: false
              }
  
                Actions.addF({editFor})
                
              }},
              {
                text: 'Cancelar',
                onPress: () => this._onRefresh,
                style: 'cancel',
              },
              {text: 'Ok' /*,onPress: () => alert('OK Pressed')*/ },
            ],
            {cancelable: false},
          ); }}
      />)
    }

    if(this.state.tipo == 'categoria'){
      // "id","nome","deleted" 
      return(
      <ListItem
        title={`ID: ${item.id} - ${item.nome}`}
        subtitle={''}
        rightAvatar={{
          icon: { name: 'caret-right', color: '#EEE', type: 'font-awesome' },
          overlayContainerStyle: {backgroundColor: 'white'}  
        }}       

        button onPress={() => { Alert.alert(
          'Categoria',
          `ID: ${item.id} \nNome: ${item.nome} `,
          [
            {text: 'Editar', onPress: () => {

              const editCat = {
                edit : true,
                id: item.id,
                nome: item.nome,
                deleted: false
              }

              Actions.addC({editCat})
              
            }},
            {
              text: 'Cancelar',
              onPress: () => this._onRefresh,
              style: 'cancel',
            },
            {text: 'Ok' /*,onPress: () => alert('OK Pressed')*/ },
          ],
          {cancelable: false},
        );
        
        }}
      />)
    }

  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      
      <SwipeListView
        useFlatList
        data={this.state.data}
        renderItem={ (data, rowMap) => (
            
          this.renderItem(data)
            
        )}
        renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
                <Text ></Text>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={ () => {

                    let id = data.item.id;
                    
                    if(this.state.tipo == `produtos` && this.props.user.role.nomeRole == 'ROLE_ADMIN'){
                      let url = `http://167.114.114.169:8080/controlx-1.0/rest/produtos/deletar`;
                      fetchDelete(url, id)
                      .then(data => alert(`Produto Removido com sucesso - ID ${data.item.id} \n`, JSON.stringify(data, null, 4)));
                    }

                    if(this.state.tipo == `fornecedor` && this.props.user.role.nomeRole == 'ROLE_ADMIN'){
                      let url = `http://167.114.114.169:8080/controlx-1.0/rest/fornecedores/deletar`;
                      fetchDelete(url, id)
                      .then(data => alert(`Fornecedor Removido com sucesso - ID ${data.item.id} \n`, JSON.stringify(data, null, 4)));
                    }

                    if(this.state.tipo == `categoria` && this.props.user.role.nomeRole == 'ROLE_ADMIN'){
                      let url = `http://167.114.114.169:8080/controlx-1.0/rest/categorias/deletar`;
                      fetchDelete(url, id)
                      .then(data => alert(`Categoria Removida com sucesso - ID ${data.item.id} \n`, JSON.stringify(data, null, 4)));
                    }


                  } }>
                  <Text style={styles.backTextWhite}>{'Remover'}</Text>
                </TouchableOpacity>
            </View>
        )}

        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }

        leftOpenValue={0}
        rightOpenValue={(this.props.user.role.nomeRole == 'ROLE_ADMIN') ? -75 : 0}
        closeOnScroll={true}
        />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 150,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#4286f4',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#a81a1a',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100,
  }
})

