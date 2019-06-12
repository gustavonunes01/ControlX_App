import React, { Component } from "react";
import { TextInput, Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button, ThemeProvider, Input, Header, HeaderIcon, HeaderProps, HeaderSubComponent } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state ={ 
      user: '',
      password: '',
      data: [] ,
      message: ''
    }

    this.setUser = this.setUser.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }

  setUser (event) {
    this.setState({ user: event.nativeEvent.text });
  }

  setPassword (event) {
    this.setState({ password: event.nativeEvent.text });
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {

      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/usuarios/listarTodos");
      const json = await response.json();
      this.setState({ data: json,  isLoading: false });
    
    
  };


  render() {
    return (
      

      <View style={{ margin: 10, flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch', }}>
       
        <Input
          placeholder='Login'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
          onChange={this.setUser}
          style={{ padding: 50, flex: 1}}
        />

        <Input
          placeholder='Senha'
          leftIcon={
            <Icon
              name='key'
              size={24}
              color='black'
            />
          }
          secureTextEntry={true}
          onChange={this.setPassword}
          style={{ padding: 50, flex: 1}}
        />
        <Text></Text>
        <Button
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['#751102', '#A72F1D'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          style={{ flex: 1, width: 50, marginTop: 50, padding: 50, marginStart: 0}}
          title="Entrar"
          type="solid"
          onPress={() => {

            this.state.data.map((userData) => {

              if(this.state.user == userData.login && this.state.password == userData.senha){
                Actions.inicio({ user: userData });
              }
              else{
                this.setState({ message: 'Login ou senha incorretos!!' })
              }
            
            })
            
          }}
        />
        {!!this.state.message && (
          <Text
            style={{fontSize: 14, color: '#751102', padding: 5, textAlign: "center"}}>
            {this.state.message}
          </Text>
          )}
      </View>
    );
  }
}
