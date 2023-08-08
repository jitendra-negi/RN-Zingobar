import React from "react";
import {
    NavigationContainer,
    createNavigationContainerRef,
    useNavigation
  } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { removeAllFromCart } from "./helpers/actions/cartActions"; // Import the action to remove all items from cart

const AddToCartButton = ({ cartCount, removeAllFromCart }) => {
    const navigation = useNavigation(); 
  const handleRemoveAllFromCart = () => {
    removeAllFromCart(); // Dispatch the removeAllFromCart action
  };

  const handleOpenCart = () => {
     navigation.navigate("CartScreen");
   
  };


  // Rest of the component code...
  return (

    <View style={styles.containerCart}>

      <View style={styles.cartView}>
        <Image
          square
          source={bottomCart}// Add the path to the add to cart icon
          style={styles.bottomTabIcon}
        />
      </View>
      <Text style={styles.itemCountText}>{cartCount} items</Text>

      <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={handleRemoveAllFromCart} style={styles.closeIcon}>
        <View style={styles.cancelView}>
          <Image
            square
            source={cancel}// Add the path to the add to cart icon
            style={styles.cancelIcon}
          />
        </View>
      </TouchableOpacity>
    </View>

    // <TouchableOpacity onPress={handleAddToCart}>
    //   <View style={styles.cartView}>
    //     <Image
    //       square
    //       source={bottomCart}// Add the path to the add to cart icon
    //       style={styles.bottomTabIcon}
    //     />
    //     {cartCount > 0 && (
    //       <View style={[GlobalStyles.badge, styles.count]}>
    //         <Text style={[GlobalStyles.badgeText, styles.countText]}>
    //           {cartCount}
    //         </Text>
    //       </View>
    //     )}
    //   </View>
    // </TouchableOpacity>

  );
};

const mapStateToProps = (state) => ({
  cartCount: state.cart.cartCount,
});

const mapDispatchToProps = (dispatch) => ({
  removeAllFromCart: () => dispatch(removeAllFromCart()),
  addToCart: () => dispatch(addToCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);


