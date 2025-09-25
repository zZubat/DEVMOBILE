import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function UseForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
    if (!name || !email) return;

    try {
      const response = await fetch("http://10.110.12.38:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setName("");
      setEmail("");
      onUserAdded();
    } catch (error) {
      console.error("erro ao adicionar usuario", error.message);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="adicionar usuario" onPress={addUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {marginBottom:20},
  input: {
    borderColor: "#ccc",
    padding:8,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 4,
  },
});
