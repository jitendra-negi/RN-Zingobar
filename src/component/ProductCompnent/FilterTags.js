import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "@helpers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Fonts from "@helpers/Fonts";
import { checkaround } from "@common";
import Icon from "react-native-vector-icons/Entypo";
import CheckIcon from "react-native-vector-icons/Fontisto";
import { logfunction } from "@helpers/FunctionHelper";

function FilterTags(props) {
  

  let selectedTag = false;
  if (
    props.selectedRating != undefined &&
    props.selectedRating==props.tagID
   
  ) {
    selectedTag = true;
  }

  logfunction("FilterTags", "selected: " + props.selectedRating + " tagID:" + props.tagID);

  return (
    <>
      {

        props.type != undefined && props.type == 'rating' ?
          <TouchableOpacity style={[styles.filterBox, props.selectedRating != undefined && props.selectedRating == props.tagID ? styles.borderBox : styles.unborderBox]} onPress={() => props.onFilterPress(props.type, props.tagID)}>
            {props.selectedRating == props.tagID && <Image source={checkaround} style={styles.imageView} />}
            <Text style={styles.tagStyle}>
              {props.tagID == 1 ? <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> : props.tagID == 2 ? <> <Icon name="star" color={'#ffd12d'} size={wp('4%')} />  <Icon name="star" color={'#ffd12d'} size={wp('4%')} /></> : props.tagID == 3 ? <> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> </> : props.tagID == 4 ? <> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /></> : props.tagID == 5 ? <> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /> <Icon name="star" color={'#ffd12d'} size={wp('4%')} /></> : null}
            </Text>
          </TouchableOpacity> :

          props.type != undefined && props.type == "brands" ?
            (
              <TouchableOpacity
                style={[styles.filterBox, { borderWidth: 0 }]}
                onPress={() => props.onFilterPress(props.type, props.tagID)}
              >
                <CheckIcon
                  name="checkbox-passive"
                  color={"#00000014"}
                  size={wp("4%")}
                />
                <Text style={[styles.tagStyle, { marginLeft: 5 }]}>
                  {props.tagName}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.filterBox,
                  props.selectedPrice == props.tagID
                    ? styles.borderBox
                    : styles.unborderBox,
                ]}
                onPress={() => props.onFilterPress(props.type, props.tagID)}
              >
                {
                  props.selectedPrice == props.tagID && (
                    <Image source={checkaround} style={styles.imageView} />
                  )}
                <Text style={styles.tagStyle}>{props.tagName}</Text>
              </TouchableOpacity>
            )
      }
      {
        props.type == undefined && (
          <TouchableOpacity
            style={[
              styles.filterBox,
              selectedTag ? styles.borderBox : styles.unborderBox,
            ]}
            onPress={() => props.onFilterPress(props.type, props.tagID)}
          >
            {selectedTag && (
              <Image source={checkaround} style={styles.imageView} />
            )}
            <Text style={styles.tagStyle}>{props.tagName}</Text>
          </TouchableOpacity>
        )}
    </>
  );
}

export default FilterTags;

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
});
