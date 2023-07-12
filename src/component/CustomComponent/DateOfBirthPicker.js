import React, { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import { Button } from "native-base";
import {
  OtrixContainer,
  OtrixHeader,
  OtrixContent,
  OtrixDivider,
  OtrixAlert,
  OtrixLoader,
  TermsAndPrivacyWidget,
} from "@component";

import ImageCropPicker from "react-native-image-crop-picker";

const DateOfBirthPicker = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const handleCameraCapture = () => {
    ImageCropPicker.openCamera({
      mediaType: "photo",
      cropping: true,
      width: 320, // Set your desired frame width here
      height: 200,
    })
      .then((response) => {
        if (!response.didCancel && !response.error) {
          const imageUri = response.path;
          setImage(imageUri);
          onImageSelected(imageUri);
        }
      })
      .catch((error) => {
        console.log("Camera capture error:", error);
      });
  };

  const handleGalleryPick = () => {
    ImageCropPicker.openPicker({
      mediaType: "photo",
      cropping: true,
      width: 320, // Set your desired frame width here
      height: 200,
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
        console.log("Gallery pick error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Button
        size="md"
        variant="solid"
        bg={Colors().secondaryColor}
        style={GlobalStyles.button}
        onPress={() => handleCameraCapture()}
      >
        <Text style={GlobalStyles.buttonText}>Capture from Camera</Text>
      </Button>
      <OtrixDivider size={"xs"} />
      <Button
        size="md"
        variant="solid"
        bg={Colors().secondaryColor}
        style={GlobalStyles.button}
        onPress={() => handleGalleryPick()}
      >
        <Text style={GlobalStyles.buttonText}>Pick from Gallery</Text>
      </Button>

      {/* <TouchableOpacity style={styles.button} onPress={handleCameraCapture}>
        <Text style={styles.buttonText}>Capture from Camera</Text>
      </TouchableOpacity>
      <OtrixDivider size={'xs'} />
      <TouchableOpacity style={styles.button} onPress={handleGalleryPick}>
        <Text style={styles.buttonText}>Pick from Gallery</Text>
      </TouchableOpacity> */}
      <OtrixDivider size={"xs"} />
      <View style={styles.image_container}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  image_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 320,
    height: 200,
  },
  button: {
    backgroundColor: "#1C4F91",
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "normal",
    textAlign: "center",
  },
});

export default DateOfBirthPicker;
