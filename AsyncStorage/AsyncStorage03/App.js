import React, { useState, useEffect } from 'react'; // Importa React e os hooks usestate (para gerenciar estado) e
// useEffect (para executar efeitos colaterais em componentes funcionais).
import { View, Text, Button, StyleSheet } from 'react-native'; // Importa componentes essenciais do React Native
// para construir a interface do usuário.
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage, uma API para
// armazenamento persistente de dados simples no dispositivo.


export default function App() { // Define o componente principal da aplicação, chamado App.
  const [usuario, setUsuario] = useState(null); // Declara uma variável de estado 'usuario' para armazenar um
  // objeto de informações do usuário e sua função 'setUsuario' para atualizá-lo. O valor inicial é null.
  const [mensagem, setMensagem] = useState(''); // Declara uma variável de estado 'mensagem' e sua função
  // 'setMensagem para exibir mensagens ao usuário. O valor inicial é uma string vazia.
  useEffect(() => { // 0 hook useEffect é usado para executar um efeito colateral, neste caso, carregar as
    // informações do usuário.
    carregarUsuario(); // Chama a função 'carregarUsuario' quando o componente é montado.
  }, []); // 0 array vazio como segundo argumento garante que o efeito seja executado apenas uma vez,
  // similar a componentDidMount em componentes de classe.
  const salvarUsuario = async () => { // Define uma função assincrona chamada 'salvarUsuario' para salvar
    // um objeto de usuário no AsyncStorage.
    const novoUsuario = { nome: 'João', idade: 30, email: 'joao@email.com' }; // Cria um objeto JavaScript 'novoUsuario'
    // com informações de exemplo.
    try { // Inicia um bloco try-catch para lidar com possíveis erros durante a operação de salvamento.
      const jsonValue = JSON.stringify(novoUsuario); // Converte o objeto 'novoUsuario' para uma string JSON,
      // pois o AsyncStorage armazena apenas strings.
      await AsyncStorage.setItem('usuarioInfo', jsonValue); // Tenta salvar a string JSON no AsyncStorage sob a
      // chave 'usuarioInfo'. Await garante que a operação seja concluída antes de prosseguir.
      setMensagem('Usuário salvo!'); // Se o salvamento for bem-sucedido, atualiza a mensagem de sucesso.
      carregarUsuario(); // Chama 'carregarUsuario' novamente para atualizar a interface com os dados recém-salvos.
    } catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.
      setMensagem('Erro ao salvar o usuário: ' + error); // Atualiza a mensagem com a descrição do erro, se houver.
    }
  };
  const carregarUsuario = async () => { // Define uma função assincrona chamada 'carregarUsuario para buscar as informações
    // do usuário no AsyncStorage.
    try { // Inicia um bloco try-catch para lidar com possíveis erros durante a operação de carregamento.
      const jsonValue = await AsyncStorage.getItem('usuarioInfo'); // Tenta recuperar a string JSON associada à chave
      // 'usuarioInfo' do AsyncStorage. Await garante que a operação seja concluída antes de prosseguir.
      // 'usuarioInfo do AsyncStorage. Await garante que a operação seja concluida antes de prosseguir.  
      if (jsonValue !== null) { // Verifica se uma string JSON foi encontrada (ou seja, não é nula).  
        setUsuario(JSON.parse(jsonValue)); // Se uma string JSON for encontrada, converte-a de volta para um objeto  
        // JavaScript e atualiza a variável de estado 'usuario".  
      } else {
        setUsuario(null); // Se nenhuma string JSON for encontrada (o valor é nulo).  
      }
       // Define a variável de estado 'usuario' como null, indicando que não há usuário salvo.  
    } catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.  
      console.error('Erro ao carregar o usuário:', error); // Registra o erro no console para fins de depuração.  
      setMensagem('Erro ao carregar o usuário.'); // Atualiza a variável de estado 'mensagem com uma mensagem de  
      // erro para o usuário.  
    }
  };
  return ( // Inicia a seção de renderização do componente, que define a estrutura da interface do usuário.  
    <View style={styles.container}>
      <Text>Informações do Usuário:</Text>
      <Text>{usuario ? `Nome: ${usuario.nome}` : 'Nenhum usuário salvo.'}</Text>
      <Text>{usuario ? `Idade : ${usuario.idade}` : ''}</Text>
      <Text>{usuario ? `Email : ${usuario.email}` : ''}</Text>
      <Button title="Salvar Usuário" onPress={salvarUsuario} />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ // Cria um objeto de estilos usando StyleSheet.create, que otimiza os  
  // estilos para o React Native.  
  container: { // Define estilos para o contêiner principal da aplicação.  
    flex: 1, // Faz com que o contêiner ocupe todo o espaço disponível.  
    justifyContent: 'center', // Centraliza o conteúdo verticalmente.  
    alignItems: 'center', // Centraliza o conteúdo horizontalmente.  
    padding: 20, // Adiciona um preenchimento de 20 unidades em todos os lados.  
  },
  mensagem: { // Define estilos para a mensagem de status.  
    marginTop: 10, // Adiciona uma margem superior de 10 unidades.  
    fontWeight: 'bold', // Define a fonte da mensagem como negrito.  
  },
});