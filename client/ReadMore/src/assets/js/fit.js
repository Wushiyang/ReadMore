import { Dimensions } from 'react-native'

const deviceWidthDp = Dimensions.get('window').width;

const designWidthPx = 750;

export const pTd = function(px){
  return px * deviceWidthDp / designWidthPx
}