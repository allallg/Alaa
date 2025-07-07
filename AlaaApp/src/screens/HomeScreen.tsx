import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Dimensions,
} from 'react-native';

type Screen = 'home' | 'weather' | 'todo' | 'gallery' | 'stepcounter';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const menuItems = [
    {
      id: 'weather',
      title: 'מזג אוויר',
      subtitle: 'צפה במזג האוויר',
      icon: '🌤️',
      color: '#3498db',
      screen: 'weather' as Screen,
    },
    {
      id: 'todo',
      title: 'רשימת מטלות',
      subtitle: 'נהל את המטלות שלך',
      icon: '📝',
      color: '#e74c3c',
      screen: 'todo' as Screen,
    },
    {
      id: 'gallery',
      title: 'גלריה',
      subtitle: 'תמונות יפות',
      icon: '🖼️',
      color: '#9b59b6',
      screen: 'gallery' as Screen,
    },
    {
      id: 'stepcounter',
      title: 'מונה צעדים',
      subtitle: 'עקוב אחרי הפעילות',
      icon: '👟',
      color: '#27ae60',
      screen: 'stepcounter' as Screen,
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          שלום, עלאא! 👋
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
          מה תרצה לעשות היום?
        </Text>
      </View>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              { backgroundColor: isDarkMode ? '#2c3e50' : '#fff' },
              { borderColor: item.color },
            ]}
            onPress={() => onNavigate(item.screen)}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text style={[styles.menuTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
              {item.title}
            </Text>
            <Text style={[styles.menuSubtitle, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
              {item.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDarkMode ? '#7f8c8d' : '#95a5a6' }]}>
          📱 אפליקציה מגניבה לטלפון
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  menuItem: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 30,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default HomeScreen;