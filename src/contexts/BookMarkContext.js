import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const stored = await AsyncStorage.getItem('@bookmarkedJobs');
        if (stored) {
          setBookmarkedJobs(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load ', err);
      }
    };
    loadBookmarks();
  }, []);

  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem('@bookmarkedJobs', JSON.stringify(bookmarkedJobs));
      } catch (err) {
        console.error('Failed to save ', err);
      }
    };
    saveBookmarks();
  }, [bookmarkedJobs]);

  const addBookmark = (job) => {
    setBookmarkedJobs((prev) => [...prev, job]);
  };

  const removeBookmark = (jobId) => {
    setBookmarkedJobs((prev) => prev.filter(job => job.id !== jobId));
  };

  const isBookmarked = (jobId) => {
    return bookmarkedJobs.some(job => job.id === jobId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedJobs, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
