import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    Modal,
    Image
} from "react-native";
import { connect } from 'react-redux';
import { Input, Button, FormControl } from 'native-base';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, CartView, OtrixLoader,
    OtrixAlert
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import { useIsFocused } from "@react-navigation/native";
import { bindActionCreators } from 'redux';
import { removeFromCart, decrementQuantity, incrementQuantity } from '@actions';
import { CURRENCY } from '@env';
import { close } from '@common';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "@helpers/Fonts";
import getApi from "@apis/getApi";
import { logfunction, numberWithComma } from "@helpers/FunctionHelper";


function CheckoutScreen(props) {
    const [state, setState] = React.useState({ addOtherTip: false, loading: true, cartProducts: [], sumAmount: 0, isApplied: false, validCode: false, couponCode: null, noRecord: false, subTotal: 0, discount: null, tax: null, grandTotal: 0, message: null, type: 'error', tipAmt: 0 });
    const [showMessage, setShowLoading] = React.useState(false)
    const [isSelectTip, setSelection] = useState()
    const [finalCost, setFinalCost] = useState(0)
    const [showTip, setShowTip] = useState(false)
    // const [addOtherTip, setAddOtherTip] = useState(true)
    const isFocused = useIsFocused();
    const arrTip = ["10", "20", "50", "Other"]

    const applyCouponCode = () => {
        const { couponCode } = state;
        if (couponCode != null) {
            let sendData = new FormData();
            sendData.append('couponCode', couponCode)
            logfunction("Sample requrest  ", sendData);
            getApi.postData(
                'user/applyCoupon',
                sendData,
            ).then((response => {
                logfunction("response response  ", response);
                if (response.status == 1) {
                    if (showTip) {

                        let totalCost = parseFloat(response.grandTotal.replace(/,/g, '')) + tipAmt;
                        setFinalCost(response.grandTotal)
                        setState({
                            ...state,
                            discount: response.discount,
                            grandTotal: totalCost,
                            type: 'success',
                            message: response.message
                        });
                        //setFinalCost( response.grandTotal)
                        setShowLoading(true)
                        setTimeout(() => {
                            setShowLoading(false)
                        }, 3000);

                    } else {

                        setState({
                            ...state,
                            discount: response.discount,
                            grandTotal: response.grandTotal,
                            type: 'success',
                            message: response.message
                        });
                        setFinalCost(response.grandTotal)
                        setShowLoading(true)
                        setTimeout(() => {
                            setShowLoading(false)
                        }, 3000);

                    }

                }
                else {
                    setState({
                        ...state,
                        message: response.message,
                        fetchCart: false,
                        discount: null,
                        type: 'error'
                    });
                    setShowLoading(true)
                    setTimeout(() => {
                        setShowLoading(false)
                    }, 3000);
                }
            }));
        }
        else {
            setState({ ...state, isApplied: true, validCode: false })
        }
    }

    const onDeleteItem = (id) => {
        let sendData = new FormData();
        sendData.append('cart_id', id)
        logfunction("Sample requrest  ", sendData);
        getApi.postData(
            'user/deleteCart',
            sendData,
        ).then((response => {
            logfunction("response response  ", response);

            if (response.status == 1) {
                props.removeFromCart(response.cartCount);
                setFinalCost(response.grandTotal)
                setState({
                    ...state,
                    cartProducts: response.cartData,
                    subTotal: response.subTotal,
                    discount: response.discount,
                    tax: response.taxes,
                    grandTotal: response.grandTotal,
                    noRecord: response.cartData.length > 0 ? false : true,
                });
            }
            else {
                setState({
                    ...state,
                    message: response.message,
                    fetchCart: false,
                    type: 'error'
                });
                setShowLoading(true)
                setTimeout(() => {
                    setShowLoading(false)
                }, 3000);
            }
        }));
    }

    const decrement = (id, productID, quantity) => {

       

        let qty = parseInt(quantity);

        let sendData = new FormData();
        sendData.append('cart_id', id)
        sendData.append('quantity', qty - 1)
        logfunction("Sample requrest  ", sendData);
        getApi.postData(
            'user/updateCart',
            sendData,
        ).then((response => {
            logfunction("response response  ", response);

            if (response.status == 1) {
                props.incrementQuantity(response.cartCount);
                if (showTip) {
                    let totalCost = parseFloat(response.grandTotal.replace(/,/g, '')) + tipAmt;
                    setFinalCost(response.grandTotal)
                    setState({
                        ...state,
                        cartProducts: response.cartData,
                        subTotal: response.subTotal,
                        discount: response.discount,
                        tax: response.taxes,
                        grandTotal: totalCost + '.00',
                        noRecord: response.cartData.length > 0 ? false : true,
                    });

                } else {
                    setFinalCost(response.grandTotal)
                    setState({
                        ...state,
                        cartProducts: response.cartData,
                        subTotal: response.subTotal,
                        discount: response.discount,
                        tax: response.taxes,
                        grandTotal: response.grandTotal,
                        noRecord: response.cartData.length > 0 ? false : true,
                    });

                }

            }
            else {
                setState({
                    ...state,
                    message: response.message,
                    fetchCart: false,
                    type: 'error'
                });
                setShowLoading(true)
                setTimeout(() => {
                    setShowLoading(false)
                }, 3000);
            }


        }));
    }

    const increment = (id, productID, quantity) => {
        let qty = parseInt(quantity);

        let sendData = new FormData();
        sendData.append('cart_id', id)
        sendData.append('quantity', qty + 1)
        logfunction("Sample requrest  ", sendData);
        getApi.postData(
            'user/updateCart',
            sendData,
        ).then((response => {
            logfunction("response response  ", response);

            if (response.status == 1) {
                props.incrementQuantity(response.cartCount);
                if (showTip) {
                    let totalCost = parseFloat(response.grandTotal.replace(/,/g, '')) + tipAmt;
                    setFinalCost(response.grandTotal)
                    setState({
                        ...state,
                        cartProducts: response.cartData,
                        subTotal: response.subTotal,
                        discount: response.discount,
                        tax: response.taxes,
                        grandTotal: totalCost  + '.00',
                        noRecord: response.cartData.length > 0 ? false : true,
                    });

                } else {
                    setFinalCost(response.grandTotal)
                    setState({
                        ...state,
                        cartProducts: response.cartData,
                        subTotal: response.subTotal,
                        discount: response.discount,
                        tax: response.taxes,
                        grandTotal: response.grandTotal,
                        noRecord: response.cartData.length > 0 ? false : true,
                    });

                }

            }
            else {
                setState({
                    ...state,
                    message: response.message,
                    fetchCart: false,
                    type: 'error'
                });
                setShowLoading(true)
                setTimeout(() => {
                    setShowLoading(false)
                }, 3000);
            }

        }));
    }

    const calculateCart = () => {
        getApi.getData(
            "user/getCart",
            [],
        ).then((response => {
            logfunction("RESPONS ", response)
            if (response.status == 1) {
                setFinalCost(response.grandTotal)
                setState({
                    ...state,
                    cartProducts: response.cartData,
                    subTotal: response.subTotal,
                    discount: response.discount,
                    tax: response.taxes,
                    grandTotal: response.grandTotal,
                    noRecord: response.cartData.length > 0 ? false : true,
                    loading: false,
                });
            }
            else {
                setState({
                    ...state,
                    loading: false,
                    message: response.cartData.length > 0 ? response.message : null,
                    noRecord: response.cartData.length > 0 ? false : true,
                });
                setShowLoading(true)
                setTimeout(() => {
                    setShowLoading(false)
                }, 3000);
            }
        }));

        /***************OLD local cart functionality *********/
        // //find and create array
        // cartProducts && cartProducts.length > 0 && cartProducts.forEach(function (item, index) {
        //     let findedProduct = ProductListDummy.filter(product => product.id == item.product_id);
        //     cartItems.push({
        //         quantity: item.quantity,
        //         name: findedProduct[0].name,
        //         price: findedProduct[0].price,
        //         image: findedProduct[0].image,
        //         id: findedProduct[0].id
        //     });
        //     let amt = parseInt(findedProduct[0].price.replace('$', ''));
        //     sumAmount += amt * item.quantity;
        // });

        //setState({ ...state, noRecord: cartProducts.length > 0 ? false : true, loading: false, cartProducts: cartItems, sumAmount: sumAmount, });
    }

    const checkSelectedTip = (activeIndex, amtTip) => {
        console.log("data----", activeIndex, amtTip);
        if (amtTip === 'Other') {
            setState({
                ...state,
                addOtherTip: true
            });

        } else {

            console.log("grand total", grandTotal, amtTip);
            setSelection(activeIndex)
            setShowTip(true)

            let totalCost = parseFloat(finalCost.replace(/,/g, '')) +
                parseFloat(amtTip.replace(/,/g, ''));
            console.log("final total", totalCost);
            setState({
                ...state,
                tipAmt: parseFloat(amtTip.replace(/,/g, '')),
                grandTotal: totalCost  + '.00'

            });

        }


    }

    const submitOtherTip = () =>
    {
        
        //setSelection(activeIndex)
        setShowTip(true)

        let totalCost = parseFloat(finalCost.replace(/,/g, '')) +
            parseFloat(tipAmt.replace(/,/g, ''));
        console.log("final total", totalCost);
        setState({
            ...state,
            addOtherTip:false,
            tipAmt: parseFloat(tipAmt.replace(/,/g, '')),
            grandTotal: totalCost  + '.00'

        });
    }

    const removeTip = () => {
        setSelection()
        setShowTip(false)

        let totalCost = parseFloat(grandTotal.replace(/,/g, '')) - tipAmt;
        console.log("final total", totalCost);
        setState({
            ...state,
            tipAmt: '0.00',
            grandTotal: totalCost

        });
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            calculateCart();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, []);

    const { addOtherTip, cartProducts, subTotal, discount, type, message, grandTotal, couponCode, loading, isApplied, validCode, tax, noRecord, tipAmt } = state;
    const { strings } = props;
    console.log("other item selected----", addOtherTip);
    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors().light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors().light_white }}>
            <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
          <OtirxBackButton />
        </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1,marginRight:40 }]}>
                    <Text style={GlobalStyles.headingTxt}>  {strings.cart.title}</Text>
                </View>
            </OtrixHeader>
            <ScrollView style={styles.childView} showsVerticalScrollIndicator={false}>
                {/* Content Start from here */}
                <OtrixContent >
                    {/* Cart Component Start from here */}
                    {
                        !noRecord && !loading && <CartView navigation={props.navigation} products={cartProducts} deleteItem={onDeleteItem} decrementItem={decrement} incrementItem={increment} />
                    }
                    {
                        loading && <OtrixLoader />
                    }
                    {
                        !loading && noRecord && <View style={styles.noRecord}>
                            <Text style={styles.emptyTxt}>Cart is empty!</Text>
                            <Button
                                size="lg"
                                variant="solid"
                                bg={Colors().themeColor}
                                style={[GlobalStyles.button, { marginHorizontal: wp('2%'), marginBottom: hp('2.5%'), marginTop: hp('1%') }]}
                                onPress={() => props.navigation.navigate('HomeScreen')}
                            >
                                <Text style={GlobalStyles.buttonText}><Icon name={"md-cart-sharp"} color={Colors().white} style={{ fontSize: wp('4.5%') }} />  Shop Now</Text>
                            </Button>
                        </View>
                    }
                </OtrixContent>

                {!noRecord && !loading &&
                    <View style={styles.checkoutView}>
                        <View style={styles.couponInput}>
                            <Input variant="outline" placeholder={strings.cart.coupon_code} style={[GlobalStyles.textInputStyle, styles.inputStyle]}
                                onChangeText={(couponCode) => setState({ ...state, couponCode })}
                                InputRightElement={
                                    <View style={{ flexDirection: 'row', marginRight: wp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            isApplied ?
                                                validCode ? <Icon name={"checkmark-circle"} size={18} color={'#3ad35c'} />
                                                    : <Icon name={"ios-close-circle"} size={18} color={'red'} />
                                                : null
                                        }
                                        <TouchableOpacity style={styles.applyView} onPress={() => applyCouponCode()}>
                                            <Text style={styles.applyTxt}>{strings.cart.apply}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                        <View style={GlobalStyles.horizontalLine}></View>

                        <View style={{ backgroundColor: Colors().white, height: wp('20%'), marginTop: wp('2%'), width: wp('100%') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: Fonts.Font_Semibold, marginLeft: 20 }}>{"Add Tip"}</Text>
                                {showTip &&
                                    <Text onPress={() => {
                                        removeTip()
                                    }} style={{ fontSize: 12, fontFamily: Fonts.Font_Semibold, marginRight: 20, color: 'red' }}>{"Remove Tip"}</Text>
                                }

                            </View>

                            <View style={{ width: '90%', height: '60%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F8', marginTop: 10, marginHorizontal: '5%' }}>
                                {arrTip.map((item, index) =>
                                    <TouchableOpacity onPress={() => {
                                        checkSelectedTip(index, item)
                                    }} style={{ width: '20%', height: '90%', borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginHorizontal: 5 }}>
                                        {index == isSelectTip ?
                                            <Text style={[styles.rightTxt, { color: 'red', fontSize: wp('4.5%'), textAlign: 'center', fontFamily: Fonts.Font_Semibold, marginHorizontal: 5 }]}>{item}</Text>

                                            :
                                            <Text style={[styles.rightTxt, { color: Colors().black, fontSize: wp('4.5%'), textAlign: 'center', fontFamily: Fonts.Font_Semibold, marginHorizontal: 5 }]}>{item}</Text>
                                        }
                                    </TouchableOpacity>

                                )}
                            </View>


                        </View>
                        <OtrixDivider size={'sm'} />
                        <OtrixDivider size={'sm'} />
                        <OtrixDivider size={'sm'} />
                        <View style={styles.totalView}>
                            <Text style={styles.leftTxt}>{strings.cart.sub_total}</Text>
                            <Text style={styles.rightTxt}>{CURRENCY}{subTotal}</Text>
                        </View>

                        {
                            tax && tax.taxAmount > 0 && <View style={styles.totalView}>
                                <Text style={styles.leftTxt}>{tax.name}</Text>
                                <Text style={styles.rightTxt}>{CURRENCY}{numberWithComma(tax.taxAmount)}</Text>

                            </View>
                        }
                        {
                            discount != null && <View style={styles.totalView}>
                                <Text style={styles.leftTxt}>{discount.name}</Text>
                                <Text style={styles.rightTxt}>- {CURRENCY}{discount.discountAmt}</Text>
                                <OtrixDivider size={'sm'} />

                            </View>
                        }
                        {
                            validCode && <View style={styles.totalView}>
                                <Text style={styles.leftTxt}>{strings.cart.coupon} ({couponCode})</Text>
                                <Text style={styles.rightTxt}>-$50</Text>
                                <OtrixDivider size={'sm'} />

                            </View>
                        }

                        {
                            showTip && <View style={styles.totalView}>
                                <Text style={styles.leftTxt}>{"Tip"} </Text>
                                <Text style={styles.rightTxt}>{tipAmt}.00</Text>
                                <OtrixDivider size={'sm'} />

                            </View>
                        }

                        <OtrixDivider size={'sm'} />

                        <View style={styles.totalView}>
                            <Text style={styles.leftTxt}>{strings.cart.total}</Text>

                            <Text style={[styles.rightTxt, { color: Colors().link_color, fontSize: wp('5.5%') }]}>{CURRENCY}{grandTotal}</Text>
                        </View>

                        <Button
                            size="md"
                            variant="solid"
                            bg={Colors().themeColor}
                            style={[GlobalStyles.button, { marginHorizontal: wp('5%'), marginBottom: hp('2.5%'), marginTop: hp('3%') }]}
                            onPress={() => props.navigation.navigate("CheckoutScreen")}
                        >
                            <Text style={GlobalStyles.buttonText}>{strings.cart.checkout}</Text>
                        </Button>
                    </View>
                }
                {
                    !noRecord && showMessage == true && <OtrixAlert type={type} message={message} />
                }


                <Modal visible={addOtherTip} transparent={true}>
                    <View>
                        {Platform.OS === 'ios' &&
                            <View style={{ height: hp('5%') }}></View>
                        }
                        <View style={styles.modelView}>

                            {/* Model header */}
                            <View style={styles.contentView}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => setState({
                                    ...state,
                                    addOtherTip: false
                                })}>
                                    <Image source={close} style={styles.button} />
                                </TouchableOpacity>
                                <Text style={styles.rateTitle}>{"Add tip amount"}!</Text>

                                <OtrixDivider size={'md'} />
                                {/* <FormControl isRequired isInvalid={cancelSubmited && 'cancelMessage' in errors}> */}
                                <Input variant="outline"
                                    value={tipAmt}
                                    placeholder={"Enter tip amount"} style={GlobalStyles.textInputStyle}
                                    onChangeText={(value) => { setState({ ...state, tipAmt: value }) }}
                                />
                                {/* <FormControl.ErrorMessage
                                    leftIcon={<InfoOutlineIcon size="xs" />}
                                >
                                    {errors.cancelMessage}
                                </FormControl.ErrorMessage> */}
                                {/* </FormControl> */}
                                <Button
                                    size="md"
                                    variant="solid"
                                    bg={Colors().themeColor}
                                    style={[GlobalStyles.button, { marginHorizontal: wp('4%'), top: hp('4.5%') }]}
                                    onPress={() => submitOtherTip()}
                                >
                                    <Text style={GlobalStyles.buttonText}>{strings.order_details.submit}</Text>
                                </Button>
                            </View>


                        </View>

                    </View>
                </Modal>
            </ScrollView>



        </OtrixContainer >
    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,
        strings: state.mainScreenInit.strings
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        removeFromCart, decrementQuantity, incrementQuantity
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);

const styles = StyleSheet.create({

    checkoutView: {
        backgroundColor: Colors().white,
        height: hp('52%'),
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        borderTopLeftRadius: wp('2%'),
        borderTopRightRadius: wp('2%'),
    },
    couponInput: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('1.5%'),

    },
    inputStyle: {
        borderColor: Colors().black,
        backgroundColor: Colors().light_white
    },
    applyTxt: {
        color: Colors().secondaryColor,
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('4%'),
    },
    applyView: { marginHorizontal: wp('2%'), justifyContent: 'center', alignItems: 'center', padding: 5 },
    totalView: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: wp('6%'),
    },
    leftTxt: {
        color: Colors().secondry_text_color,
        fontFamily: Fonts.Font_Bold,
        flex: 0.50,
        fontSize: wp('3.8%'),
        textAlign: 'left'
    },
    rightTxt: {
        color: Colors().text_color,
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('4.5%'),
        flex: 0.50,
        textAlign: 'right'
    },
    noRecord: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: hp('25%')
    },
    emptyTxt: {
        fontSize: wp('6%'),
        marginVertical: hp('1.5%'),
        fontFamily: Fonts.Font_Semibold,
        color: Colors().secondry_text_color
    },
    modelView: {
        height: hp('100%'),
        width: wp('100%'),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(52,52,52,0.8)',
    },
    contentView: {
        marginHorizontal: wp('10%'),
        backgroundColor: Colors().white,
        height: hp('40%'),
        padding: wp('5%')
    },
    button: {
        height: _roundDimensions()._height * 0.016,
        width: _roundDimensions()._height * 0.016,
    },
});

