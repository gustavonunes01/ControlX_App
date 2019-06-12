import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  PermissionsAndroid,
  StatusBar
} from 'react-native';
import { Actions } from "react-native-router-flux";
import BarcodeScanner from 'react-native-barcodescanner';
import { Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'É Precisso dar permissão da camera',
        message:
          'Precisamos da permissão para poder ler o códico de barras. ',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceitar',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.warn(err);
  }
}

const a = 0;

export default class Camera extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      barcode: 125,
      cameraType: 'back',
      text: 'Mire no codigo de barras e espere.',
      torchMode: 'off',
      type: '',
      cameraPermission: requestCameraPermission(),
      isModalVisible: false,
      data: {
        nome: '',
        preco: '',
        qtd: '',
        tipoUn: '',
        estoqueMin: '',
        categoria: { id: '', nome: '' },
        imagemUrl: '',
        fornecedor: { id: '', nome: '' },
        codigoBarras: '',
        deleted: false,
      },
    };
  }
  
  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
  

  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
    
    this.setState({
      barcode: e.data,
      text: `${e.data}`,
      type: e.type,
    });

    this.fetchData();
  }

  fetchData = async () => {
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/produtos/pesquisarCodigo/" + this.state.barcode);
      const json = await response.json();
      this.setState({ data: json,  isLoading: false });
  };

  componentWillMount() {
    this.fetchData();
  }

  

  render() {
    return (
        
      <View style={styles.container}>
      { this.state.cameraPermission ? <StatusBar backgroundColor="#a01601" barStyle="light-content"/> : requestCameraPermission() }
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
        <View style={styles.statusBar}>
          

          {
            (this.props.tipo == 'produtos') ? <Button
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['#751102', '#A72F1D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              icon={<Icon name='plus-circle' color='#ffffff' />}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#E2474B' }}
              title='Adicionar Produto'
              onPress={() => {
                Actions.addP({ editProd: { edit : false }, codbarras: this.state.barcode, cam: true});
              }} /> : <Button
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['#751102', '#A72F1D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              icon={<Icon name='search' color='#ffffff' />}
              buttonStyle={{borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#E2474B' }}
              title=''
              onPress={this._toggleModal} />
          }
          

            
        </View>

        <View>
          <Modal 
            isVisible={this.state.isModalVisible}  
            onBackdropPress={() => this.setState({ isModalVisible: false })} 
            onSwipeComplete={() => this.setState({ isModalVisible: false })}
            animationIn = {'fadeInLeft'}
            animationOut = {'fadeOutLeft'}
            style={{ flex: 1, height: 200, alignItems: 'center', justifyContent: "center" }}
          >

          <View ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['#751102', '#A72F1D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }} style={{ flex: 1, maxHeight: 200, alignItems: 'center', color: 'white', justifyContent: "center", justifyContent: 'space-between', padding: 0 }}>
            <LinearGradient
  start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
  colors={['#751102', '#A72F1D']}
  style={{ flex: 1, maxHeight: 200, alignItems: 'center', color: 'white', justifyContent: "center", justifyContent: 'space-between', padding: 50, borderRadius: 20 }}
  >
            <Text style={{color: 'white'}}>Nome: {JSON.stringify(this.state.data.nome)}, ID: {JSON.stringify(this.state.data.id)},</Text>
            <Text style={{color: 'white'}}>Preço: R$ {JSON.stringify(this.state.data.preco)},00,</Text>
            <Text style={{color: 'white'}}>Estoque: {JSON.stringify(this.state.data.qtd)}{JSON.stringify(this.state.data.tipoUn)},</Text>
            <Text style={{color: 'white'}}>Categoria: {JSON.stringify(this.state.data.categoria.id)} - {JSON.stringify(this.state.data.categoria.nome)},</Text>
            <Text style={{color: 'white'}}>Fornecedor: {JSON.stringify(this.state.data.fornecedor.cpnj)} - {JSON.stringify(this.state.data.fornecedor.nome)}</Text>
            <Text style={{color: 'white'}}>Tel. Fornecedor: {JSON.stringify(this.state.data.fornecedor.telefone)}</Text>
            </LinearGradient>
          </View>

          </Modal>


          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20
  },
});