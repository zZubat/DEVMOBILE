import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const autenticar = () => {
    if (username === 'admin' && senha === '1234') {
      navigation.navigate('Estoque');
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        placeholder="Usuário"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Entrar" onPress={autenticar} />
      <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
        <Text style={styles.link}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center'
  }
});
