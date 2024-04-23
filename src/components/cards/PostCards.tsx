import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import moment from 'moment';
import theme from '../../defaultCss/Theme';

type Props = {
  posts: any[];
};
const PostCards = ({posts}: Props) => {
  const renderItem = ({item}: any) => (
    <View style={styles.cardView}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.description}>
        {' '}
        {item?.description?.length > 300
          ? item?.description?.substring(0, 300) + '...'
          : item?.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{item?.postedBy?.name}</Text>
        <Text style={styles.footerText}>
          {moment(item?.createdAt).format('DD:MM:YYYY')}
        </Text>
      </View>
    </View>
  );
  return (
    <View>
      <View style={styles.container}>
        {posts?.map((item: any) => (
          <View style={styles.cardView} key={item._id}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.description}>
              {' '}
              {item?.description?.length > 300
                ? item?.description?.substring(0, 300) + '...'
                : item?.description}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.footerText}>{item?.postedBy?.name}</Text>
              <Text style={styles.footerText}>
                {moment(item?.createdAt).format('DD:MM:YYYY')}
              </Text>
            </View>
          </View>
        ))}
        {/* <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        /> */}
      </View>
    </View>
  );
};

export default PostCards;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  cardView: {
    backgroundColor: 'white',
    // borderWidth: 0.1,
    padding: 10,
    margin: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.darkYellowGreen,
    borderBottomWidth: 0.2,
    paddingBottom: 4,
  },
  description: {
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '',
  },
  footerText: {
    fontSize: 16,
    color: theme.colors.darkYellowGreen,
  },
});
