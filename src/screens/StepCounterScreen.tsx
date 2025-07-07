import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, ScrollView, Animated, Dimensions } from 'react-native';

interface StepCounterScreenProps {
  onBack: () => void;
}

const StepCounterScreen: React.FC<StepCounterScreenProps> = ({ onBack }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [steps, setSteps] = useState(3247);
  const [goal] = useState(10000);
  const [isWalking, setIsWalking] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  const progress = Math.min(steps / goal, 1);
  const calories = Math.round(steps * 0.04);
  const distance = (steps * 0.0008).toFixed(1);

  const stats = [
    { label: 'קלוריות', value: calories, icon: '🔥', color: '#e74c3c' },
    { label: 'קילומטרים', value: distance, icon: '📍', color: '#3498db' },
    { label: 'דקות פעילות', value: Math.round(steps / 100), icon: '⏰', color: '#f39c12' },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  }, [fadeAnim]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWalking) {
      interval = setInterval(() => {
        setSteps(prev => prev + Math.floor(Math.random() * 3) + 1);
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.1, duration: 300, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalking, scaleAnim]);

  const startWalking = () => setIsWalking(!isWalking);
  const resetSteps = () => { setSteps(0); setIsWalking(false); };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>← חזור</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>מונה צעדים</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.stepCounterContainer, { backgroundColor: isDarkMode ? '#2c3e50' : '#fff', opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <Text style={[styles.stepCounterLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>צעדים היום</Text>
          <Text style={[styles.stepCount, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>{steps.toLocaleString()}</Text>
          <Text style={[styles.goalText, { color: isDarkMode ? '#95a5a6' : '#95a5a6' }]}>מתוך {goal.toLocaleString()} צעדים</Text>
          
          <View style={[styles.progressContainer, { backgroundColor: isDarkMode ? '#34495e' : '#ecf0f1' }]}>
            <Animated.View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: progress >= 1 ? '#27ae60' : '#3498db' }]} />
          </View>
          
          <Text style={[styles.progressText, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>{Math.round(progress * 100)}% מהמטרה</Text>
          
          {progress >= 1 && <Text style={styles.congratsText}>🎉 כל הכבוד! השגת את המטרה!</Text>}
        </Animated.View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statItem, { backgroundColor: isDarkMode ? '#34495e' : '#fff' }]}>
              <Text style={[styles.statIcon, { color: stat.color }]}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.statusContainer, { backgroundColor: isDarkMode ? '#2c3e50' : '#fff' }]}>
          <Text style={[styles.statusIcon, { color: isWalking ? '#27ae60' : '#95a5a6' }]}>{isWalking ? '🚶‍♂️' : '🧍‍♂️'}</Text>
          <Text style={[styles.statusText, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>{isWalking ? 'הולך עכשיו...' : 'לא פעיל'}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={startWalking} style={[styles.actionButton, { backgroundColor: isWalking ? '#e74c3c' : '#27ae60' }]}>
            <Text style={styles.actionButtonText}>{isWalking ? '⏸️ הפסק' : '▶️ התחל ללכת'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetSteps} style={[styles.actionButton, { backgroundColor: '#95a5a6' }]}>
            <Text style={styles.actionButtonText}>🔄 איפוס</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.tipsContainer, { backgroundColor: isDarkMode ? '#34495e' : '#fff' }]}>
          <Text style={[styles.tipsTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>💡 טיפים לפעילות</Text>
          <Text style={[styles.tipsText, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>• מומלץ ללכת לפחות 10,000 צעדים ביום</Text>
          <Text style={[styles.tipsText, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>• קח הפסקות קצרות כל שעה</Text>
          <Text style={[styles.tipsText, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>• השתמש במדרגות במקום מעלית</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { padding: 10 }, backButtonText: { fontSize: 16, fontWeight: 'bold' }, headerTitle: { fontSize: 24, fontWeight: 'bold' },
  placeholder: { width: 40 }, scrollView: { flex: 1 },
  stepCounterContainer: { alignItems: 'center', padding: 30, borderRadius: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
  stepCounterLabel: { fontSize: 18, marginBottom: 10 }, stepCount: { fontSize: 48, fontWeight: 'bold', marginBottom: 5 },
  goalText: { fontSize: 14, marginBottom: 20 }, progressContainer: { width: '100%', height: 8, borderRadius: 4, marginBottom: 10 },
  progressBar: { height: '100%', borderRadius: 4 }, progressText: { fontSize: 14, marginBottom: 10 },
  congratsText: { fontSize: 16, color: '#27ae60', fontWeight: 'bold', textAlign: 'center' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statItem: { flex: 1, alignItems: 'center', padding: 15, borderRadius: 15, marginHorizontal: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statIcon: { fontSize: 24, marginBottom: 8 }, statValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 }, statLabel: { fontSize: 12, textAlign: 'center' },
  statusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statusIcon: { fontSize: 24, marginRight: 10 }, statusText: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  actionButton: { flex: 1, padding: 15, borderRadius: 15, marginHorizontal: 5, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tipsContainer: { padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  tipsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }, tipsText: { fontSize: 14, marginBottom: 5, lineHeight: 20 },
});

export default StepCounterScreen;