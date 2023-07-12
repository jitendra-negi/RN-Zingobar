import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import { checkaround, circle } from "@common";
import { logfunction } from "@helpers/FunctionHelper";

function SizeTags(props) {
    let selectedTag = false;
    if ( props.selectedSort != undefined && props.selectedSort == props.tagID) {
        selectedTag = true;
    }

    logfunction("SizeTags", "selected: " + props.selectedSize + " tagID:" + props.tagID);

    return (
        // <TouchableOpacity
        //     style={[styles.filterBox, selectedTag && styles.borderBox]}
        //     //Size,id
        //     onPress={() => props.onFilterPress(props.type, props.tagID)}
        // >
        //     {selectedTag && <Image source={checkaround} style={styles.imageView} />}
        //     <Text style={styles.tagStyle}>{props.tagName}</Text>
        // </TouchableOpacity>

         <TouchableOpacity
              style={[
                styles.filterBox,
                props.selectedSort == props.tagID
                  ? styles.borderBox
                  : styles.unborderBox,
              ]}
              onPress={() => props.onFilterPress(props.type, props.tagID)}
            >
              {
                props.selectedSort == props.tagID && (
                  <Image source={checkaround} style={styles.imageView} />
                )}
              <Text style={styles.tagStyle}>{props.tagName}</Text>
            </TouchableOpacity>
    );
}

export default SizeTags;

const styles = StyleSheet.create({
    filterBox: {
        paddingHorizontal: wp("3.2%"),
        paddingVertical: hp("1.2%"),
        flexDirection: "row",
        marginHorizontal: wp("2%"),
        backgroundColor: Colors().white,
        justifyContent: "center",
        borderRadius: 5,
        borderColor: Colors().light_gray,
        borderWidth: 1,
        marginVertical: hp("0.5%"),
        alignItems: "center",
      },
      tagStyle: {
        color: Colors().black,
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp("3%"),
      },
      borderBox: {
        borderColor: Colors().themeColor,
        borderWidth: 1,
      },
      imageView: {
        height: hp("2%"),
        width: wp("4%"),
        borderRadius: 50,
        marginHorizontal: wp("1%"),
      },

    imageCircle: {
        height: hp("2%"),
        width: wp("4%"),
        marginHorizontal: wp("1%"),
    },
});
