import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Colors } from "@helpers";
import CheckIcon from "react-native-vector-icons/Fontisto";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TermsAndPrivacyWidget = ({ isChecked, handleCheckboxToggle, props }) => {
  const { strings } = props;
  //const [isChecked, setIsChecked] = useState(false);

  // const handleCheckboxToggle = () => {
  //   setIsChecked(!isChecked);
  // };

  const handleTermsLinkPress = () => {
    // Open the Terms and Conditions URL in a web browser
    props.navigation.navigate("TermsandconditionScreen");
  };

  const handlePrivacyLinkPress = () => {
    // Open the Privacy Policy URL in a web browser
    props.navigation.navigate("PrivacyPolicyScreen");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleCheckboxToggle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isChecked ? (
            <CheckIcon
              name="checkbox-active"
              color={"#1E508F"}
              size={wp("4%")}
            />
          ) : (
            <CheckIcon
              name="checkbox-passive"
              color={"#1E508F"}
              size={wp("4%")}
            />
          )}
          <Text style={{ marginLeft: 5 }}>Accept terms and privacy policy</Text>
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <Text>
          By checking this box, you agree to our{" "}
          <Text
            style={{ color: Colors().secondaryColor }}
            onPress={handleTermsLinkPress}
          >
            Terms and Conditions
          </Text>{" "}
          and{" "}
          <Text
            style={{ color: Colors().secondaryColor }}
            onPress={handlePrivacyLinkPress}
          >
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default TermsAndPrivacyWidget;
