import { View, Text, Button,StyleSheet} from "react-native";

export default function UserList({users, onUserChanged}) {

   const updateUser = async (id) => {
  try {
    const response = await fetch(`http://10.110.12.38:3000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Nome Atualizado",
        email: "atualizado@gmail.com",
      }),
    });

    if (!response.ok) {
      throw new Error("Falha ao atualizar o usuário. Status: " + response.status);
    }

    const updatedUser = await response.json();
    console.log("Usuário atualizado com sucesso:", updatedUser);
    
    onUserChanged();

  } catch (error) {
    console.error("Erro no PUT:", error.message);
            }
        }
    const deleteUser = async (id) =>{
        try{
            await fetch(`http://10.110.12.38:3000/users/${id}`,
                {method: "DELETE"});
                onUserChanged();
        }catch(error){
            console.error("Error DELETE: ", error.message);
        }
    };

    return (
        <view>
            {users.map((u) => (
                <View key={u.id} style={styles.card}>
                    <Text style={styles.text}>{u.name} - {u.email}</Text>
                    <View style={styles.buttons}>
                        <Button title="Editar" onPress={() => updateUser(u.id)} />
                        <Button title="deletar" onPress={() => deleteUser(u.id)} color="red" />    
                    </View>
                </View>
            ))}
        </view>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f2f2f2",
        borderRadius:5
    },
    text: {
        fontSize:16,
        marginBottom: 5
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});