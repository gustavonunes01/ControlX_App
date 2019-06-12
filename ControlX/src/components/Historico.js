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
      isLoading: true,
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

    const response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/venda/listar/01-01-2019&30-06-2019');
    const json = await response.json();
    this.setState({ data: json,  isLoading: false });
    
  };
 
  
  
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) =>  {

    
          return (<ListItem
            title={`Data: ${item.data}, Hora: ${item.hora}`}
            subtitle={`Valor: ${item.valor}`}
            
            button onPress={() => { 
              Alert.alert(
                'Produtos',
                `` + item.produtos.map((prod) => {
                    var aux = '';
                    aux = aux + "\n\nid: " + prod.id + "\nnome: " + prod.nome + "\npreco: " + prod.preco + "\nqtd: " + prod.qtd + "\ntipoUn: " + prod.tipoUn +  "\ncodigoBarras: " + prod.codigoBarras;
                    return(aux);
                    
                 }),
                [
                  {text: 'Ok' /*,onPress: () => alert('OK Pressed')*/ },
                ],
                {cancelable: false},
              ); }}
          /> )

          
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
        rightOpenValue={0}
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

