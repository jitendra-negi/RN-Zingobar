import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import ImageCropPicker from 'react-native-image-crop-picker';


const DateOfBirthPicker = () => {
  const [image, setImage] = useState(null);

  const handleCameraCapture = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    })
      .then((response) => {
        if (!response.didCancel && !response.error) {
          setImage(response.path);
        }
      })
      .catch((error) => {
        console.log('Camera capture error:', error);
      });
  };

  const handleGalleryPick = () => {


    

    ImageCropPicker.openPicker({
        
      mediaType: 'photo',
      cropping: true,
    })
      .then((response) => {
        if (!response.didCancel && !response.error) {
          setImage(response.path);
        }
      })
      .catch((error) => {
        console.log('Gallery pick error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCameraCapture}>
        <Text style={styles.buttonText}>Capture from Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGalleryPick}>
        <Text style={styles.buttonText}>Pick from Gallery</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
});

export default DateOfBirthPicker;
