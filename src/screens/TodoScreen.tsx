import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  TextInput,
  Alert,
  Animated,
} from 'react-native';

interface TodoScreenProps {
  onBack: () => void;
}

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoScreen: React.FC<TodoScreenProps> = ({ onBack }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'לבדוק איימילים', completed: false, createdAt: new Date() },
    { id: 2, text: 'לקנות חלב', completed: true, createdAt: new Date() },
    { id: 3, text: 'לפגוש חברים', completed: false, createdAt: new Date() },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([
        ...todos,
        {
          id: newId,
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    Alert.alert(
      'מחק מטלה',
      'האם אתה בטוח שברצונך למחוק את המטלה?',
      [
        { text: 'ביטול', style: 'cancel' },
        { text: 'מחק', style: 'destructive', onPress: () => {
          setTodos(todos.filter(todo => todo.id !== id));
        }},
      ]
    );
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f9fa' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
            ← חזור
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#2c3e50' }]}>
          רשימת מטלות
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.statsContainer, { backgroundColor: isDarkMode ? '#2c3e50' : '#fff' }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: isDarkMode ? '#3498db' : '#3498db' }]}>
            {totalCount}
          </Text>
          <Text style={[styles.statLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
            סה״כ
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: isDarkMode ? '#27ae60' : '#27ae60' }]}>
            {completedCount}
          </Text>
          <Text style={[styles.statLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
            הושלמו
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: isDarkMode ? '#e74c3c' : '#e74c3c' }]}>
            {totalCount - completedCount}
          </Text>
          <Text style={[styles.statLabel, { color: isDarkMode ? '#bdc3c7' : '#7f8c8d' }]}>
            נותרו
          </Text>
        </View>
      </View>

      <View style={[styles.addContainer, { backgroundColor: isDarkMode ? '#2c3e50' : '#fff' }]}>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDarkMode ? '#34495e' : '#f8f9fa',
              color: isDarkMode ? '#fff' : '#2c3e50',
            }
          ]}
          placeholder="הוסף מטלה חדשה..."
          placeholderTextColor={isDarkMode ? '#7f8c8d' : '#95a5a6'}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.todoList} showsVerticalScrollIndicator={false}>
        {todos.map((todo, index) => (
          <Animated.View
            key={todo.id}
            style={[
              styles.todoItem,
              {
                backgroundColor: isDarkMode ? '#2c3e50' : '#fff',
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => toggleTodo(todo.id)}
              style={[
                styles.checkbox,
                {
                  backgroundColor: todo.completed ? '#27ae60' : 'transparent',
                  borderColor: todo.completed ? '#27ae60' : (isDarkMode ? '#7f8c8d' : '#bdc3c7'),
                },
              ]}
            >
              {todo.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            
            <View style={styles.todoContent}>
              <Text
                style={[
                  styles.todoText,
                  {
                    color: todo.completed 
                      ? (isDarkMode ? '#7f8c8d' : '#95a5a6')
                      : (isDarkMode ? '#fff' : '#2c3e50'),
                    textDecorationLine: todo.completed ? 'line-through' : 'none',
                  },
                ]}
              >
                {todo.text}
              </Text>
              <Text style={[styles.todoDate, { color: isDarkMode ? '#7f8c8d' : '#95a5a6' }]}>
                {todo.createdAt.toLocaleDateString('he-IL')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
        
        {todos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={[styles.emptyText, { color: isDarkMode ? '#7f8c8d' : '#95a5a6' }]}>
              אין לך מטלות עדיין
            </Text>
            <Text style={[styles.emptySubtext, { color: isDarkMode ? '#5d6d7e' : '#bdc3c7' }]}>
              הוסף מטלה חדשה למעלה
            </Text>
          </View>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  addContainer: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  todoDate: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
  },
});

export default TodoScreen;