import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import Fonts from "@helpers/Fonts";

function Search(props) {
  return (
    <TouchableOpacity
      style={styles.searchView}
      onPress={() => props.navigation.navigate("SearchScreenWithout",{isShowBack:false})}
    >
      <View style={styles.searchContainer}>
        <Icon name="search" style={styles.searchIcon} />
        <View style={styles.verticalLine}></View>
        <Text style={styles.textInputSearchStyle}>
          {props.strings.homepage.placeholder_search}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default SearchBar = React.memo(Search);

const styles = StyleSheet.create({
  searchView: {
    height: hp("10%"),
    backgroundColor: Colors().white,
    justifyContent:'center'
    //marginTop:10
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors().lightGray,
    height: hp("6%"),
    // marginLeft: 20,
    // marginRight: 20,
marginHorizontal:14

  },
  searchIcon: {
    flex: 0.1,
    color: Colors().themeColor,
    fontSize: wp("4%"),
    alignSelf: "center",
    textAlign: "center",
  },
  verticalLine: {
    width: 0.07,
    height: hp("2.5%"),
    backgroundColor: Colors().secondry_text_color,
  },
  textInputSearchStyle: {
    flex: 0.9,
    fontFamily: Fonts.Font_Reguler,
    backgroundColor: Colors().lightGray,
    fontSize: wp("3.2%"),
    color: Colors().secondry_text_color,
  },
});
