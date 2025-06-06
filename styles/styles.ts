import { COLUMN_WIDTH } from '@/constants/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    padding: 12,
    flexGrow: 1,
  },
  shirtGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12, // Add consistent gap between items
  },

  card: {
    width: COLUMN_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    // Remove fixed height to allow for flexible content
  },
     
  image: {
    width: '100%',
    height: 180, // Fixed image height
    backgroundColor: '#f0f0f0',
  },
     
  infoContainer: {
    padding: 12,
    minHeight: 100, // Use minHeight instead of fixed height
    justifyContent: 'space-between',
  },
     
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 'auto', // Push button to bottom
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  // Skeleton styles
  imageSkeleton: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameSkeleton: {
    height: 16,
    width: '80%',
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
    borderRadius: 4,
  },
  buttonSkeleton: {
    height: 36,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginTop: 6,
  },
  skeletonAnimation: {
    opacity: 0.7,
  },
  // Error styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  // Empty state
  emptyContainer: {
    width: '100%',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  // Overlay loading
  overlayLoading: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  productItemContainer: {
    flex: 1,
    margin: 8,
  },
  shirtRow: {
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  loadingMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingMoreText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  endOfListContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  endOfListText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});