import { StyleSheet, Platform, StatusBar} from 'react-native';
const getStatusBarHeight = () => {
  return Platform.OS === 'android' ? StatusBar.currentHeight : 20; // Default status bar height for iOS is 20
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex: 1,
    marginTop: getStatusBarHeight(),
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
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: Platform.OS === 'ios' ? 60 : 50,
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
  },
  searchResultsContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
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
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    
    
  },
  navigateText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
