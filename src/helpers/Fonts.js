import { I18nManager ,Platform} from 'react-native';

const Fonts = {
    Font_Reguler:  I18nManager.isRTL === false ? 'Poppins-Regular' :  Platform.OS == 'ios' ? 'Poppins-Regular'  : 'Poppins-Bold' ,
    Font_Semibold: I18nManager.isRTL === false ? 'Poppins-Medium' : Platform.OS == 'ios' ? 'Poppins-Regular'  : 'Poppins-Bold' ,
    Font_Bold:  I18nManager.isRTL === false ? 'Poppins-Bold' : Platform.OS == 'ios' ? 'Poppins-Regular'  : 'Poppins-Bold' ,
}
export default Fonts;