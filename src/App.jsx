import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Player from "./components/Player";

import Home from "./pages/Home";
import MyList from "./pages/MyList";

import { store, persistor } from "./store";

import ContainerMain from "./style/containerMain";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ContainerMain>
            <Header />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/minha-lista" element={<MyList />} />
            </Routes>
          </ContainerMain>
          <Player />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
