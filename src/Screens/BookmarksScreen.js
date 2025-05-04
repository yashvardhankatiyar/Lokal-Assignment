import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useBookmark } from '../contexts/BookMarkContext';
import JobCard from '../Components/JobCard';

export default function BookmarksScreen() {
  const { bookmarkedJobs } = useBookmark();

  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>BookMarks</Text>
      </View>
      {bookmarkedJobs.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              id={item.id}
              thumburl={item.thumburl}
              title={item.title}
              location={item.location}
              salary={item.salary}
              phone={item.phone}
            />
          )}
        />
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#FFF9DB',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFD700', 
    position: 'absolute',
    marginLeft: (width / 2) - 70,
  },
  titlebox: {
    height: 50,
    justifyContent: 'center',
  },
});
