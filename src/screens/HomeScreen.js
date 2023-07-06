import React, { useEffect, useState } from "react";

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    I18nManager,
    Appearance
} from "react-native";
import { connect } from 'react-redux';
import {
    OtrixHeader, OtrixContainer, OtrixContent, OtrixDivider, HomeSlider, HomeManufacturerView,
    HomeCategoryView, SearchBar, NewProduct, TrendingProduct, BestDeal
} from '@component';
import { HomeSkeleton } from '@skeleton';
import { addToWishList, storeFCM } from '@actions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, GlobalStyles } from '@helpers';
import { bindActionCreators } from 'redux';
import { Badge, Avatar } from "native-base";
import { heart, offerBanner, avatarImg, avatarImg2,menu } from '@common';
import Fonts from "@helpers/Fonts";
import { _roundDimensions } from '@helpers/util';
import { _addToWishlist, logfunction } from "@helpers/FunctionHelper";
import getApi from "@apis/getApi";
import { ASSETS_DIR } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { logo } from '@common';


function HomeScreen(props) {

    const [state, setState] = React.useState({ homePageData: [], loading: true, profileImageURL: null });

    const addToWish = async (id) => {

        let wishlistData = await _addToWishlist(id);

        props.addToWishList(wishlistData, id);

    }
    useEffect(() => {




        try {
            if (!firebase.apps.length) {
                firebase.initializeApp({
                    // apiKey: 'AIzaSyBiWkpoLjN5kZY2cxphsM1v20000000000',
                    // authDomain: 'otrixcommerce123.firebaseapp.com',
                    // databaseURL: '',
                    // projectId: 'otrix-commerce',
                    // storageBucket: '',
                    // appId: "1:123123123123:ios:a5e57cfc08ff88df6cb6c4",
                    // messagingSenderId: '123123123123'
                    apiKey: "AIzaSyBGGK_7IrjsZfqDmaaQKovQ9D1EE6sUv-o",
                    authDomain: "zingobar-d2dd6.firebaseapp.com",
                    databaseURL: '',
                    projectId: "zingobar-d2dd6",
                    storageBucket: '',
                    appId: "1:750908141751:web:1d0837a004f1e4bd7c1d32",
                    messagingSenderId: "750908141751",
                });
            }
        } catch (err) {
            // ignore app already initialized error in snack
            console.log("initializeApp error : ", err)
        }
        (async () => {

            // await AsyncStorage.removeItem('FCM_TOKEN');

            let getFCMTOKEN = await AsyncStorage.getItem('FCM_TOKEN');

            logfunction("LOCAL FIREBASE TOKEN  ", getFCMTOKEN)

            checkPermission(getFCMTOKEN)

        })();

        messaging()
            .subscribeToTopic('otrixcommercelaravelpromotion')
            .then(() => console.log('Subscribed to topic!'));

        async function fetchData() {

            let getLangauge = await AsyncStorage.getItem('Language');
            let language = 'en';

            if (getLangauge) {

                language = getLangauge;

            }

            getApi.getData(
                "getHomePage?language=" + language,
                [],

            ).then((response => {
                logfunction("RESPONSEEE ", response)
                if (response.status == 1) {
                    logfunction("RESPONSEEE ", response)
                    setState({
                        ...state,
                        homePageData: response.data,
                        loading: false
                    });
                }

            }));

        }

        fetchData();

    }, []);

    const requestUserPermission = async () => {

        const authStatus = await messaging().requestPermission();

        const enabled =

            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||

            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {

            // console.log('Authorization status:', authStatus);

            return true;

        }

        else {

            return false;

        }

    }




    const checkPermission = async (getFCMTOKEN) => {

        if (!getFCMTOKEN) {

            requestUserPermission().then(async function (granted) {

                if (granted) {

                    let fcmToken = await messaging().getToken();

                    logfunction("FCM TOKEN ", fcmToken)

                    await AsyncStorage.setItem('FCM_TOKEN', fcmToken);

                    props.storeFCM(fcmToken);


                }

            })

        }

        else {




            props.storeFCM(getFCMTOKEN);

        }

    }





    useEffect(() => {

        const dnotification = messaging().onMessage(async remoteMessage => {

            if (remoteMessage) {

                let orderID = remoteMessage.notification.body.replace(/[^0-9]/g, '');

                if (orderID > 0) {

                    //  Alert.alert('A new FCM message arrived!', orderID);

                    //    props.navigation.navigate('OrderDetailScreen', { orderID: orderID })

                }

            }




        });




        messaging()

            .getInitialNotification()

            .then(async remoteMessage => {

                if (remoteMessage) {

                    // console.log('Message handled in the background!', remoteMessage);

                    let orderID = remoteMessage.notification.body.replace(/[^0-9]/g, '');

                    if (orderID > 0) {

                        //  Alert.alert('A new FCM message arrived!', orderID);

                        props.navigation.navigate('OrderScreen', { orderID: orderID })

                    }

                }




            });




        messaging().setBackgroundMessageHandler(async remoteMessage => {

            // console.log('Message handled in the background!', remoteMessage);

            // let orderID = remoteMessage.notification.body.replace(/[^0-9]/g, '');

            // if (orderID > 0) {

            //     //  Alert.alert('A new FCM message arrived!', orderID);

            //     props.navigation.navigate('OrderDetailScreen', { orderID: orderID })

            // }

        });




        return dnotification;

    }, []);





    const { homePageData, loading, profileImageURL } = state;

    const { USER_AUTH, wishlistData, customerData, wishlistCount, strings } = props;

    logfunction("profile Image ", customerData)

    logfunction("wishlistData wishlistData ", wishlistData)





    return (




        <OtrixContainer customStyles={{ backgroundColor: Colors().white }}>

            <ScrollView contentContainerStyle={styles.contentContainer} stickyHeaderIndices={[1]}>

                {/* Header */}

                <OtrixHeader customStyles={{ backgroundColor: Colors().white }}>

                    {/* <TouchableOpacity style={styles.headerLeft} onPress={() => props.navigation.navigate('ProfileScreen')}>

                    {

                        USER_AUTH ? customerData.creation == 'D' ?

                            customerData.image != null ?

                                <Image

                                    style={styles.avatarImg}

                                    source={{

                                        uri: ASSETS_DIR + 'user/' + customerData.image

                                    }}>

                                </Image>

                                : <Image

                                    ml="3"

                                    size="sm"

                                    style={styles.avatarImg}

                                    source={avatarImg}

                                >

                                </Image>

                            : <Image

                                style={styles.avatarImg}

                                source={{

                                    uri: customerData.image

                                }}>

                            </Image>

                            : <Image

                                ml="3"

                                size="sm"

                                style={styles.avatarImg}

                                source={avatarImg2}

                            >

                            </Image>

                    }

                </TouchableOpacity> */}

                    <View style={styles.headerCenter}  >

                        {/* <Text style={styles.headingTxt}>ZingoBar</Text> */}
                        <Image source={logo} style={styles.bottomlogo} />

                    </View>

                    {

                        loading && <View style={{ flex: 0.10 }} />

                    }

                    {

                        !loading &&

                        <TouchableOpacity style={styles.headerRight} onPress={() => { USER_AUTH ? props.navigation.navigate('WishlistScreen') : props.navigation.navigate('LoginScreen') }}>

                            <Image source={menu} style={styles.heartIcon}></Image>

                            {

                                wishlistCount > 0 &&

                                <Badge style={[GlobalStyles.badge, {

                                    height: wishlistCount > 9 ? _roundDimensions()._height * 0.038 : _roundDimensions()._height * 0.032,

                                    width: wishlistCount > 9 ? _roundDimensions()._height * 0.038 : _roundDimensions()._height * 0.032,

                                    borderRadius: _roundDimensions()._borderRadius,

                                    right: wishlistCount > 9 ? -wp('0.6%') : wp('0.2%'),

                                    top: wishlistCount > 9 ? -hp('0.5%') : hp('0.1%')

                                }]}>




                                    <Text style={[GlobalStyles.badgeText, styles.countText, { fontSize: wishlistCount > 9 ? wp('2.2%') : wp('3%') }]}>{wishlistCount}</Text>

                                </Badge>

                            }




                        </TouchableOpacity>

                    }





                </OtrixHeader>

                <SearchBar navigation={props.navigation} strings={strings} />

                {

                    loading ? <HomeSkeleton /> :

                        <OtrixContent >


                            {/* SearchBar Component */}

                            {/* <SearchBar navigation={props.navigation} strings={strings} /> */}


                            {/* HomeCategoryView Component */}

                            <HomeCategoryView navigation={props.navigation} data={homePageData.categories} strings={strings} />


                            {/* HomeSlider Component */}

                            <HomeSlider data={homePageData.banners} />

                            <OtrixDivider size={'md'} />


                            {/* NewProduct Component */}

                            <NewProduct navigation={props.navigation} strings={strings} wishlistArr={wishlistData} data={homePageData.newProducts.length > 0 ? homePageData.newProducts.slice(0, 4) : []} arr={homePageData.newProducts} addToWishlist={addToWish} userAuth={props.USER_AUTH} />




                            {/* HomeManufacturerView Component */}

                            <HomeManufacturerView strings={strings} navigation={props.navigation} data={homePageData.manufacturers} />




                            {/* BestDeal Component */}

                            <BestDeal navigation={props.navigation} strings={strings} data={homePageData.dodProducts.length > 0 ? homePageData.dodProducts.slice(0, 4) : []} arr={homePageData.dodProducts} wishlistArr={wishlistData} addToWishlist={addToWish} userAuth={props.USER_AUTH} />

                            <OtrixDivider size={'sm'} />




                            {/* Banner Image */}

                            <Image source={offerBanner} style={styles.bannerStyle} />

                            <OtrixDivider size={'sm'} />




                            {/* TrendingProduct Component */}

                            <TrendingProduct navigation={props.navigation} strings={strings} data={homePageData.trendingProducts.length > 0 ? homePageData.trendingProducts.slice(0, 4) : []} arr={homePageData.trendingProducts} wishlistArr={wishlistData} addToWishlist={addToWish} userAuth={props.USER_AUTH} />



                        </OtrixContent>

                }

            </ScrollView>

        </OtrixContainer >

    )

}




function mapStateToProps(state) {

    return {

        USER_AUTH: state.auth.USER_AUTH,

        wishlistData: state.wishlist.wishlistData,

        wishlistCount: state.wishlist.wishlistCount,

        customerData: state.auth.USER_DATA,

        strings: state.mainScreenInit.strings

    }

}




const mapDispatchToProps = dispatch => (

    bindActionCreators({

        addToWishList,

        storeFCM

    }, dispatch)

);





export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);




const styles = StyleSheet.create({

    headerRight: {

        flex: 0.15,

        marginRight: wp('2%'),

        justifyContent: 'center',

        alignItems: 'center',

    },

    heartIcon: {

        width: wp('6.5%'),

        height: hp('6.5%'),

        resizeMode: 'contain',

        tintColor: Colors().custom_pink,

    },

    headerCenter: {

        flex: 0.75,

        justifyContent: 'center',

        alignItems: 'center',



    },

    headingTxt: {

        fontFamily: Fonts.Font_Bold,

        marginLeft: 60,

        fontSize: wp('6.5%'),

        color: Colors().themeColor

    },

    headerLeft: {

        flex: 0.15,

        justifyContent: 'flex-start',

        alignItems: 'flex-start'

    },

    bannerStyle: {

        resizeMode: 'contain',

        width: wp('100%'),

        height: hp('16%'),

        alignSelf: 'center'

    },

    avatarImg: {

        height: _roundDimensions()._height * 0.055,

        width: _roundDimensions()._height * 0.055,

        borderRadius: _roundDimensions()._borderRadius,

        marginLeft: wp('3%')

    },

    bottomlogo: {
        marginLeft: 60,
        height: hp('6%'),
        width: wp('40%'),
        resizeMode: 'contain',
        alignSelf: 'center'
    },

});