import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Importa o componente de vídeo da biblioteca expo-av
import { Video } from 'expo-av';

export default function App() {
  // Referência ao componente de vídeo (para acessar métodos como play/pause)
  const video = useRef(null);

  // Estado para guardar se o vídeo está sendo reproduzido ou não
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      {/* Componente de vídeo */}
      <Video
        ref={video} // Referência para controlar o vídeo via código
        style={styles.video} // Estilo visual
        source={{
          uri: 'https://www.w3schools.com/html/mov_bbb.mp4', // URL do vídeo
        }}
        useNativeControls // Mostra os controles nativos padrão
        resizeMode="contain" // Mantém proporção correta
        isLooping // Faz o vídeo reiniciar automaticamente
        onPlaybackStatusUpdate={(status) => setStatus(status)} // Atualiza status em tempo real
      />
      /* Botões personalizados */
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => video.current.playAsync()} // Reproduz o vídeo
        >
          <Text style={styles.buttonText}>▶️ Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => video.current.pauseAsync()} // Pausa o vídeo
        >
          <Text style={styles.buttonText}>⏸️ Pause</Text>
        </TouchableOpacity>
      </View>
      {/* Texto exibindo o status atual */}
      <Text style={styles.status}>
        {status.isPlaying ? 'Reproduzindo...' : 'Pausado'}
      </Text>
    </View>
  );
}
// Estilos do app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#f0f0f0', // Cor de fundo clara
    padding: 20,
  },
  video: {
    width: '100%', // Ocupa toda a largura possível
    aspectRatio: 16 / 9, // Mantém proporção widescreen
    borderColor: '#333', // Cor da borda
    borderWidth: 2, // Espessura da borda
    borderRadius: 10, // Arredondamento dos cantos
    backgroundColor: '#000', // Fundo preto atrás do vídeo
  },
  buttons: {
  flexDirection: 'row', // Botões lado a lado
  marginTop: 20,
},
  button: {
  backgroundColor: '#0066cc', // Cor de fundo azul
  paddingVertical: 10,
  paddingHorizontal: 20,
  marginHorizontal: 10,
  borderRadius: 5,
},
  buttonText: {
  color: '#fff', // Cor do texto
  fontWeight: 'bold',
  fontSize: 16,
},
  status: {
  marginTop: 20,
  fontSize: 18,
  color: '#333',
},
});