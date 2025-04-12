import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AdicionarPecaScreen({ route, navigation }) {
  const { adicionarPeca } = route.params;

  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const salvarPeca = () => {
    if (!nome || !codigo || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novaPeca = {
      nome,
      codigo,
      quantidade: parseInt(quantidade)
    };

    adicionarPeca(novaPeca);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Nova Peça</Text>

      <TextInput
        placeholder="Nome da peça"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Código"
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <Button title="Salvar" onPress={salvarPeca} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  }
});
