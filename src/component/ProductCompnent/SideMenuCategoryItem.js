import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import Fonts from '@helpers/Fonts';

import { logfunction } from "@helpers/FunctionHelper";

const SideMenuCategoryItem = ({ props, item }) => {
  const navigation = useNavigation();

  const handleCategoryItemClick = (item) => {
    // Perform any logic or actions related to the category item click
    // ...

    logfunction("wid_item ", item)


    // navigation.navigate("ProductListScreen", {
    //   type: "category",
    //   id: item.category_id,
    //   childerns: item.children != undefined ? item.children : [],
    //   title: item.category_description.name,
    // })


    // Update the navigation parameters
    // navigation.setParams({
    //   type: "category",
    //   id: item.category_id,
    //   childerns: item.children != undefined ? item.children : [],
    //   title: "Hello",
    // });
    props.navigation.replace("ProductListScreen", {
      type: "category",
      id: item.category_id,
      childerns: item.children != undefined ? item.children : [],
      title: item.category_description.name,
    })

    // //navigation.setParams({ props: item });
    // Navigate to the desired screen


    navigation.navigate("ProductListScreen");

    // navigation.navigate("ProductListScreen", {
    //   type: "category",
    //   id: item.category_id,
    //   childerns: item.children != undefined ? item.children : [],
    //   title: item.category_description.name,
    // })


  };

  return (
    // <TouchableOpacity onPress={handleCategoryItemClick}>
    //   <View style={styles.categoryItem}>
    //     <Text>{item.category}</Text>
    //   </View>
    // </TouchableOpacity>

    // key={index}
    <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategoryItemClick(item)}>

      <View style={styles.infromationView}>

        <Text style={styles.categoryName}>{item.category_description.name}</Text>

      </View>

    </TouchableOpacity>


  );
};

const styles = StyleSheet.create({
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },


  categoryBox: {

    justifyContent: 'center',

    alignItems: 'center',

    height: hp('7%'),

    width: wp('48%'),

    maxWidth: wp('48%'),

    marginHorizontal: wp('4%'),
    backgroundColor: Colors().lightGray,
    marginBottom: wp('3%'),
    borderRadius: wp('1%'),
    //flexDirection: 'column',
  },

  infromationView: {
    // flex: 0.15,
    width: wp('36%'),
  },

  categoryName: {

    //textAlign: 'center',

    fontSize: wp('4.0%'),

    fontFamily: Fonts.Font_Semibold,

    color: Colors().black

  },
});

export default SideMenuCategoryItem;
