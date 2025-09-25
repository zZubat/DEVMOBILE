import React, {useEffect, useState, useRef} from "react";
import {Button, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {CameraView, useCameraPermissions } from "expo-camera";

export default function CameraComponent(){
  const [facing, setFacing] = useState('back');

  const [permission, requestPermission] = useCameraPermission();
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
      <View>
        <View>
          <Button title="Tirar uma foto" onPress={()=>setCapturedPhoto(null)}></Button>
        </View>
        <Image source={{uri=capturedPhoto.uri}} style={StyleSheet.preview}/>
      </View>
    )
  }
}