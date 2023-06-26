import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

 

const StickyHeaderExample = () => {
  return (
<View style={styles.container}>
<ScrollView
        contentContainerStyle={styles.contentContainer}
        stickyHeaderIndices={[0]} // Index of the sticky header component
>
<View style={styles.content}>
          {/* Your content here */}
<Text>Scrollable content goes here...</Text>
</View>
</ScrollView>
      {/* Sticky header component */}
<View style={styles.stickyHeader}>
        {/* Content of the sticky header */}
<Text style={styles.headerText}>Sticky Header</Text>
</View>
</View>
  );
};

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

 

export default StickyHeaderExample;