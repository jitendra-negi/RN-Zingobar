import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import Fonts from "@helpers/Fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import MatIcon from "react-native-vector-icons/FontAwesome5";
import { ASSETS_DIR, CURRENCY } from "@env";
import {
  numberWithComma,
  calculateOffPercentage,
} from "@helpers/FunctionHelper";
import FastImage from "react-native-fast-image";

function CartView(props) {
  let cartProduct = props.products;

  return (
    <>

      {cartProduct.length > 0 &&
        cartProduct.map((data) => (
          <View style={styles.cartContent} key={data.cart_id}>
            <View style={styles.cartBox}>
              {/* <View style={styles.imageView}>
                <FastImage
                  style={styles.image}
                  source={{
                    uri: data.image
                      ? ASSETS_DIR + "product/" + data.image
                      : ASSETS_DIR + "/assets/img/default.png",
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View> */}
              <View style={styles.infromationView}>
                <TouchableOpacity
                  style={{ padding: 4 }}
                  onPress={() =>
                    props.navigation.navigate("ProductDetailScreen", {
                      id: data.id,
                    })
                  }
                >
                  <Text style={styles.name}>{data.name}</Text>
                </TouchableOpacity>
                <Text style={styles.price}>
                  {CURRENCY}
                  {data.special > 0 ? data.special : data.price}{" "}
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => props.deleteItem(data.cart_id)}
                >
                  <MatIcon name="trash" style={styles.delete} />
                </TouchableOpacity>
                <View style={styles.plusminus}>
                  <TouchableOpacity
                    style={{ marginRight: wp("2.5%"), padding: 4 }}
                    onPress={() =>
                      data.quantity != 1 &&
                      props.decrementItem(data.cart_id, data.id, data.quantity)
                    }
                  >
                    <Icon name="minus" style={styles.plusminusTxt} />
                  </TouchableOpacity>
                  <Text style={styles.quantityTxt}>{data.quantity}</Text>
                  <TouchableOpacity
                    style={{ marginLeft: wp("2.5%"), padding: 4 }}
                    onPress={() =>
                      props.incrementItem(data.cart_id, data.id, data.quantity)
                    }
                  >
                    <Icon name="plus" style={styles.plusminusTxt} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
    </>
  );
}

export default CartView;
const styles = StyleSheet.create({
  cartContent: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F8",
    justifyContent: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.0 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 0,
    marginBottom: wp("2%"),
    borderRadius: wp("1%"),
    marginLeft: wp("0%"),
  },
  cartBox: {

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp("11.5%"),
    width: wp("100%"),
    flex: 1,
  },
  imageView: {
    flex: 0.3,
    backgroundColor: Colors().light_white,
    marginVertical: wp("1%"),
    marginRight: wp("4%"),
    height: hp("12%"),
    borderRadius: wp("1.5%"),
  },
  image: {
    resizeMode: "contain",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
    width: wp("21.5%"),
  },
  infromationView: {
    // backgroundColor: 'yellow',
    flex: 0.9,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  name: {
    textAlign: "auto",
    color: "#3B3B3B",
    fontSize: wp("3.8%"),
    fontFamily: Fonts.Font_Bold,
  },
  price: {
    textAlign: "center",
    color: Colors().link_color,
    lineHeight: hp("4%"),
    fontSize: wp("4.3%"),
    fontFamily: Fonts.Font_Bold,
  },
  plusminus: {

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp("2%"),
    height: wp("7%"),
    backgroundColor: Colors().secondaryColor,
    borderRadius: 4,
    marginLeft: wp("10%"),
  },
  plusminusTxt: {
    fontSize: wp("2.5%"),
    color: Colors().white,
    textAlign: "center",
    padding: 2,
  },
  quantityTxt: {
    fontSize: wp("4%"),
    color: Colors().white,
    // marginHorizontal: wp('1%'),
    fontFamily: Fonts.Font_Regular,
    textAlign: "center",
  },
  deleteIcon: {
    marginRight: wp("1%"),
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("1%"),
  },
  delete: {
    fontSize: wp("3.6%"),
    color: Colors().secondry_text_color,
  },
});
