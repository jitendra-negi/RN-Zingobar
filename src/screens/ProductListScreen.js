import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  Image
} from "react-native";

import { connect } from 'react-redux';
import {
  OtrixContainer, OtrixMenuButton, OtrixHeader, OtrixContent, OtrixLoader, OtrixDivider, FlatListProductView, OtirxBackButton, OtrixNotfoundComponent, FilterTags, FilterComponent, SideMenuCategoryItem
} from '@component';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { GlobalStyles, Colors } from '@helpers';

import { _roundDimensions } from '@helpers/util';

import { addToWishList } from '@actions';

import { emptyBox } from '@common/config';

import { bindActionCreators } from "redux";

import { filter, cancel } from '@common';

import { _addToWishlist, _getWishlist, logfunction } from "@helpers/FunctionHelper";

import { ProductListSkeleton } from '@skeleton';

import Fonts from '@helpers/Fonts';

import CategoryList from '../component/items/CategoryList';

import { menu } from '@common';

import getApi from "@apis/getApi";
import { useNavigation } from "@react-navigation/native";



function ProductListScreen(props) {

  const { title, id, type, childerns, productList } = props.route.params || {};

  // Check if childerns is available
  const defaultChilderns = childerns !== undefined ? childerns : [];

  const [state, setState] = React.useState({
    categoryData: [],
    data: [],
    loader: false,
    currentPage: 1,
    totalPages: 1,
    childCategories: defaultChilderns,
    selectedTag: id,
    selectedFilters: [id],
    wishlistArr: [],
    filterModelVisible: false,
    loading: true,


    filterPrice: null,
    filterPriceRange: null,

    filterLoading: false,
    filterAplied: false,

    filterSort: null,
    filterSize: null,
    filterRating: null,
  });

  const {
    selectedFilters,
    selectedTag,
    filterSort,
    filterSize,
    filterRating,

    filterPrice,
    filterPriceRange,

    data,
    totalPages,
    loading,
    loader,
    filterModelVisible,
    currentPage,
    childCategories,
    headingTitle,
    filterAplied
  } = state;

  const [open, setOpen] = useState(false);


  const fetchData = (ID, page, filterApplied = false, range, fprice = null, frating = null, fsort = null, fsize = null) => {
    logfunction("checkpoint", "fetchData");
    let url = '';
    if (type == 'category') {
      url = 'getProductByCategory/' + ID + '?page=' + page
    }

    else if (type == 'menufacturer') {
      url = 'getProductByManufacturer/' + ID + '?page=' + page
    }

    // //add filter to url
    // if (filterApplied == true && fprice != null) {
    //   logfunction("PRICE IN ", fprice)
    //   url = url + '&filterPrice=' + fprice;
    // }

    // if (filterApplied == true && range != null && range.min != 40) {
    //   url = url + '&filterPriceRange=' + range.min + ',' + range.max;
    // }



    //Sorting
    if (filterApplied == true && fsort != null) {
      logfunction("SORT ", fsort)
      if (fsort == "new") {
        url = url + '&sortByColumn=created_at&sortBy=asc';
      } 
      else if (fsort == "rate") {
        url = url + '&sortByColumn=rate&sortBy=desc';
      } 
      else {
        url = url + '&sortByColumn=price&sortBy=' + fsort;
      }

    }

    //Size
    if (filterApplied == true && fsize != null) {
      logfunction("Size ", fsize)
      url = url + '&filterSize=' + "500ml";
    }

    //rating
    if (filterApplied == true && frating != null) {
      logfunction("RATE ", frating)
      url = url + '&filterRating=' + frating;
    }



    logfunction("Filter_Url", url)
    logfunction("FILTER ", filterApplied)



    try {

      getApi.getData(

        url,

        [],

      ).then((response => {

        if (response.status == 1) {

          logfunction("PRODUUC RESPONSE ", response)

          setState(prevstate => ({

            ...prevstate,

            data: filterApplied == true ? response.productsList.data : [...prevstate.data, ...response.productsList.data],

            selectedTag: ID,

            filterPriceRange: range,

            totalPages: response.productsList.last_page,

            loading: false,

            loader: false,

          }));

        }

      }));

    } catch (error) {

    }

  }




  //fetch data fro new,deals of the day and trending products

  const fetchDataForNDT = (url) => {

    logfunction("PRODUCT LIST ", url)

    getApi.getData(

      url,

      [],

    ).then((response => {

      if (response.status == 1) {

        logfunction("PRODUUCT RESPONSE ", response)

        setState(prevstate => ({

          ...prevstate,

          data: response.data,

          loading: false,

          loader: false

        }))

      }

    }));

  }




  //when filter tag clicked

  const filterClick = (type, value) => {

    logfunction("filterClick ", "type: " + type + " value: " + value);


    if (type == 'size') {

      setState({

        ...state,

        filterSize: value,

      })

    }



    if (type == 'sort') {

      setState({

        ...state,

        filterSort: value,

      })

    }

    if (type == 'rating') {

      setState({

        ...state,

        filterRating: value,

      })

    }

  }




  //when Category  clicked

  const onCategoryClick = (type, value) => {
    let title = headingTitle;
    logfunction("title ", title)

    if (value != id) {
      logfunction("childCategories ", childCategories)
      logfunction("Value ", value)
      let index = childCategories.findIndex(c => c.category_id === value);
      logfunction("index ", index)
      title = childCategories[index].category_description.name;
    }

    setState({

      ...state,
      title: title,
      data: [],
      currentPage: 1,

    });

    fetchData(value, 1)

  }

  // const onCategoryClick = (type, value) => {
  //   let title = headingTitle;
  //   let clickedCategory = childCategories.find(category => category.category_id === value);
  //   let clickedChildCategories = clickedCategory && clickedCategory.children ? clickedCategory.children : [];

  //   setState(prevState => ({
  //     ...prevState,
  //     title: clickedCategory ? clickedCategory.category_description.name : title,
  //     data: [],
  //     currentPage: 1,
  //     childCategories: clickedChildCategories,
  //     selectedTag: value,
  //     selectedFilters: [value],
  //   }));

  //   fetchData(value, 1);
  // };


  // const [state, setState] = React.useState({ data: [], loading: true });




  useEffect(() => {

    try {
      const unsubscribe = getApi.getData(
        "getCategories",
        [],
      ).then((response => {
        if (response.status == 1) {
          setState({
            ...state,
            categoryData: response.data,
            loading: false
          });


          if (!props.route.params) {
            logfunction("checkpoint", "no_param");
            sideMenuCategoryClicked(response.data[5]);
          }

        }

      }));

      return unsubscribe; //unsubscribe

    } catch (error) {

    }

  }, []);


  const { categoryData } = state;

  const addToWishlist = async (id) => {

    logfunction("IDD------- ", id)

    if (props.USER_AUTH == true) {

      let wishlistData = await _addToWishlist(id);

      props.addToWishList(wishlistData, id);

    }

    else {

      props.navigation.navigate('LoginScreen', { backToPrevious: 1 })

    }

  }




  const paginate = () => {

    if (totalPages > 1 && currentPage <= totalPages) {

      setState({

        ...state,

        loader: true,

        currentPage: currentPage + 1

      });

      fetchData(id, currentPage + 1);

    }

  }




  const applyFilter = (val) => {

    setState({

      ...state,

      // filterPriceRange: val,

      filterAplied: true,

      filterModelVisible: false,

      data: [],

      currentPage: 1,

      loading: true

    });

    setTimeout(() => {

      fetchData(id, 1, true, val, filterPrice, filterRating, filterSort, filterSize);

    }, 300);


  }




  const closeFilterModel = (clearFilter) => {

    logfunction("CLEAR ", clearFilter)

    if (clearFilter) {

      setState({

        ...state,

        filterPrice: null,

        filterSort: null,
        filterSize: null,

        filterRating: null,

        filterModelVisible: false,

        filterAplied: false,

        loading: true,

        currentPage: 1,

        data: [],

      });

      setTimeout(() => {

        fetchData(id, 1, false)

      }, 300);

    }

    else {

      setState({

        ...state,

        filterModelVisible: false,

      });

    }

  }




  useEffect(() => {

    switch (type) {

      case 'category':

        logfunction("checkpoint", "5");

        fetchData(id, 1);

        break;

      case 'menufacturer':

        fetchData(id, 1);

        break;

      case 'newProduct':

        fetchDataForNDT('getNewProducts');

        break;

      case 'dealsoftheday':

        fetchDataForNDT('getDODProducts');

        break;

      case 'trending':

        fetchDataForNDT('getTrendingProducts');

        break;

      default:

        logfunction("checkpoint", "6");
        fetchData(id, 1);

        break;

    }





  }, []);




  const renderFooter = () => {

    return (

      //Footer View

      <View >

        {loader && <OtrixLoader />}

        <OtrixDivider size={'sm'} />

      </View>

    );

  };




  const sideMenuCategoryClicked = (item) => {
    logfunction("checkpoint", "7");
    setOpen(false)
    // let title = headingTitle;
    logfunction("item ", item)

    // if (value != id) {
    //   logfunction("childCategories ", childCategories)
    //   logfunction("Value ", value)
    //   let index = childCategories.findIndex(c => c.category_id === value);
    //   logfunction("index ", index)
    //   //  title = childCategories[index].category_description.name;
    // }

    // setState({

    //   ...state,
    //   title: title,
    //   data: [],
    //   currentPage: 1
    // });

    // fetchData(value, 1)
    // setState({
    //   type: "category",
    //   id: item.category_id,
    //   childerns: item.children != undefined ? item.children : [],
    //   title: item.category_description.name,
    //   childCategories: childerns != undefined ? childerns : [],
    //   data:[]
    // })


    // setState({


    //   data: [],
    //   childCategories:  [],
    //   currentPage: 1
    // });

    props.navigation.replace("ProductListScreen", {
      type: "category",
      id: item.category_id,
      childerns: item.children != undefined ? item.children : [],
      title: item.category_description.name,
    })

    // this.props.navigation.setParams({ selectedCategory: category });

    // Update the navigation parameters
    // navigation.setOptions({ selectedCategory: item.category });

    // Navigate to the desired screen
    // navigation.navigate("ProductListScreen");

    // fetchData(item, 1);

    // props.navigation.navigate('ProductListScreen', { type: 'category', id: item.category_id, childerns: item.children != undefined ? item.children : [], title: item.category_description.name })

  }




  const renderCategoryList = () => {

    logfunction("checkpoint", "renderCategoryList");
    if (open) {

      return (

        <View style={{ width: '100%', flex: 1, backgroundColor: '#BBBBBB', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 1.0 }} >
          <View style={{ width: '80%', flex: 1, backgroundColor: 'white', flexDirection: 'column' }} >

            <OtrixHeader customStyles={{ width: '100%' }}>

              <View style={{

                flex: 0.80,

              }}>

                <Text style={GlobalStyles.headingTxt}>{"Categories"}</Text>

              </View>


              <TouchableOpacity style={GlobalStyles.headerRight} onPress={() => setOpen(false)}>

                <View style={styles.backRound}>

                  <Image source={cancel} style={styles.filter} />

                </View>

              </TouchableOpacity>

            </OtrixHeader>


            <View style={{ width: '90%', height: 1, backgroundColor: '#BBBBBB', marginHorizontal: '5%' }}></View>

            <ScrollView style={styles.childView} showsVerticalScrollIndicator={false}>

              {categoryData.length > 0 && categoryData.map((item, index) =>

                // <SideMenuCategoryItem key={index} props={props} item={item} />

                <TouchableOpacity key={index} style={styles.categoryBox} onPress={() => sideMenuCategoryClicked(item)}>

                  <View style={styles.infromationView}>

                    <Text style={styles.categoryName}>{item.category_description.name}</Text>

                  </View>

                </TouchableOpacity>

              )}

            </ScrollView>

          </View >
        </View>

      );
    }
  };



  const { wishlistData, strings } = props;
  return (

    <OtrixContainer customStyles={{ backgroundColor: Colors().light_white }}>




      {/* Header */}

      <OtrixHeader customStyles={{ backgroundColor: Colors().light_white }}>

        <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => setOpen(true)}>

          {/* <OtirxBackButton /> */}




          <View style={styles.backRound}>

            <Image source={menu} style={styles.backButton} />

          </View>




        </TouchableOpacity>

        <View style={[GlobalStyles.headerCenter]}>

          <Text style={GlobalStyles.headingTxt}>{title}</Text>

        </View>

        {

          type == 'category' || type == 'menufacturer' ? <TouchableOpacity style={GlobalStyles.headerRight} onPress={() => setState({ ...state, filterModelVisible: true })}>

            <Image source={filter} style={styles.filter} />

          </TouchableOpacity> : <View style={{ flex: 0.10 }} />

        }




      </OtrixHeader>




      <OtrixDivider size={'sm'} />




      {/* Horizontal Tag List */}

      {

        childCategories.length > 0 &&

        <View style={{ height: hp('6%') }}>

          <ScrollView style={{ flexDirection: 'row', marginHorizontal: wp('1%') }} horizontal={true} showsHorizontalScrollIndicator={false} >

            <FilterTags strings={strings} tagName={title} type={'tag'} tagID={id} key={id.toString()} selected={selectedTag} onFilterPress={onCategoryClick} />

            {

              childCategories.map((item, index) =>

                <FilterTags type={'tag'} tagName={item.category_description.name} tagID={item.category_id} key={item.category_id.toString()} selected={selectedTag} onFilterPress={onCategoryClick} />

              )

            }

          </ScrollView>

        </View>

      }




      {/* Content Start from here */}

      {

        loading ? <ProductListSkeleton /> :

          <View style={styles.content}>

            {

              data.length > 0 ?

                <FlatList

                  style={{ padding: wp('1%') }}

                  data={data}

                  horizontal={false}

                  numColumns={2}

                  onEndReachedThreshold={0.2}

                  showsVerticalScrollIndicator={false}

                  keyExtractor={(contact, index) => String(index)}

                  ListFooterComponent={renderFooter}

                  onEndReached={({ distanceFromEnd }) => {

                    paginate()

                  }}

                  renderItem={({ item, index }) =>

                    <FlatListProductView strings={strings} data={item} key={item.id} imageViewBg={Colors().white} navToDetail={() => props.navigation.navigate('ProductDetailScreen', { id: item.id })} addToWishlist={() => addToWishlist(item.id)} wishlistArray={wishlistData} />

                  }>

                </FlatList> : <OtrixNotfoundComponent image={emptyBox} title={"Product not found!"} />

            }

          </View>




      }

      {/* Fitler Model Start From Here */}

      <Modal visible={filterModelVisible}>

        <FilterComponent strings={strings} selectedFilter={selectedFilters} applyFilter={applyFilter} onFilterPress={filterClick} closeFilter={closeFilterModel} filterPriceVal={filterPrice} filterRatingVal={filterRating} filterPriceRangeVal={filterPriceRange} filterSortVal={filterSort} filterSizeVal={filterSize} />

      </Modal>




      {renderCategoryList()}




    </OtrixContainer >

  )

}




function mapStateToProps(state) {

  return {

    wishlistData: state.wishlist.wishlistData,

    USER_AUTH: state.auth.USER_AUTH,

    strings: state.mainScreenInit.strings,

  }

}




const mapDispatchToProps = dispatch => (

  bindActionCreators({

    addToWishList

  }, dispatch)

);




export default connect(mapStateToProps, mapDispatchToProps)(ProductListScreen);




const styles = StyleSheet.create({

  content: { flex: 1, marginHorizontal: wp('3%') },

  menuImage: {

    width: wp('5%'),

    height: hp('4%'),

    tintColor: Colors().secondry_text_color,

  },




  filter: {

    height: _roundDimensions()._height * 0.028,

    width: _roundDimensions()._height * 0.028,

  },

  bannerStyle: {

    resizeMode: 'contain',

    width: wp('100%'),

    height: hp('16%'),

    alignSelf: 'center'

  },

  modelView: {

    height: hp('100%'),

    width: wp('100%'),

    backgroundColor: Colors().light_white,

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

  backRound: {

    justifyContent: 'center',

    alignItems: 'center',

    height: _roundDimensions()._height * 0.062,

    width: _roundDimensions()._height * 0.050,

    borderRadius: _roundDimensions()._borderRadius,

    backgroundColor: Colors().white,

    shadowColor: 'grey',

    shadowOffset: { width: 0, height: 0.2 },

    shadowOpacity: 0.10,

    shadowRadius: 3,

    elevation: 2,

    padding: 10

  },

  backButton: {

    height: _roundDimensions()._height * 0.035,
    width: _roundDimensions()._height * 0.035,

  },

  childView: {

    paddingBottom: hp('1.8%'),

    marginTop: wp('3%')

  },



});