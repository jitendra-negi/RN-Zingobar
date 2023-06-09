import React, { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import ImageCropPicker from 'react-native-image-crop-picker';


const DateOfBirthPicker = ({ onImageSelected }) => {
  
  const [image, setImage] = useState(null);

  const handleCameraCapture = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      multiple: false,
      
    })
      .then((response) => {
        if (!response.didCancel && !response.error) {
          const imageUri = response.path;
          setImage(imageUri);
          onImageSelected(imageUri);
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
      multiple: false,
      selectionMode: 'library',
      maxWidth: 600, // Set the maximum width for compression
            maxHeight: 300, // Set the maximum height for compression
            quality: 0.8, // Set the compression quality between 0 and 1
    })
      .then((response) => {
        if (!response.didCancel && !response.error) {
         
          const imageUri = response.path;
          setImage(imageUri);
          console.log(imageUri);
          onImageSelected(imageUri);
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
