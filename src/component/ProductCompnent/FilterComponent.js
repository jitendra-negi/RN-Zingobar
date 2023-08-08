import React, { useCallback, useState } from "react";
import {
  View,
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { GlobalStyles, Colors } from "@helpers";
import OtrixHeader from "../OtrixComponent/OtrixHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import { close } from "@common";
import { _roundDimensions } from "@helpers/util";
import OtrixDivider from "../OtrixComponent/OtrixDivider";
import PriceList from "../items/PriceList";
import RateList from "../items/RateList";
import QuantityList from "../items/QuantityList";
import BrandList from "../items/BrandList";
import ProductNameList from "../items/ProductNameList";
import FilterTags from "./FilterTags";
import SizeTags from "./SizeTags";
import SortTags from "./SortTags";
import RangeSlider from "./RangeSlider";
import { Button } from "native-base";
import CheckIcon from "react-native-vector-icons/Fontisto";
import ionIcon from "react-native-vector-icons/Ionicons";
import SortList from "../items/SortList";
import { TextInput } from "react-native-gesture-handler";
let minSlider = 0;
let maxSlider = 0;
function FilterComponent(props) {
  const { strings } = props;
  const [select, setselection] = useState(false);

  const checkSelection = () => {
    if (!select) {
      setselection(true);
    } else {
      setselection(false);
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      {Platform.OS === "ios" && <View style={{ height: hp("2%") }}></View>}
      <View style={styles.modelView}>

        <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
        {/* Model header */}
        <OtrixHeader customStyles={{ backgroundColor: Colors().light_white }}>
          <TouchableOpacity
            style={GlobalStyles.headerLeft}
            onPress={() => props.closeFilter(false)}
          >
            <View style={styles.round}>
              <Image source={close} style={styles.button} />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyles.headerCenter]}>
            <Text style={GlobalStyles.headingTxt}>{strings.filter.title}</Text>
          </View>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => props.closeFilter(true)}
          >
            <Text style={styles.clearTxt}> {strings.filter.clear_all}</Text>
          </TouchableOpacity>
        </OtrixHeader>
        <OtrixDivider size={"sm"} />
        <View style={GlobalStyles.horizontalLine}></View>
        <OtrixDivider size={"md"} />

        <View style={styles.filterView}>
          {/* Sort View  */}
          <Text style={styles.titleTxt}>{strings.filter.sort}:</Text>
          <OtrixDivider size={"sm"} />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: wp("1%"),
            }}
          >
            {SortList.map((item, index) => (
              <SortTags
                tagName={item.name}
                tagID={item.value}
                type="sort"
                key={item.id}
                selected={props.filterSortVal}
                selectedSort={props.filterSortVal}
                onFilterPress={props.onFilterPress}


              />
            ))}
          </View>
          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
          <View style={GlobalStyles.horizontalLine}></View>
          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />

          {/* Size View */}


          <Text style={styles.titleTxt}>Sizes:</Text>
          <OtrixDivider size={'sm'} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>
            {
              QuantityList.map((item, index) =>
                <SizeTags tagName={item.name}
                  tagID={item.id}
                  key={item.id}
                  type="size"
                  selected={props.filterSizeVal}
                  selectedSize={props.filterSizeVal}
                  onFilterPress={props.onFilterPress} />
              )
            }
          </View>




          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
          <View style={GlobalStyles.horizontalLine}></View>
          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
          <Text style={styles.titleTxt}>{"Stock"}:</Text>
          <TouchableOpacity
            onPress={() => checkSelection()}
            style={[{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: wp("1%"),
              top: 10,
              marginBottom: 10,
            },select && styles.borderBox]}
          >
           
            {/* {select ? (
              <CheckIcon
                name="checkbox-active"
                color={"#1E508F"}
                size={wp("4%")}
              />
            ) : (
              <CheckIcon
                name="checkbox-passive"
                color={"#00000014"}
                size={wp("4%")}
              />
            )} */}
            <Text style={[styles.titleTxt, { marginLeft: 10 }]}>
              {"In Stock"}:
            </Text>
          </TouchableOpacity>

          {/* Rating View */}



          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
          <View style={GlobalStyles.horizontalLine}></View>
          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
          <Text style={styles.titleTxt}>{strings.filter.rating}:</Text>
          <OtrixDivider size={"sm"} />

          <View
            style={{
              flexDirection: "column",
              marginHorizontal: wp("1%"),
            }}
          >
            {RateList.map((item, index) => (
              <FilterTags
                tagName={item.name}
                tagID={item.value}
                type="rating"
                key={item.id}

                selected={props.filterRatingVal}
                selectedRating={props.filterRatingVal}
                onFilterPress={props.onFilterPress}

              />
            ))}
          </View>









          {/* Brand View  */}
          {/* <Text style={styles.titleTxt}>{"Brands"}:</Text>
         
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: wp("1%"),
            }}
          >
            {BrandList.map((item, index) => (
              <FilterTags
                tagName={item.name}
                tagID={item.value}
                type="brands"
                key={item.id}
                selectedPrice={props.filterPriceVal}
                selectedRating={props.filterRatingVal}
                onFilterPress={props.onFilterPress}
              />
            ))}
          </View> */}


          {/* <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
          <View style={GlobalStyles.horizontalLine}></View>
          <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />

          <Text style={styles.titleTxt}>{"Product name"}:</Text>

          <ScrollView
            contentContainerStyle={{ flexDirection: "row" }}
            horizontal={true}
            directionalLockEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={{
              width: "100%",
              height: "10%",
              marginTop: "4%",
              marginHorizontal: "2.33%",
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            {ProductNameList.map((item, index) => (
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  overflow: "hidden",
                  marginHorizontal: 5,
                  marginVertical: 5,
                  backgroundColor: "white",
                  borderRadius: 6,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 5,
                  borderWidth: 1.0,
                  borderColor: "#00000014",
                }}
              >
                <Text style={[{ fontSize: 14, color: "black" }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginHorizontal: wp("1%"),
            }}
          >
            {BrandList.map((item, index) => (
              <FilterTags
                tagName={item.name}
                tagID={item.value}
                type="brands"
                key={item.id}
                selectedPrice={props.filterPriceVal}
                selectedRating={props.filterRatingVal}
                onFilterPress={props.onFilterPress}
              />
            ))}
          </View> */}



          {/* Colors View  */}
          {/* <Text style={styles.titleTxt}>Colors:</Text>
                    <OtrixDivider size={'sm'} />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>
                        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#7d9128' }]} >
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colorBox, styles.borderBox, { backgroundColor: Colors().themeColor }]} >
                            {true && <Image source={checkround2} style={styles.imageView} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colorBox, { backgroundColor: '#c2da0c' }]} >
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.colorBox, styles.borderBox, { backgroundColor: '#ff1e1a' }]} >
                            {true && <Image source={checkround2} style={styles.imageView} />}
                        </TouchableOpacity>
                    </View> */}


        </View>

        <OtrixDivider size={I18nManager.isRTL == true ? "sm" : "md"} />
        <Button
          size="md"
          variant="solid"
          bg={Colors().themeColor}
          style={[GlobalStyles.button, { marginHorizontal: wp("4%") }]}
          onPress={() =>

            props.applyFilter({ min: minSlider, max: maxSlider })

          }
        >
          <Text style={GlobalStyles.buttonText}>
            {strings.filter.apply_filter}
          </Text>
        </Button>
      </View>
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
}

export default FilterComponent;

const styles = StyleSheet.create({
  modelView: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: Colors().light_white,
  },
  filter: {
    height: _roundDimensions()._height * 0.028,
    width: _roundDimensions()._height * 0.028,
  },
  round: {
    justifyContent: "center",
    alignItems: "center",
    height: _roundDimensions()._height * 0.042,
    width: _roundDimensions()._height * 0.04,
    borderRadius: _roundDimensions()._borderRadius,
    backgroundColor: Colors().white,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    height: _roundDimensions()._height * 0.016,
    width: _roundDimensions()._height * 0.016,
  },
  headerRight: {
    flex: 0.4,
    marginRight: wp("2%"),
  },
  clearTxt: {
    color: Colors().secondaryColor,
    textTransform: "uppercase",
    fontSize: wp("3%"),
    fontFamily: Fonts.Font_Semibold,
  },
  horiLine: {
    width: wp("90%"),
    alignSelf: "center",
    height: 0.5,
    backgroundColor: Colors().line_color,
  },
  filterView: {
    marginHorizontal: wp("4%"),
  },
  titleTxt: {
    color: Colors().text_color,
    textTransform: "capitalize",
    fontSize: wp("4%"),
    fontFamily: Fonts.Font_Semibold,
  },

  colorBox: {
    height: hp("4%"),
    width: wp("18%"),
    flexDirection: "row",
    marginHorizontal: wp("2%"),
    backgroundColor: Colors().white,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: Colors().light_gray,
    borderWidth: 1,
    alignItems: "center",
  },
  borderBox: {
    borderColor: Colors().themeColor,
    borderWidth: 1,
    width:wp('23%'),
    borderRadius:5,
    
  },

  imageView: {
    height: hp("2%"),
    width: wp("4%"),
    borderRadius: 50,
    marginHorizontal: wp("1%"),
  },
  rangeView: {
    flex: 1,
    flexDirection: "row",
    marginTop: hp("2%"),
    marginBottom: hp("8%"),
  },
});
