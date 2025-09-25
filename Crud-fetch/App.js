import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import UseForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function app(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState (false);

  const fetchUsers = async () => {
    try{
      setLoading(true);

      const response = await fetch("http:// 10.110.12.38:3000/users");

      const data = await response.json();

      setUsers(data);

    }catch(error){
      console.error("Error GET: ", error.message);
    }finally{
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>crud com fetch</Text>
      <UseForm onUserAdded={fetchUsers}/>
      <ScrollView>
        {loading ?(
          <Text> carregando ...</Text>
        ): (
          <UserList users={users} onUserChanged={fetchUsers}/>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding: 20, marginTop: 40},
  title: {fontSize: 22, fontWeight: "bold", marginTop:20}
})
