import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import Toast from 'react-native-root-toast';
import { useBookmark } from '../contexts/BookMarkContext';

export default function JobCard({ id, thumburl, title, location, salary, phone }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmark();

  const bookmarked = isBookmarked(id);

  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleBookMark = () => {
    if (bookmarked) {
      removeBookmark(id);
      Toast.show('Removed from bookmarks!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    } else {
      addBookmark({ id, thumburl, title, location, salary, phone });
      Toast.show('Bookmarked!', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  return (
    <View style={styles.card}>
      {thumburl && (
        <Image source={{ uri: thumburl }} style={styles.thumbnail} />
      )}
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.info}>📍 Location: {location}</Text>
      <Text style={styles.info}>💰 Salary: {salary}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Text style={styles.buttonText}>📞 Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleBookMark}>
          <Text style={styles.buttonText}>
            {bookmarked ? '❌ Remove' : '🔖 Bookmark'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF9DB', // light yellow
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  info: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFD700', // bright yellow
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
