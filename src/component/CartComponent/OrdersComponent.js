import React from 'react';
import { View, StyleSheet, Text, I18nManager, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OtrixDivider } from '@component';
import Fonts from '@helpers/Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalStyles, Colors } from '@helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { ASSETS_DIR, CURRENCY } from '@env';
import moment from 'moment';

function OrdersComponent(props) {
    let item = props.orders;
console.log("order data ----------",item);
    
    const { strings } = props;
    return (
        <>
            <OtrixDivider size={'md'} />

            <View style={styles.cartContent} key={item.id}>
                <View style={styles.cartBox} >
                    <View style={styles.imageView}>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: item.products[0].image ? ASSETS_DIR + 'product/' + item.products[0].image : ASSETS_DIR + '/assets/img/default.png',
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={styles.infromationView}>
                        <View >
                            <Text style={styles.name}>{item.products[0].name}</Text>
                        </View>
                        <Text style={styles.orderDate}>{strings.orders.order_on} {moment(item.order_date).format("DD MMM YYYY")}</Text>
                        <Text style={styles.orderDate}>{strings.orders.order_status}: <Text style={styles.orderStatuss}>{item.order_status.name}</Text></Text>
                    </View>

                </View>
                <View style={[GlobalStyles.horizontalLine,{marginTop:10}]}></View>
            <View style={{flexDirection:'row',width:wp('90%'), height: hp('6%'),justifyContent:'space-between',alignContent:'center'}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetailScreen', { orderData: item })} style={[styles.bottomButton]}>
                <Text style={styles.bottomLeftTxt}>{strings.orders.order_detail}</Text>
                {/* <TouchableOpacity style={{ padding: 4 }}> */}
                    <Icon name="arrow-forward-ios" style={{ transform: [{ rotateY: I18nManager.isRTL == true ? '180deg' : '0deg' }], color:'#1C4F91' }} ></Icon>
                {/* </TouchableOpacity> */}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { id: item.products[0].product_id })} style={styles.bottomButton}>
                <Text style={styles.bottomLeftTxt}>{strings.orders.buy_again}</Text>
                {/* <Icon name="arrow-forward-ios" style={{ transform: [{ rotateY: I18nManager.isRTL == true ? '180deg' : '0deg' }] }} ></Icon> */}

            </TouchableOpacity>
           
            
            </View>

            </View>
          
           
        </>
    )
}

export default OrdersComponent;
const styles = StyleSheet.create({
    cartContent: {
        flex: 1,
        //flexDirection: 'row',
        backgroundColor: '#F7F7F8',
        justifyContent: 'center',
        borderRadius: wp('2%'),
        marginLeft: wp('1%'),
        height:hp('25%')
    },
    cartBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('11%'),
        width: wp('90%'),
        flex: 0.90,
    },
    imageView: {
        flex: 0.30,
        backgroundColor: Colors().light_white,
        margin: wp('3.5%'),
        height: hp('12%'),
        borderRadius: wp('1.5%'),
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: undefined,
        aspectRatio: 1,
        width: wp('15.5%')
    },
    infromationView: {
        flex: 0.70,
        marginBottom: hp('1.4%'),
        marginLeft: wp('1%'),
        marginTop: hp('1%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        textAlign: 'center',
        color: Colors().text_color,
        fontSize: wp('3.8%'),
        fontFamily: Fonts.Font_Bold,
    },
    orderDate: {
        textAlign: 'center',
        color: Colors().secondry_text_color,
        lineHeight: hp('3%'),
        fontSize: wp('3.5%'),
        fontFamily: Fonts.Font_Regular,
    },



    bottomButton: {
        height: hp('6%'),
        width:wp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F8',
        flexDirection: 'row',
       // borderRadius: wp('2%'),
       // margin: wp('1%'),
       // marginBottom: hp('0%')
    },
    bottomLeftTxt: {
        textAlign: 'left',
        fontSize: wp('3.8%'),
        flex: 0.90,
        color: '#1C4F91'
    },
    orderStatuss: {
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('3.5%'),
        color: Colors().text_color
    }
});