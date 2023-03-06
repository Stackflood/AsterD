import { TextInput} from 'react-native-paper';
import {Keyboard, View} from 'react-native';
import React, {useState} from 'react';
import { AsterDigitalColor } from '../../utils/colors';

const Search = ({
  placeholder,
  onEnter,
  dynamicSearchEnabled,
  style,
  editable
}) => {
  var [searchString, setsearchString] = useState('');
  const [inFocus, setInFocus] = useState(false);

  const searchCallBack = value => {
    var searchParam = searchString;
    if (value === '') {
      searchParam = value;
    }
    onEnter(searchParam);
    Keyboard.dismiss;
  };

  const clear = () => {
    if (searchInProgress()) {
      searchCallBack('');
    }
    setInFocus(false);
    setsearchString('');
  };

  const searchInProgress = () => {
    return searchString.length > 0 ? true : false;
  };

  return (
    <View style={style}>
      <TextInput
        onSubmitEditing={searchCallBack}
        contentStyle={{alignContent : 'center'}}
        placeholderTextColor = {!inFocus ? AsterDigitalColor.GREY400 : AsterDigitalColor.GREY300}
        onPressIn={() => {
          setInFocus(true);
        }}
        selectionColor={inFocus ? AsterDigitalColor.BLACK : AsterDigitalColor.TRANSPARENT}
        style={
          !inFocus || !editable
            ? {backgroundColor: AsterDigitalColor.GREY100, height: 45}
            : {backgroundColor: AsterDigitalColor.WHITE, height: 45, borderColor : !inFocus ? AsterDigitalColor.GREY300 : AsterDigitalColor.WHITE, borderWidth: 0.5}
        }
        underlineColor = {AsterDigitalColor.WHITE}
        activeOutlineColor = {AsterDigitalColor.WHITE}
        activeUnderlineColor={AsterDigitalColor.GREY100}
        onChangeText={query => {
          setsearchString(query);
          dynamicSearchEnabled ? onEnter(query) : '';
        }}
        editable={editable}
        value={searchString}
        placeholder={placeholder}
        right={
          <TextInput.Icon
            onPress={clear}
            icon={searchString.length > 0 ? "close" : "movie-search"}
            color={searchString.length > 0 ? AsterDigitalColor.BLACK : AsterDigitalColor.GREY300}
          />
        }
      />
    </View>
  );
};

export default Search;
