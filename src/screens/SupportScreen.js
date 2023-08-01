import React, { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, DevSettings,Alert } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { OtrixHeader, OtrixDivider } from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import { close } from '@common';
import { _roundDimensions } from '@helpers/util';
import { Input, FormControl, Button, TextArea, Select, CheckIcon, InfoOutlineIcon } from "native-base"
import { State } from 'react-native-gesture-handler';
import { log } from 'react-native-reanimated';
import { logfunction } from "@helpers/FunctionHelper";
import getApi from "@apis/getApi";

function SupportScreen(props) {

    const [formData, setData] = React.useState({ title: null, description: null,submited:false,loading: false,});

    const { title, description,submited } = formData;
    const [errors, setErrors] = React.useState({});
    const { strings } = props;
    const validate = () => {
        if (title == null) {
            setErrors({
                ...errors,
                title: 'Title is required'
            });
            return false;
        }
        else if (description == null) {
            setErrors({
                ...errors,
                description: "Please enter some description"
            });
            return false;
        }
        return true;
    }


    const submit = () => {
        if (validate()) {
            setData({
              ...formData,
              loading:true,
              submited: true,

            });
      
            let sendData = new FormData();
            sendData.append("title", title);
            sendData.append("description", description);
            try {
              getApi.postData("customersupport", sendData).then((response) => {
                logfunction("RESPONSE ", response);
                if (response.status == 1) {
                  setData({
                    ...formData,
                    loading: false,
                    message: response.message,
                   
                  });
                  //alert(response.message)
                  Alert.alert('Success', response.message, [
                    {text: 'OK', onPress: () => props.navigation.goBack()},
                  ]);
                  setShowLoading(true);
                  setTimeout(() => {
                    setShowLoading(false);
                  }, 1500);
                } else {
                  setData({
                    ...formData,
                    type: "error",
                    message: response.message,
                    loading: false,
                  });
                  setShowLoading(true);
                  setTimeout(() => {
                    setShowLoading(false);
                  }, 3000);
                }
              });
            } catch (error) {
              logfunction("Error", error);
              setData({
                ...state,
                loading: false,
              });
            }
          }
    }

    return (
        <View style={{backgroundColor:'white'}}>
           
                <View style={{ height: hp('2%')}}></View>
            <View style={styles.modelView}>

                {/* Model header */}
                <OtrixHeader customStyles={{ backgroundColor: Colors().white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
          <OtirxBackButton />
        </TouchableOpacity>
                    <View style={[GlobalStyles.headerCenter,{flex:1.0}]}>
                        <Text style={GlobalStyles.headingTxt}>{"Support"}</Text>
                    </View>
                    <TouchableOpacity style={styles.headerRight}  >
                        {/* <Text style={styles.clearTxt}> Clear All</Text> */}
                    </TouchableOpacity>
                </OtrixHeader>
                <OtrixDivider size={'sm'} />
                {/* <View style={GlobalStyles.horizontalLine}></View> */}
                <OtrixDivider size={'md'} />
                <View style={styles.contentView}>
                    <FormControl isRequired isInvalid={submited && 'name' in errors}>
                        <Input variant="outline"
                            value={title}
                            placeholder={"Title"} style={GlobalStyles.textInputStyle}
                            onChangeText={(value) => { setData({ ...formData, submited: false, title: value }), delete errors.title }}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            {errors.name}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <OtrixDivider size={'sm'} />
                    <FormControl isRequired isInvalid={submited && 'Description' in errors}>
                        <TextArea
                            value={description}
                            variant="outline" placeholder={"Description"} style={GlobalStyles.textAreaInputStyle}
                            onChangeText={(value) => { setData({ ...formData, description: value }), delete errors.description }}

                        />
                        <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            {errors.address1}
                        </FormControl.ErrorMessage>
                    </FormControl>

                </View>

                <Button
                    size="md"
                    variant="solid"
                    bg={Colors().themeColor}
                    style={[GlobalStyles.button, { marginHorizontal: wp('4%'), top: hp('4.5%') }]}
                    onPress={() => submit()}
                >
                    <Text style={GlobalStyles.buttonText}>{"Submit"}</Text>
                </Button>
            </View>

        </View>
    )
}

export default SupportScreen;

const styles = StyleSheet.create({
    modelView: {
        height: hp('100%'),
        width: wp('100%'),
        //alignSelf: 'flex-end',
        marginTop:hp('0%'),
        backgroundColor: Colors().white,
    },
    filter: {
        height: _roundDimensions()._height * 0.028,
        width: _roundDimensions()._height * 0.028,
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        height: _roundDimensions()._height * 0.042,
        width: _roundDimensions()._height * 0.040,
        borderRadius: _roundDimensions()._borderRadius,
        backgroundColor: Colors().light_white,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        height: _roundDimensions()._height * 0.016,
        width: _roundDimensions()._height * 0.016,
    },
    headerRight: {
        flex: 0.25,
        marginRight: wp('2%'),
    },
    clearTxt: {
        color: Colors().link_color,
        textTransform: 'uppercase',
        fontSize: wp('3%'),
        fontFamily: Fonts.Font_Reguler
    },
    horiLine: {
        width: wp('90%'),
        alignSelf: 'center',
        height: 0.5,
        backgroundColor: Colors().line_color
    },
    contentView: {
        marginHorizontal: wp('4%'),

    },
    titleTxt: {
        color: Colors().text_color,
        textTransform: 'capitalize',
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Semibold
    },

    colorBox: {
        height: hp('4%'),
        width: wp('18%'),
        flexDirection: 'row',
        marginHorizontal: wp('2%'),
        backgroundColor: Colors().white,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: Colors().light_gray,
        borderWidth: 1,
        alignItems: 'center'
    },
    borderBox: {
        borderColor: Colors().themeColor,
        borderWidth: 1,
    },

    imageView: {
        height: hp('2%'),
        width: wp('4%'),
        borderRadius: 50,
        marginHorizontal: wp('1%'),

    },
    rangeView:
        { flex: 1, flexDirection: 'row', marginTop: hp('2%'), marginBottom: hp('8%') }
});