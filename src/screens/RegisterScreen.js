import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, OtrixAlert, OtrixLoader, TermsAndPrivacyWidget, DateOfBirthPicker
} from '@component';
import { Input, Text, FormControl, Button, InfoOutlineIcon } from "native-base"
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors, isValidEmail, isValidMobile, isValidpassword, isValidConfirmPassword } from '@helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import { logfunction } from "@helpers/FunctionHelper";
import Fonts from "@helpers/Fonts";
import getApi from "@apis/getApi";


function RegisterScreen(props) {
    const [formData, setData] = React.useState({ firstName: null, lastName: null, email: null, mobileNumber: null, password: null, cpassword: null, submited: false, type: null, message: null, loading: false, age:null, age_proof:null , address:null,image:null});
    const [state, setDatapassword] = React.useState({ secureEntry: true });
    const [errors, setErrors] = React.useState({});
   // const [imageUriPath, setImage] = React.useState({});
  
    const { firstName, lastName, mobileNumber, email, password, cpassword, submited, type, message, loading, age, age_proof, address, image } = formData;
    const { strings } = props;
    const [showDatePicker, setShowDatePicker] = React.useState(false);

    useEffect(() => {

    }, []);

    const validate = () => {
        logfunction("Name ", firstName)
        logfunction("Errors ", errors)
        setData({ ...formData, submited: true })

        if (firstName == null || firstName == '') {
            logfunction("FIeld ", 'First name is required')
            setErrors({
                ...errors,
                name: 'First Name is required'
            });
            return false;
        }
        else if (email == null) {
            logfunction("FIeld ", 'Email is required')
            setErrors({
                ...errors,
                email: 'Email is required'
            });
            return false;
        }
        else if (!isValidEmail(email).success) {
            logfunction("FIeld ", isValidEmail(email).message)
            setErrors({
                ...errors,
                invalidEmail: isValidEmail(email).message
            });
            return false;
        }
        else if (mobileNumber == null) {
            logfunction("FIeld ", 'Mobile number is required')
            setErrors({
                ...errors,
                mobileNumber: 'Mobile number is required'
            });
            return false;
        }
        else if (!isValidMobile(mobileNumber).success) {
            logfunction("FIeld ", isValidMobile(mobileNumber).message)
            setErrors({
                ...errors,
                invalidmobileNumber: isValidMobile(mobileNumber).message
            });
            return false;
        }
        else if (!isValidpassword(password).success) {
            logfunction("FIeld ", isValidpassword(password).message)
            setErrors({
                ...errors,
                password: isValidpassword(password).message
            });
            return false;
        }
        else if (!isValidConfirmPassword(password, cpassword).success) {
            setErrors({
                ...errors,
                cpassword: isValidConfirmPassword(password, cpassword).message
            });
            return false;
        }
        else if (age == null) {
            logfunction("FIeld ", 'Age is required')
            setErrors({
                ...errors,
                age: 'Age is required'
            });
            return false;
        }
        return true;

    }

    const register = () => {
        if (validate()) {
            setData({
                ...formData,
                loading: true
            })
            let sendData = new FormData();
            sendData.append('firstname', firstName);
            sendData.append('lastname', lastName)
            sendData.append('email', email)
            sendData.append('telephone', mobileNumber)
            sendData.append('password', password)
            sendData.append('age', age)
            sendData.append('address', "NA")
            sendData.append('age_proof', {
                uri: image,
                name: 'age_proof.jpg',
                type: 'image/jpeg',
              });
            sendData.append('creation', 'D')

            try {
                getApi.postData(
                    'user/registeruser',
                    sendData,
                ).then((response => {
                    logfunction("RESPONSE ", response)
                    if (response.status == 1) {
                        props.navigation.navigate("RegisterSuccessScreen");
                    }
                    else {
                        setData({
                            ...formData,
                            type: 'error',
                            message: response.message,
                            loading: false
                        });
                        setTimeout(() => {
                            setData({
                                ...formData,
                                message: null,
                                loading: false
                            })
                        }, 3000);
                    }
                }));
            } catch (error) {
                logfunction("Error", error)
                setData({
                    ...formData,
                    loading: false
                })
            }
        }
    }

    

    const handleShowDatePicker = () => {
        setShowDatePicker(true);
      };
    
      const handleImageSelected = (imageUri) => {
        // Handle the selected image here
        console.log('Selected Image:', imageUri);
      
         setData({ ...formData, submited: false, image: imageUri })

       // setShowDatePicker(false);
      };

    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader >
                <TouchableOpacity style={[GlobalStyles.headerLeft,{flex:0.05}]} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 0.95,justifyContent:'center',alignContent:'flex-start' }]}>
                    <View style={GlobalStyles.authHeader}>
                        <Text style={[GlobalStyles.authtabbarText]}>{strings.registration.title}</Text>
                        <Text style={GlobalStyles.authSubText}>{strings.registration.subtitle}</Text>
                    </View>
                </View>
            </OtrixHeader>

            <OtrixDivider size={'md'} />

            {/* Content Start from here */}
            <OtrixContent>


                {/* Registration Form Start from here */}
                <FormControl style={{ backgroundColor: Colors().lightWhite }} isRequired isInvalid={submited && 'name' in errors}>
                    <Input variant="outline" placeholder={strings.commoninput.placeholder_first_name} style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => { setData({ ...formData, submited: false, firstName: value }), delete errors.name }}
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        {errors.name}
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl style={{ backgroundColor: Colors().lightWhite }} isRequired >
                    <Input variant="outline" placeholder={strings.commoninput.placeholder_last_name} style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, submited: false, lastName: value })}
                    />
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl style={{ backgroundColor: Colors().lightWhite }} isRequired isInvalid={submited && 'email' in errors || 'invalidEmail' in errors}>
                    <Input variant="outline" placeholder={strings.commoninput.placeholder_email} style={GlobalStyles.textInputStyle}
                        keyboardType="email-address"
                        onChangeText={(value) => { setData({ ...formData, email: value }), delete errors.email, delete errors.invalidEmail }}
                    />
                    {
                        'invalidEmail' in errors == false && 'email' in errors && <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            {errors.email}
                        </FormControl.ErrorMessage>
                    }
                    {
                        'invalidEmail' in errors && <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            {errors.invalidEmail}
                        </FormControl.ErrorMessage>
                    }

                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl style={{ backgroundColor: Colors().lightWhite }} isRequired isInvalid={submited && 'mobileNumber' in errors || 'invalidmobileNumber' in errors}>
                    <Input variant="outline" keyboardType="number-pad" placeholder={strings.commoninput.placeholder_phone} style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => { setData({ ...formData, submited: false, mobileNumber: value }), delete errors.mobileNumber, delete errors.invalidmobileNumber }}
                    />

                    {
                        'invalidmobileNumber' in errors == false && 'mobileNumber' in errors && <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            {errors.mobileNumber}
                        </FormControl.ErrorMessage>
                    }
                    {
                        'invalidmobileNumber' in errors && <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            {errors.invalidmobileNumber}
                        </FormControl.ErrorMessage>
                    }

                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl style={{ backgroundColor: Colors().lightGray }} isRequired={true} isInvalid={submited && 'password' in errors}>
                    <Input variant="outline" placeholder={strings.commoninput.placeholder_password} style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => { setData({ ...formData, submited: false, password: value }), delete errors.password }}
                        secureTextEntry={state.secureEntry}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={{ marginRight: wp('3%')}}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors().secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        {errors.password}
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl style={{ backgroundColor: Colors().lightGray }} isRequired isInvalid={submited && 'cpassword' in errors}>
                    <Input variant="outline" placeholder={strings.commoninput.placeholder_confirm_password} style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => { setData({ ...formData, submited: false, cpassword: value }), delete errors.cpassword }}
                        secureTextEntry={state.secureEntry}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={{ marginRight: wp('3%') }}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors().secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        {errors.cpassword}
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl style={{ backgroundColor: Colors().lightWhite }} isRequired isInvalid={submited && 'age' in errors}>
                    <Input variant="outline" placeholder={strings.commoninput.placeholder_age} style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => { setData({ ...formData, submited: false, age: value }), delete errors.age }}
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        {errors.age}
                    </FormControl.ErrorMessage>
                </FormControl>

                <OtrixDivider size={'sm'} />

                <View style={styles.container}>
               
                {!showDatePicker && (
               <TouchableOpacity style={styles.button} onPress={handleShowDatePicker}>
                <Text style={styles.buttonText}>+ Attached DOB Proof</Text>
                  </TouchableOpacity>)}
                {showDatePicker && <DateOfBirthPicker onImageSelected={handleImageSelected} />}
                 </View>

                <OtrixDivider size={'xs'} />

                <TermsAndPrivacyWidget
                props={ props}
                />

                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors().themeColor}
                    style={GlobalStyles.button}
                    isLoading={loading}
                    onPress={() => register()}
                >
                    <Text style={GlobalStyles.buttonText}>{strings.registration.button_register}</Text>
                </Button>
                <OtrixDivider size={'md'} />



                <View style={styles.registerView}>
                    <Text style={styles.registerTxt}>{strings.registration.label_login_info} </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('LoginScreen')}>
                        <Text style={styles.signupTxt}> {strings.registration.button_login} </Text>
                    </TouchableOpacity>
                </View>
                <OtrixDivider size={'md'} />



            </OtrixContent>
            {
                message != null && <OtrixAlert type={type} message={message} />
            }

        </OtrixContainer >
    )

}


function mapStateToProps(state) {
    return {
        strings: state.mainScreenInit.strings
    }
}

export default connect(mapStateToProps)(RegisterScreen);

const styles = StyleSheet.create({
    registerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerTxt: {
        fontSize: wp('3.5%'),
        textAlign: 'center',
        fontFamily: Fonts.Font_Reguler,
        color: Colors().secondry_text_color
    },
    signupTxt: {
        fontSize: wp('3.5%'),
        textAlign: 'right',
        fontFamily: Fonts.Font_Semibold,
        color: Colors().link_color
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      button: {
        marginTop:8,
        borderRadius: 8,
        marginBottom: 8,
      },
      buttonText: {
        color: '#1C4F91',
        fontSize: 16,
    
      },
});
