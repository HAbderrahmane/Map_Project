import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    flex: 1,
    
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: Platform.OS === 'ios' ? 60 : 50,
  },
  searchBarInputContainer: {
    backgroundColor: '#EDEDED',
  },
  searchResultsContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: 5,
    elevation: 3,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultsList: {
    margin: 0,
    padding: 0,
  },
  // Add the navigateTextContainer styles
  navigateTextContainer: {
    position: 'absolute',
    bottom: 100,  // Adjust the bottom distance as needed
    backgroundColor: 'rgba(0, 122, 255, 0.7)',
    borderRadius: 5,
    padding: 10,
  },
  navigateText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
