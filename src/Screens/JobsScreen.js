import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import JobCard from '../Components/JobCard';

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const newJobs = res.data.results || [];

      if (newJobs.length === 0) {
        setHasMore(false);
      } else {
        setJobs(prev => [...prev, ...newJobs]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error ', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderItem = ({ item }) => {
    if (!item.title) return null;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('JobDetails', { job: item })}
      >
        <JobCard
          id={item.id}
          thumburl={item.creatives?.[0]?.thumb_url}
          title={item.title}
          location={item.primary_details?.Place}
          salary={item.primary_details?.Salary}
          phone={item.whatsapp_no || item.contact}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Lokal</Text>
      </View>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        onEndReached={fetchJobs}
        contentContainerStyle={styles.flatListContent}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#FFD700" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9DB', 
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#FFD700', 
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333', 
  },
  flatListContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});
