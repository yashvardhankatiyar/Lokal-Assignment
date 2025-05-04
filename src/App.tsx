// App.jsx
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './navigation';
import { BookmarkProvider } from './contexts/BookMarkContext';
import { RootSiblingParent } from 'react-native-root-siblings';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RootSiblingParent>
      <BookmarkProvider>
      <Navigation />
      </BookmarkProvider>
      </RootSiblingParent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
