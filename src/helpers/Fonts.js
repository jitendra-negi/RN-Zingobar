import { I18nManager, Platform } from "react-native";

const Fonts = {
  // Font_Reguler:  I18nManager.isRTL === false ? 'Roboto-Regular' :  Platform.OS == 'ios' ? 'Droid Arabic Kufi'  : 'DroidKufi-Bold' ,
  // Font_Semibold: I18nManager.isRTL === false ? 'Roboto-Medium' : Platform.OS == 'ios' ? 'Droid Arabic Kufi'  : 'DroidKufi-Bold' ,
  // Font_Bold:  I18nManager.isRTL === false ? 'Roboto-Bold' : Platform.OS == 'ios' ? 'Droid Arabic Kufi'  : 'DroidKufi-Bold' ,

  Font_Reguler:
    I18nManager.isRTL === false
      ? "Poppins-Regular"
      : Platform.OS == "ios"
      ? "Poppins-Regular"
      : "Poppins-SemiBold",
  Font_Semibold:
    I18nManager.isRTL === false
      ? "Poppins-Medium"
      : Platform.OS == "ios"
      ? "Poppins-Regular"
      : "Poppins-SemiBold",
  Font_Bold:
    I18nManager.isRTL === false
      ? "Poppins-SemiBold"
      : Platform.OS == "ios"
      ? "Poppins-Regular"
      : "Poppins-SemiBold",
};
export default Fonts;
