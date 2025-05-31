import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState  
// (para gerenciar estado) e useEffect (para executar efeitos colaterais em componentes funcionais).  
import { View, Text, Button, StyleSheet } from 'react-native'; // Importa componentes essenciais  
// do React Native para construir a interface do usuário.  
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage,  
// uma API para armazenamento persistente de dados simples no dispositivo.  

export default function App() { // Define o componente principal da aplicação, chamado App.  
  const [nomeSalvo, setNomeSalvo] = useState(''); // Declara uma variável de estado 'nomeSalvo'  
  // e sua função 'setNomeSalvo' para atualizá-la. O valor inicial é uma string vazia.  

  useEffect(() => { // 0 hook useEffect é usado para executar um efeito colateral, neste caso,  
    // carregar o nome salvo.  
    carregarNome(); // Chama a função 'carregarNome' quando o componente é montado.  
  }, []); // 0 array vazio como segundo argumento garante que o efeito seja executado apenas  
  // uma vez, similar a componentDidMount em componentes de classe.  

  const carregarNome = async () => { // Define uma função assíncrona chamada 'carregarNome' para  
    // buscar o nome no AsyncStorage.  
    try { // Inicia um bloco try-catch para lidar com possíveis erros durante a operação de carregamento.  
      const nome = await AsyncStorage.getItem('nomeUsuario'); // Tenta recuperar o valor associado à  
      // chave 'nomeUsuario' do AsyncStorage. Await garante que a operação seja concluída antes de prosseguir.  
      if (nome != null) { // Verifica se um nome foi encontrado (ou seja, não é nulo).  
        setNomeSalvo(nome); // Se um nome for encontrado, atualiza a variável de estado 'nomeSalvo'  
        // com o nome recuperado.  
      } else { // Se nenhum nome for encontrado (o valor é nulo).  
        setNomeSalvo('Nenhum nome salvo.'); // Define a mensagem para indicar que nenhum nome foi salvo.  
      }

    } catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.  
      console.error('Erro ao carregar o nome:', error) // Registra o erro no console para fins de depuração.  
      setNomeSalvo('Erro ao carregar o nome.'); // Atualiza a variável de estado 'nomeSalvo com uma mensagem  
      // de erro para o usuário.  
    }
  };
  return ( // Inicia a seção de renderização do componente, que define a estrutura da interface do usuário.  
    <View style={styles.container}>
      <Text>Nome Salvo: {nomeSalvo}</Text>
      <Button title="Carregar Nome" onPress={carregarNome} />
    </View>
  );
}
const styles = StyleSheet.create({ // Cria um objeto de estilos usando StyleSheet.create, que otimiza os  
  // estilos para o React Native.  
  container: { // Define estilos para o contêiner principal da aplicação.  
    flex: 1, // Faz com que o contêiner ocupe todo o espaço disponível.  
    justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do contêiner.  
    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do contêiner.  
    padding: 20, // Adiciona um preenchimento de 20 unidades em todos os lados do contêiner.  
  },
});  
