import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';

interface GalleryScreenProps {
  onBack: () => void;
}

const { width } = Dimensions.get('window');
const imageSize = (width - 60) / 2;

const GalleryScreen: React.FC<GalleryScreenProps> = ({ onBack }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { id: 1, title: 'שקיעה יפה', emoji: '🌅', color: '#ff6b6b' },
    { id: 2, title: 'הרים מושלגים', emoji: '🏔️', color: '#4ecdc4' },
    { id: 3, title: 'יער ירוק', emoji: '🌲', color: '#45b7d1' },
    { id: 4, title: 'חוף הים', emoji: '🏖️', color: '#96ceb4' },
    { id: 5, title: 'עיר בלילה', emoji: '🌃', color: '#feca57' },
    { id: 6, title: 'שדה פרחים', emoji: '🌸', color: '#ff9ff3' },
    { id: 7, title: 'מפל מים', emoji: '🌊', color: '#54a0ff' },
    { id: 8, title: 'כוכבים', emoji: '⭐', color: '#5f27cd' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleImagePress = (imageId: number) => {
    const image = images.find(img => img.id === imageId);
    if (image) {
      setSelectedImage(image.title);
      setTimeout(() => setSelectedImage(null), 2000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
            ← חזור
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          גלריה
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Selected Image Info */}
      {selectedImage && (
        <Animated.View style={[styles.selectedInfo, { backgroundColor: isDarkMode ? '#2c3e50' : '#fff' }]}>
          <Text style={[styles.selectedText, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
            📸 {selectedImage}
          </Text>
        </Animated.View>
      )}

      {/* Gallery Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {images.map((image, index) => (
            <Animated.View
              key={image.id}
              style={[
                styles.imageContainer,
                {
                  backgroundColor: image.color,
                  opacity: fadeAnim,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => handleImagePress(image.id)}
              >
                <Text style={styles.imageEmoji}>{image.emoji}</Text>
                <Text style={styles.imageTitle}>{image.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Gallery Info */}
        <View style={[styles.infoContainer, { backgroundColor: isDarkMode ? '#2c3e50' : '#fff' }]}>
          <Text style={[styles.infoTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
            📱 גלריה דיגיטלית
          </Text>
          <Text style={[styles.infoText, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
            לחץ על התמונות כדי לראות פרטים נוספים
          </Text>
          <Text style={[styles.infoStats, { color: isDarkMode ? '#95a5a6' : '#95a5a6' }]}>
            סה״כ {images.length} תמונות
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  selectedInfo: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  imageButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  imageEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  infoContainer: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  infoStats: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default GalleryScreen;