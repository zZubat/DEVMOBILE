import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TextInput } from "react-native";
import axios from "axios";

//Declarar a função do componente principal 'app'
export default function app() {
  //Declaração a variavel de estado users
  const [users, setUsers] = useState([]);
  //Declarar 'newName' e a  newEmail' como vars de estado
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  //Declara const 'API' 

  const API = "http://l10.110.12.38:3000/users";

  //Declarar uma função assincrona para fazer chamada do POST
  //para inserção de um novo usuario 
  const addUser = async () => {
    try {
      //Faz uma requisição do tipo POST para url API
      //Com objetivo de enviar os dados do novo usuario
      const response = await axios.post(API,
        { name: newName, email: newEmail }
      );
      //Se não houver erro o comando abaixo será executado
      setUsers([...users, response.data]);
      //Limpa os campos que armazenavam os dados
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.error("Error POST: ", error.message);
    }
  };

  //Define a return do App
  return (
    <View style={styles.container}>
      //Exibir texto
      <Text style={styles.title}> POST - Adicionar Usuario </Text>
      //Inserir campo para inserção do nome de Usuario
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      //Criação de Button para edição de novo usuario
      <Button title="Adicionar Usuario" onPress={addUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <Text>{item.name} - {item.email}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: " #ccc", padding: 8, marginBottom: 8 }
})