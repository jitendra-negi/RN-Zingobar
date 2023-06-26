import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@helpers'

  const TermsAndPrivacyWidget = ({props}) => {

  const { strings } = props;
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleTermsLinkPress = () => {
    // Open the Terms and Conditions URL in a web browser
    props.navigation.navigate('TermsandconditionScreen');
  };

  const handlePrivacyLinkPress = () => {
    // Open the Privacy Policy URL in a web browser
    props.navigation.navigate('PrivacyPolicyScreen');
  };

  return (
    <View>
      <TouchableOpacity onPress={handleCheckboxToggle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: Colors().secondaryColor,
              marginRight: 10,
              backgroundColor: isChecked ? Colors().secondaryColor : 'transparent',
            }}
          />
          <Text>Accept terms and privacy policy</Text>
        </View>
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <Text>
          By checking this box, you agree to our{' '}
          <Text style={{ color: Colors().secondaryColor }} onPress={handleTermsLinkPress}>
            Terms and Conditions
          </Text>{' '}
          and{' '}
          <Text style={{ color: Colors().secondaryColor }} onPress={handlePrivacyLinkPress}>
            Privacy Policy
          </Text>
          
        </Text>
      </View>
    </View>
  );
};


export default TermsAndPrivacyWidget;
