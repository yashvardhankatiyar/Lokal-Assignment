import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useBookmark } from '../contexts/BookMarkContext';
import moment from 'moment'; 

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;
  const { addBookmark, removeBookmark, isBookmarked } = useBookmark();

  const phone = job.whatsapp_no || job.custom_link?.replace('tel:', '') || job.phone;
  const bookmarked = isBookmarked(job.id);

  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleBookmarkToggle = () => {
    bookmarked ? removeBookmark(job.id) : addBookmark(job);
  };

  const handleWhatsApp = () => {
    Linking.openURL(job.contact_preference?.whatsapp_link || `https://wa.me/${phone}`);
  };

  const feesCharged = job.primary_details?.Fees_Charged;
  const feeText = feesCharged && feesCharged !== '-1' ? `${feesCharged}` : 'No fees';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Image
        source={{ uri: job.creatives?.[0]?.file }}
        style={styles.image}
        resizeMode="cover"
      />

      <InfoRow label="Company" value={job.company_name} />
      <InfoRow label="Location" value={job.primary_details?.Place} />
      <InfoRow label="Salary" value={job.primary_details?.Salary} />
      <InfoRow label="Job Type" value={job.primary_details?.Job_Type} />
      <InfoRow label="Experience" value={job.primary_details?.Experience} />
      <InfoRow label="Qualification" value={job.primary_details?.Qualification} />
      <InfoRow label="Vacancies" value={job.openings_count?.toString() || job.job_tags?.[0]?.value} />
      <InfoRow label="Fees Charged" value={feeText} />
      {feesCharged !== '-1' && job.fees_charged != null && (
        <InfoRow label="Fee Amount" value={`${job.fees_charged}`} />
      )}
      <InfoRow label="Applied Status" value={job.is_applied ? 'Applied' : 'Not Applied'} />
      <InfoRow label="Created On" value={moment(job.created_on).format('LL')} />
      <InfoRow label="Valid Till" value={moment(job.expire_on).format('LL')} />

      <Text style={styles.sectionHeader}>Other Details</Text>
      <Text style={styles.details}>{job.other_details}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Text style={styles.buttonText}>📞 Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bookmarkButton, bookmarked && styles.bookmarked]}
          onPress={handleBookmarkToggle}
        >
          <Text style={styles.buttonText}>
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleWhatsApp} style={styles.whatsappRow}>
        <Text style={styles.whatsapp}>💬 Chat on WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value || '-'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF9DB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC107',
    textAlign : 'justify',
    marginBottom: 15,
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: 130,
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#444',
  },
  sectionHeader: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  details: {
    color: '#444',
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  callButton: {
    backgroundColor: '#FFD54F',
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookmarkButton: {
    backgroundColor: '#FFCA28',
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookmarked: {
    backgroundColor: '#FDD835',
  },
  buttonText: {
    color: '#212121',
    fontWeight: 'bold',
  },
  whatsappRow: {
    marginTop: 15,
    alignItems: 'center',
  },
  whatsapp: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
