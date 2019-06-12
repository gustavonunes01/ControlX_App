import React, { Component } from "react";
import { TextInput} from "react-native";
import { Button, ThemeProvider, Input, Header, HeaderIcon, HeaderProps, HeaderSubComponent,
         AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native-elements';


/* 

http://167.114.114.169:8080/controlx-1.0/produtos/listarTodos => GET
http://167.114.114.169:8080/controlx-1.0/produtos/cadastrar => POST
http://167.114.114.169:8080/controlx-1.0/produtos/editar => POST
http://167.114.114.169:8080/controlx-1.0/produtos/deletar/{id} => DELETE

http://167.114.114.169:8080/controlx-1.0/fornecedores/listarTodos => GET
http://167.114.114.169:8080/controlx-1.0/fornecedores/cadastrar => POST
http://167.114.114.169:8080/controlx-1.0/fornecedores/editar => POST
http://167.114.114.169:8080/controlx-1.0/fornecedores/deletar/{id} => DELETE

http://167.114.114.169:8080/controlx-1.0/categorias/listarTodas => GET
http://167.114.114.169:8080/controlx-1.0/categorias/cadastrar => POST
http://167.114.114.169:8080/controlx-1.0/categorias/editar => POST
http://167.114.114.169:8080/controlx-1.0/categorias/deletar/{id}  => DELETE

*/



  //----------------POST-------------//
  async function setProduct(params) {

    /*{
        "nome": "Teste Json",
        "preco": 10,
        "qtd": 10,
        "tipoUn": "un",
        "estoqueMin": 2,
        "categoria": {"id": 1},
        "imagemUrl": "https://www.paodeacucar.com/img/uploads/1/43/472043.jpg",
        "fornecedor": {"id": 1},
        "codigoBarras": 123456789,
        "deleted": false
      } */
      try {
        let response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/produtos/cadastrar',
          {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(params)
          });

        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        //console.error(error);
      }
  }

  async function setCat(params) {
    try {
      let response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/categorias/cadastrar',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

      let responseJson = await response.json();
      return responseJson.id;
    } catch (error) {
      //console.error(error);
    }
  }

  async function setFor(params) {
    try {
      let response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/fornecedores/cadastrar',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

      let responseJson = await response.json();
      return responseJson.id;
    } catch (error) {
      //console.error(error);
    }
  }

  async function editFor(params) {
    try {
      let response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/fornecedores/editar',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

      let responseJson = await response.json();
      return responseJson.nome;
    } catch (error) {
      console.error(error);
    }
  }

  async function editCat(params) {
    try {
      let response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/categorias/editar',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

      let responseJson = await response.json();
      return responseJson.nome;
    } catch (error) {
      //console.error(error);
    }
  }

  async function editProd(params) {
    try {
          let response = await fetch('http://167.114.114.169:8080/controlx-1.0/rest/produtos/editar',
          {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  //------------GET--------------//
  async function buscarProdbyId(id) {
    try {
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/produtos/pesquisarId/" + id);
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  }

  async function buscarProdbyCodigo(codigo) {
    try {
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/produtos/pesquisarCodigo/" + codigo);
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  }

  async function getAllUsers() {
    try {
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/usuarios/listarTodos");
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  };

  //----------------DELET------------------//
  const fetchDelete = (url= ``, id="") => {
      let trueUrl = `${url}/${id}`;
      return fetch(trueUrl, {
          method: 'delete'
      })
      .then(res => res.json());
  };

  //----------FUNCTIONS---------//

  async function validaLogin() {

    var data = [];

    fetchData = async () => {

      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/usuarios/listarTodos");
      const json = await response.json();
      data = json;
    };

    data.map((userData) => {

      if(a == userData.login && b == userData.senha){
        return 'true';
      }
      else{
        return 'false';
      }
    
    });
    
  };


  async function faltaEstoque() {

    var data = [];

    try{
      const response = await fetch("http://167.114.114.169:8080/controlx-1.0/rest/produtos/listarTodos");
      const json = await response.json();
      data.push(json);
    }catch{
      data = [{error: 'erro'}]
    }

    return alert(JSON.stringify(data));
    
    // data.map((prod) => {

    //   <Text>{prod.json.nome}</Text>
    
    // });
    
  };


  export{
    //Creat
    setProduct, setCat, setFor, 
    //Edit
    editCat, editFor, editProd,
    //Delet
    fetchDelete, 
    //Views
    buscarProdbyId, buscarProdbyCodigo, getAllUsers,
    //Functions
    validaLogin, faltaEstoque 
    };
