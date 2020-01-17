import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

// Os 3 conceitos do react
  //Componente: Função que retorna algum conteúdo HTML/CSS/JS. Criar um componente sempre quando algo se repetir ou quando eu quero isolar um pedaço da nossa aplicação. Colocar um componente por arquivo.
  //Propriedade: A partir do momento que eu passo um atributo ('title', ...) para um componente, eu tenho uma propriedade. Informações quue um componente PAI passa para o componente FILHO.
  //Estado: Informações mantidas pelo componentes (Lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  return(
    <div id="app">
      <aside>
        <strong> Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
