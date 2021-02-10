import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  // Criando o estado para os repositórios
  const [repositories, setRepositories] = useState([]);

  // Atualizando a lista de repositórios
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  // Cadastrando um novo repositório
  async function handleAddRepository() {
    // Fazendo o cadastrado com a chamada à API
    const response = await api.post('repositories', {
      title: 'Umbriel',
      url: 'https://github.com/rocketseat/umbriel',
      techs: ['Node.js', 'ReactJS'],
    })
    // Salvando o resultado obtido no estado criado
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  // Removendo um repositório
  async function handleRemoveRepository(id) {
    // Fazendo a chamada à API
    await api.delete(`repositories/${id}`)

    // Atualizando a lista de repositórios no estado
    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
