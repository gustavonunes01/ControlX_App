import React from "react";
import { Router, Scene, Stack, Drawer } from "react-native-router-flux";

import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Tela from "./components/Tela";
import AddProduct from "./components/AddProdcut";
import Camera from "./components/Camera";
import AddCat from "./components/AddCategoria";
import AddFor from "./components/addFornecedor"
import Historicos from "./components/Historicos"
import Historico from "./components/Historico"

// drawer




export default props => (
  <Router>
    <Stack key="root">
      <Scene key="inicio" component={Inicio} hideNavBar hideTabBar />
      <Scene key="login" component={Login} initial title="Login" hideNavBar />
      <Scene key="tela" component={Tela} title="Lista"/>
      <Scene key="addP" component={AddProduct} title="Produtos"/>
      <Scene key="camera" component={Camera} title="Camera"  />
      <Scene key="addC" component={AddCat} title="Categoria"  />
      <Scene key="addF" component={AddFor} title="Fornecedor"  />
      <Scene key="historicos" component={Historicos} title="Historico Total" hideNavBar hideTabBar/>
      <Scene key="history" component={Historico} title="Historicos"/>
    </Stack>
  </Router>
);

