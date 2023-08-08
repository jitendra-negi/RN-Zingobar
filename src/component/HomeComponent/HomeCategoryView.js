import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ASSETS_DIR } from "@env";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { logfunction } from "@helpers/FunctionHelper";
const { width } = Dimensions.get('window');

const renderItemWithEllipsis = ({ item }) => {
  const textLength = item.category_description.name.length;
  const shouldShowEllipsis = textLength > 8; // Adjust the value '8' based on your font size and container width

  return (
    <TouchableOpacity
      style={styles.catBox}
      onPress={() => {
        props.navigation.navigate('ProductListScreen', {
          type: 'category',
          id: item.category_id,
          children: item.children !== undefined ? item.children : [],
          title: item.category_description.name,
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: ASSETS_DIR + 'category/' + item.image }} style={styles.imageView} resizeMode="cover" />
      </View>
      <Text numberOfLines={shouldShowEllipsis ? 1 : null} ellipsizeMode="tail" style={styles.catName}>
        {item.category_description.name}
      </Text>
    </TouchableOpacity>
  );
};

function HomeCategory(props) {
  return (
    <View>
      <View style={styles.catHeading}>
        <Text style={[GlobalStyles.boxHeading]}>
          {props.strings.homepage.label_category}
        </Text>
        <TouchableOpacity
          style={{ flex: 0.5}}
          onPress={() => props.navigation.navigate("CategoryScreen")}
        >
          <Text style={[GlobalStyles.viewAll,{padding:0}]}>
            {props.strings.homepage.viewall}
          </Text>
        </TouchableOpacity>
      </View>
      <OtrixDivider size={"sm"} />
      <FlatList
        //style={{ padding: wp("1%") }}
        data={props.data}
        contentContainerStyle={{}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.7}
        keyExtractor={(contact, index) => String(index)}
        renderItem={renderItemWithEllipsis}
      ></FlatList>
    </View>
  );
}

export default HomeCategoryView = React.memo(HomeCategory);

const styles = StyleSheet.create({
  catHeading: {
    justifyContent:'space-between',
    alignItems: "center",
    flexDirection: "row",
    
  },
  catBox: {
    height: hp("12.5%"),
    width: wp("15%"),
    marginHorizontal: wp("1.5%"),
    borderRadius: 5,
  },
  imageContainer: {
    backgroundColor: Colors().categoryBG,
    height: hp("7.5%"),
  },
  imageView: {
    resizeMode: "cover",
    alignSelf: "center",
    height: hp("7.5%"),
    borderRadius: 5,
    width: wp("15.5%"),
  },
  catName: {
    fontSize: wp("3%"),
    fontFamily: Fonts.Font_Reguler,
    textAlign: "center",
    color: Colors().text_color,
    maxWidth: width * 0.6,
  },
});
