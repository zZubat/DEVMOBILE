import React, { useState, useEffect, use }  from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  // Estado para armazenar o objeto de som carregado
  const [sound, setSound] = useState(null);
  // Estado para controlar se o som está tocando
  const [isPlaying, setIsPlaying] = useState(false);
  const [ isLooping, setIsLooping] = useState(false);

  // Função assíncrona para carregar o arquivo de áudio
  async function loadSound() {
    console.log('Carregando Som...');
    try {
      // Carrega o arquivo de áudio 'assets/audio_exemplo.mp3'.
      // Certifique-se de que este arquivo existe na pasta 'assets' do seu projeto.
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/560446music.mp3')
      );
      // Atualiza o estado 'sound' com o objeto de som carregado
      setSound(sound);
      console.log('Som Carregado');
    } catch (error) {
      console.error('Erro ao carregar o som:', error);
    }
  }

  // Função assíncrona para reproduzir o som
  async function playSound() {
    if (sound) {
      console.log('Tocando Som...');
      try {
        // Inicia a reprodução do som, async
        await sound.playAsync();
        // Atualiza o estado 'isPlaying' para true
        setIsPlaying(true);
      } catch (error) {
        console.error('Erro ao tocar o som:', error);
      }
    }
  }
  // Função assíncrona para pausar o som
  async function pauseSound() {
    if (sound && isPlaying) {
      console.log('Pausando Som...');
      try {
        // Pausa a reprodução do som
        await sound.pauseAsync();
        // Atualiza o estado 'isPlaying' para false
        setIsPlaying(false);
      } catch (error) {
        console.error('Erro ao pausar o som:', error);
      }
    }
  }
  // Função assíncrona para descarregar o som da memória
  async function unloadSound() {
    if (sound) {
      console.log('Descarregando Som...');
      try {
        // Para a reprodução se estiver tocando
        await sound.stopAsync();
        // Descarrega o som da memória
        await sound.unloadAsync();
        // Define o estado 'sound' para null
        setSound(null);
        // Define o estado 'isPlaying' para false
        setIsPlaying(false);
        console.log('Som Descarregado');
      } catch (error) {
        console.error('Erro ao descarregar o som:', error);
      }
    }
  }
  // Função assíncrona para definir o loop do som
  async function setLooping() {
    if (sound) {
      try {
        // Define se o som deve repetir ao final
        await sound.setIsLoopingAsync(!isLooping);
        // Atualiza o estado 'isLooping'
        setIsLooping(!isLooping);
        console.log('Looping:', isLooping);
      } catch (error) {
        console.error('Erro ao definir o looping:', error);
      }
    }
  }
  // Este useEffect é executado uma vez quando o componente é montado
  useEffect(() => {
    // Carrega o som assim que o componente é renderizado
    loadSound();
    // Função de limpeza para descarregar o som quando o componente é desmontado
    return () => {
      console.log('Desmontando componente, descarregando som...');
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []); // O array vazio no final indica que este efeito roda apenas uma vez
  return (
    <View style={styles.container}>
      {/* Botão para reproduzir o som */}
      <Button title={isPlaying? 'Pausar Som': 'Tocar Som'} onPress={isPlaying ? pauseSound : playSound} disabled={!sound} />
      {/* Botão para ativar/desativar o loop */}
      <Button title={isLooping ? 'Desativar Loop' : 'Ativar Loop'} onPress={setLooping} disabled={!sound} />
      {/* Botão para descarregar o som */}
      <Button title="Descarregar Som" onPress={unloadSound} disabled={!sound} />
    </View>
  );
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });