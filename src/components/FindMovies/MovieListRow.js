import React from 'react';
import { FlatList } from 'react-native';

const MovieListRow = ({
  data,
  type,
  isSearch,
  keyGrid,
  numColumns,
  renderItem
}) => (
  <FlatList
    data={data}
    key={keyGrid}
    numColumns={numColumns}
    removeClippedSubviews
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) =>
      renderItem(item, type, isSearch, numColumns)
    }
  />
);

export default MovieListRow;