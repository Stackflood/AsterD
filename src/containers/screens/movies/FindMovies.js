import React, {useEffect, useState} from 'react';
import {sagaActions} from '../../../store/sagas/sagaActions';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, ScrollView, Dimensions, Text} from 'react-native';

import {SvgXml} from 'react-native-svg';

import {selectIsLoading, selectMovies} from '../../../store/slices/MoviesSlice';
import MovieListRow from '../../../components/FindMovies/MovieListRow';
import MovieRow from '../../../components/FindMovies/MovieRow';
import Spinner from '../../../components/common/Spinner';
import Search from '../../../components/common/Search';
import {getTodayDate} from '../../../utils/dates';
import { AsterDigitalColor } from '../../../utils/colors';

const FindMovies = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState({numColumns: 1, keyGrid: 1});
  const noMoviesImage =
    '<svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 22C20 21.4477 20.4477 21 21 21H77C77.5523 21 78 21.4477 78 22V26C78 26.5523 77.5523 27 77 27H21C20.4477 27 20 26.5523 20 26V22ZM20 36C20 35.4477 20.4477 35 21 35H77C77.5523 35 78 35.4477 78 36V40C78 40.5523 77.5523 41 77 41H21C20.4477 41 20 40.5523 20 40V36ZM21 49C20.4477 49 20 49.4477 20 50V54C20 54.5523 20.4477 55 21 55H77C77.5523 55 78 54.5523 78 54V50C78 49.4477 77.5523 49 77 49H21ZM20 64C20 63.4477 20.4477 63 21 63H53C53.5523 63 54 63.4477 54 64V68C54 68.5523 53.5523 69 53 69H21C20.4477 69 20 68.5523 20 68V64ZM21 77C20.4477 77 20 77.4477 20 78V82C20 82.5523 20.4477 83 21 83H53C53.5523 83 54 82.5523 54 82V78C54 77.4477 53.5523 77 53 77H21Z" fill="#E3E3E3"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11 12C11 9.23858 13.2386 7 16 7H82C84.7614 7 87 9.23858 87 12V56H85V12C85 10.3431 83.6569 9 82 9H16C14.3431 9 13 10.3431 13 12V92C13 93.6609 14.3348 95 15.9877 95H60.5455V97H15.9877C13.2222 97 11 94.7574 11 92V12Z" fill="#707070"/><path d="M76 93C85.3888 93 93 85.3888 93 76C93 66.6112 85.3888 59 76 59C66.6112 59 59 66.6112 59 76C59 85.3888 66.6112 93 76 93Z" fill="#CCCCCC"/><path fill-rule="evenodd" clip-rule="evenodd" d="M58 76C58 66.0589 66.0589 58 76 58C85.9411 58 94 66.0589 94 76C94 85.9411 85.9411 94 76 94C66.0589 94 58 85.9411 58 76ZM76 60C67.1634 60 60 67.1634 60 76C60 84.8366 67.1634 92 76 92C84.8366 92 92 84.8366 92 76C92 67.1634 84.8366 60 76 60Z" fill="#707070"/><path fill-rule="evenodd" clip-rule="evenodd" d="M87.6741 87.6741C88.0646 87.2836 88.6978 87.2836 89.0883 87.6741L98.3321 96.9179C98.7226 97.3084 98.7226 97.9416 98.3321 98.3321C97.9416 98.7226 97.3084 98.7226 96.9179 98.3321L87.6741 89.0884C87.2836 88.6978 87.2836 88.0647 87.6741 87.6741Z" fill="#707070"/></g></svg>';

  const [filter, setFilter] = useState('popularity.desc');
  const [clearSearch, setClearSearch] = useState('');

  const [id, setId] = useState(null);
  const TYPE_REQUEST_SEARCH = 'search';
  const TYPE_REQUEST_DISCOVER = 'discover';

  const dispatch = useDispatch();

  var movies = useSelector(selectMovies);

  var isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    updateLoader(isLoading);
  }, [isLoading]);

  const getQueryRequest = (typeRequest, searchString) => {
    if (typeRequest === TYPE_REQUEST_DISCOVER) {
      return id ? {with_genres: `${id}`} : null;
    }
    if (typeRequest === TYPE_REQUEST_SEARCH) {
      return {query: encodeURI(`${searchString.trim()}`)};
    }
    return null;
  };

  const searchMovie = (typeRequest, searchString) => {
    const dateRelease = getTodayDate();
    var url = `${typeRequest}/movie`;
    var queryPayload = {
      page: 1,
      'release_date.lte': dateRelease,
      sort_by: filter,
      with_release_type: '1|2|3|4|5|6|7',
      include_adult: false,
      ...getQueryRequest(typeRequest, searchString),
    };
    setLoading(true);
    dispatch({type: sagaActions.GET_MOVIES, url, queryPayload});
  };

  useEffect(() => {
    searchMovie(TYPE_REQUEST_DISCOVER, '');
  }, []);

  const renderItem = (item, type, isSearch, numColumns) => (
    <MovieRow
      item={item}
      type={type}
      isSearch={isSearch}
      numColumns={numColumns}
    />
  );

  const updateLoader = isLoading => {
    if (!isLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const renderLoader = () => {
    if (loading)
      return (
        <View style={{marginTop: 20, marginBottom : 20}}>
          <Spinner />
        </View>
      );
    return null;
  };

  const searchMovies = searchString => {
    if (searchString !== null && searchString !== undefined) {
      try {
        searchMovie(
          searchString === '' ? TYPE_REQUEST_DISCOVER : TYPE_REQUEST_SEARCH,
          searchString,
        );
      } catch (e) {
      } finally {
      }
    }
  };

  return (
    <>
      <View>
        <Search
          onEnter={searchMovies}
          dynamicSearchEnabled={false}
          style={styles.search}
          clearSearch={clearSearch}
          editable={true}
          placeholder="Search for Movies"
        />

        {renderLoader()}
        <ScrollView style={styles.moviesContainer}>
          {movies && movies.length > 1 ? (
                <MovieListRow
                  data={movies}
                  type="normal"
                  isSearch={false}
                  keyGrid={view.keyGrid}
                  numColumns={view.numColumns}
                  renderItem={renderItem}
                />
          ) : !loading ?
            <View
              style={styles.emptyList}>
              <SvgXml
                xml={noMoviesImage}
                width="85"
                height="100"
                style={{alignSelf: 'center'}}></SvgXml>
              <Text>No Movies to show for {'\n'} your searched criteria</Text>
            </View> : <Text></Text>
          }
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  moviesContainer: {
    marginBottom: 100,
  },
  container: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: AsterDigitalColor.WHITE,
  },
  search: {
    fontSize: 10,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    borderColor: '#CCCCCC',
    textAlign: 'left',
    alignContent: 'center',
    backgroundColor: AsterDigitalColor.WHITE,
    flexGrow: 0.5,
    marginLeft: 15,
  },
  emptyList :
  {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height / 6,
    justifyContent: 'center',
  }
});

export default FindMovies;
