import React, { useState } from 'react'; // Importa React e o hook useState, que permite gerenciar o estado em componentes funcionais.  
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'; // Importa componentes essenciais do React Native para  

// construir a interface do usuário.  
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage, uma API para armazenamento persistente de  

// dados simples no dispositivo.  
export default function App() { // Define o componente principal da aplicação, chamado App.  
  const [nome, setNome] = useState(''); // Declara uma variável de estado 'nome' e sua função 'setNome' para atualizá-la. O valor inicial  
  //é uma string vazia.  
  const [mensagem, setMensagem] = useState(''); // Declara uma variável de estado 'mensagem' e sua função 'setMensagem para exibir mensagens  
  // ao usuário. O valor inicial é uma string vazia.  
  const salvarNome = async () => { // Define uma função assíncrona chamada 'salvarNome' para salvar o nome no AsyncStorage.  
    try { // Inicia um bloco try-catch para lidar com possíveis erros durante a operação de salvamento.  
      await AsyncStorage.setItem('nomeUsuario', nome); // Tenta salvar o valor da variável 'nome' no AsyncStorage sob a chave 'nomeUsuario'.  
      // Await garante que a operação seja concluída antes de prosseguir.  
      setMensagem('Nome salvo com sucesso!'); // Se o salvamento for bem-sucedido, atualiza a mensagem de sucesso.  
      setNome(''); // Limpa o campo de entrada de texto após o nome ser salvo.  
    } catch (error) { // Captura qualquer erro que ocorra durante a execução do bloco try.  
      setMensagem('Erro ao salvar o nome:' + error); // Atualiza a mensagem com a descrição do erro, se houver.  
    }
  };

  return ( // Inicia a seção de renderização do componente, que define a estrutura da interface do usuário.  
    <View style={styles.container}>
      <Text>Digite seu nome:</Text>
      <TextInput
        style={styles.input} // Aplica estilos definidos em 'styles.input' ao campo de texto.  
        value={nome} // Define o valor atual do campo de texto como o valor da variável de estado 'nome'.  
        onChangeText={setNome} // Define uma função que é chamada toda vez que o texto no campo de entrada muda, atualizando a variável de  
      // estado 'nome'. 
      />
      <Button title="Salvar Nome" onPress={salvarNome} />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ // Cria um objeto de estilos usando StyleSheet.create, que otimiza os estilos para o React Native.  
  container: { // Define estilos para o contêiner principal da aplicação
    flex: 1, // Faz com que o contêiner ocupe todo o espaço disponível.  
    justifyContent: 'center', // Centraliza o conteúdo verticalmente.  
    alignItems: 'center', // Centraliza o conteúdo horizontalmente.  
    padding: 20, // Adiciona um preenchimento de 20 unidades em todos os lados.  
  }, input: { // Define estilos para o campo de entrada de texto.
    height: 40, // Define a altura do campo de texto como 40 unidades.  
    borderColor: 'gray', // Define a cor da borda como cinza.  
    borderWidth: 1, // Define a largura da borda como 1 unidade.  
    marginBottom: 10, // Adiciona uma margem inferior de 10 unidades.  
    paddingHorizontal: 10, // Adiciona um preenchimento horizontal de 10 unidades dentro do campo de texto.  
    width: '80%', // Define a largura do campo de texto como 80% da largura do contêiner pai.  
  },
  mensagem: { // Define estilos para a mensagem de status.  
    marginTop: 10, // Adiciona uma margem superior de 10 unidades.  
    fontWeight: 'bold', // Define a fonte da mensagem como negrito.  
  },
});  