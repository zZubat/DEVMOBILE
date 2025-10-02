import React, {useEffect, useState, useRef} from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {CameraView, useCameraPermissions } from "expo-camera";

export default function CameraComponent(){
  const [facing, setFacing] = useState('back');

  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    requestPermission();
  })

  if(!permission){
    return <View/>
  }

  if (!permission.granted){
    return(
      <View>
        <Text>Preciso de sua permissão para acesso á camera</Text>
        <Button onPress={requestPermission} title="Conceder Permissão"/>
      </View>
    )
  }

  function toggleCameraFacing(){
    setFacing(current => (current === 'back' ? 'front':'back'));
  } 

  async function takePicture(){
    if(cameraRef.current){
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo);
      console.log(photo.uri);
    }
  }

  if(capturedPhoto){
    return(
      <View style={styles.container}>
        <View style={styles.tirar_outra}>
          <Button title="Tirar uma foto" onPress={()=>setCapturedPhoto(null)}></Button>
        </View>
        <Image source={{uri: capturedPhoto.uri}} style={styles.preview}/>
      </View>
    )
  }

  return (
    <View style={styles.camera}>
      <CameraView facing={facing} ref={cameraRef} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
            <Text style={styles.text}>Virar Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  tirar_outra :{marginTop: 50},
  container: {flex: 1,justifyContent: 'center'},
  cameraContainer: {flex: 1,},
  camera: {flex: 1, width: '100%'},
  buttonContainer: {flex: 1,flexDirection: 'row',ImageBackground: 'transparent', margin: 64},
  button: {flex: 1,alignSelf: 'flex-end', alignItems:'center'},
  text: {fontSize: 25,fontWeight: 'bold', color: 'white'},
  preview: {flex: 1,resizeMode: 'contain',},
});