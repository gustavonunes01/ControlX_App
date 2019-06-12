import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
import { Actions } from "react-native-router-flux";
import { Card, Button, ThemeProvider, ListItem, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

const Estilos = {
    text1: {
      fontSize: 30,
      margin: 10, 
      flex: 1, 
      textAlign: "center",
      height: 50
  }
};

const theme = {
  Text: {
    containerStyle: [
      {
        height: 10
      }
    ]
  },

  Header: {
    containerStyle2 : [
      {
        height: 20
      }
      
    ]
  }
}

export default class Inicio extends Component {
  constructor(props){
    super(props);

    this.state = {
      isModalVisible: false,
      Users: this.props.Users,
      data: [],
      totalPrice: 0,
      currentDate: '',
      lastDate: '',
      aux: 0,
    };
  }

  componentWillMount() {
    this.componentDidMount();
    this.fetchData();
  }

  componentDidMount() {
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var days = 61;
    var last = new Date(date - (days * 24 * 60 * 60 * 1000));

    this.setState({
      //Setting the value of the date time
      lastDate: last.getDate() + '-' + (last.getMonth() - month) + '-' +year,
      currentDate: date + '-' + month + '-' + year,
    });

    
  }

  fetchData = async () => {
      //http://167.114.114.169:8080/controlx-1.0/rest/venda/listar/01-01-2019&30-05-2019 DATA DE HISTORICO DE VENDA
      // var link = this.state.lastDate + "&" + this.state.currentDate;
      // alert(this.state.lastDate + "&" + this.state.currentDate);
      const response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/venda/listar/01-01-2019&30-06-2019');
      const json = await response.json();
      this.setState({ data: json });

      
  };

  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  menuAdmin = () =>  {
    return(
      <View>
         <TouchableOpacity onPress={() => {                   
                                  this.setState({ isModalVisible: !this.state.isModalVisible })           
                                  Actions.inicio({ user: this.state.Users })
                                }}
                style={styles.menuTouch}>
                <Icon
                  name="home"
                  color="white"
                  size={15}
                  style={{ marginTop: 10, marginLeft: 20 }}
                />
                <Text style = {styles.menu}> Home </Text>
              </TouchableOpacity>
    <TouchableOpacity onPress={() => {                   
        this.setState({ isModalVisible: !this.state.isModalVisible })           
        Actions.tela({ tipo : 'produtos', user: this.state.Users })
      }}
      style={styles.menuTouch}>
      <Icon
      name="sticky-note"
      color="white"
      size={15}
      style={{ marginTop: 10, marginLeft: 20 }}
      />
      <Text style = {styles.menu}> {'Listar Produtos'}</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => {                   
                                  this.setState({ isModalVisible: !this.state.isModalVisible })           
                                  Actions.tela({ tipo : 'fornecedor', user: this.state.Users })
                                }}
                style={styles.menuTouch}>
                <Icon
                  name="sticky-note"
                  color="white"
                  size={15}
                  style={{ marginTop: 10, marginLeft: 20 }}
                />
                <Text style = {styles.menu}> Listar Fornecedores</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {                   
                                  this.setState({ isModalVisible: !this.state.isModalVisible })           
                                  Actions.tela({ tipo : 'categoria', user: this.state.Users })
                                }}
               style={styles.menuTouch}>
                <Icon
                  name="sticky-note"
                  color="white"
                  size={15}
                  style={{ marginTop: 10, marginLeft: 20 }}
                />
                <Text style = {styles.menu}> Listar Categorias </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {                   
                                  this.setState({ isModalVisible: !this.state.isModalVisible })           
                                  Actions.camera({ tipo : 'produtos', editProd: { edit : false }, cam: false, user: this.state.Users })
                                }}
               style={styles.menuTouch}>
                <Icon
                  name="plus"
                  color="white"
                  size={15}
                  style={{ marginTop: 10, marginLeft: 20 }}
                />
                <Text style = {styles.menu}> Adicionar Produtos </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {                   
                                  this.setState({ isModalVisible: !this.state.isModalVisible })           
                                  Actions.addF({ tipo : 'fornecedor', editFor: { edit : false }, user: this.state.Users })
                                }}
               style={styles.menuTouch}>
                <Icon
                  name="plus"
                  color="white"
                  size={15}
                  style={{ marginTop: 10, marginLeft: 20 }}
                />
                <Text style = {styles.menu}> Adicionar Fornecedores </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {                   
                                  this.setState({ isModalVisible: !this.state.isModalVisible })           
                                  Actions.addC({ tipo : 'categoria', editCat: { edit : false }, user: this.state.Users })
                                }}
               style={styles.menuTouch}>
                <Icon
                  name="plus"
                  color="white"
                  size={15}
                  style={{ marginTop: 10, marginLeft: 20 }}
                />
                <Text style = {styles.menu}> Adicionar Categorias </Text>
              </TouchableOpacity></View>
    );
  }


  render() {

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");


    return (
      <ThemeProvider>
      <StatusBar backgroundColor="#a01601" barStyle="light-content"/>
      <ScrollView style={{ height: 500}}>
        <View style={{ flex: 1, backgroundColor: '#a01601', height: 50, flexDirection: 'row'  }}>
          <Icon
            name="bars"
            color="white"
            size={25}
            style={{ marginTop: 10, marginLeft: 20 }}
            onPress={this._toggleModal}
          />

          <Text style={{ marginTop: 12, marginLeft: 20, color: 'white' }}>ControlX</Text>  
        </View>

        <View>
          <Modal 
            isVisible={this.state.isModalVisible}  
            onBackdropPress={() => this.setState({ isModalVisible: false })} 
            onSwipeComplete={() => this.setState({ isModalVisible: false })}
            deviceHeight={deviceHeight}
            animationIn = {'fadeInLeft'}
            animationOut = {'fadeOutLeft'}
            style={{ flex: 1, height: 900, marginLeft: -20, marginTop: 0, marginEnd: 0, marginBottom: 0 }}
          >
            <View style={{ flex: 1, backgroundColor: '#a01601', height: (deviceHeight), width: 250, marginLeft: 0 }} linearGradientProps={{
                colors: ['#751102', '#A72F1D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}>

              <ListItem
                leftAvatar={{ source: { uri: (this.state.Users.imagemUrl != 'Indisponível') ? '' + this.state.Users.imagemUrl :'http://i.imgur.com/YdhUZdZ.png' } }}
                title={this.state.Users.nome}
                subtitle={(this.state.Users.role.nomeRole == 'ROLE_ALMOXARIFE') ? 'Almoxarife' : (this.state.Users.role.nomeRole == 'ROLE_GERENTE') ? 'Gerente' : (this.state.Users.role.nomeRole == 'ROLE_VENDEDOR') ? 'Vendedor' : 'Administrador'  }
                rightIcon={{ name: 'power-off', color: '#751102', type: 'font-awesome', onPress: () => {this.setState({ isModalVisible: !this.state.isModalVisible }); Actions.login()} } }
                style={{ marginLeft: 10, marginTop: 0, marginEnd: 0, marginBottom: 0 }}
              />
              
              
              {
                
                (this.state.Users.role.nomeRole == 'ROLE_ALMOXARIFE') 
                ? this.menuAlmo() 
                : (this.state.Users.role.nomeRole == 'ROLE_GERENTE') 
                ? this.menuGerente() 
                : (this.state.Users.role.nomeRole == 'ROLE_VENDEDOR') 
                ? this.menuVendas() 
                : this.menuAdmin()
                
              }

              

            </View>
          </Modal>


          
        </View>
        <View  style={{ flex: 1, backgroundColor: 'white', height: 'auto', paddingBottom: 20 }}>
          {this.state.data.map((prod) => {
              if(this.state.aux == 0){
                this.state.totalPrice = this.state.totalPrice + prod.valor;
                this.setState({aux: 1});
              }
           })
          }  

          <PricingCard
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['#42f46b', '#217022'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              color="#42f46b"
              title="Vendas total"
              price={"R$" + parseFloat(this.state.totalPrice) }
              info={[" *do mes atual.", 'Veja o histórico de venda mais detalhado']}
              button={{ title: 'VER HISTORICO', icon: 'history'} }
              borderRadius={5} containerStyle={{ borderColor: '#42f46b', borderStyle:'solid' }}
              onButtonPress={() => {
                Actions.history({ user: this.state.Users })
              }} 
          /> 
        </View>
      </ScrollView>
      </ThemeProvider>
    );
    
  }
}


const styles = StyleSheet.create({
  menu: {
    color: 'white',
    marginTop: 7,
    fontSize: 15
  },
  menuTouch: {
    marginLeft: 25,
    flexDirection: 'row',
    marginTop: 20
  },
  btnEscola: {
    width: 150,
    marginLeft: 10,
    marginRight: 10
  },
  alinhar_row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  alinar_centro: {
    justifyContent: 'center'
  }
});