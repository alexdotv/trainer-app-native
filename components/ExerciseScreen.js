import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { store } from "../exercise_store";

const ExerciseScreen = ({ route }) => {
  const { exerciseIndex } = route.params;
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const navigation = useNavigation();
  const timerRef = useRef(null);

  const currentExercise = store.dailyExercises[exerciseIndex];
  const currentImage = store.images[exerciseIndex];

  useEffect(() => {
    store.fetchDailyExercises();
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const handleNextExercise = () => {
    if (exerciseIndex < store.dailyExercises.length - 1) {
      navigation.navigate("ExerciseScreen", {
        exerciseIndex: exerciseIndex + 1,
      });
    } else {
      alert("Все упражнения закончены!");
      navigation.navigate("MainPage");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.exerciseCounter}>
        Exercise {exerciseIndex + 1}/{store.dailyExercises.length}
      </Text>

      {currentImage ? (
        <Image
          source={{ uri: currentImage }}
          style={styles.exerciseImage}
        />
      ) : (
        <Text>No image available</Text>
      )}

      <Text style={styles.readyText}>Ready To Go!</Text>
      <Text style={styles.exerciseTitle}>{currentExercise.name}</Text>

      <Text style={styles.timeText}>
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </Text>

      <TouchableOpacity
        style={styles.startButton}
        onPress={isRunning ? stopTimer : startTimer}
      >
        <Text style={styles.startText}>
          {isRunning ? "Stop" : "Start"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.nextText}>Next</Text>
      <Text style={styles.nextExerciseText}>
        {exerciseIndex < store.dailyExercises.length - 1
          ? store.dailyExercises[exerciseIndex + 1].name
          : "All Done!"}
      </Text>

      <TouchableOpacity style={styles.playButton} onPress={handleNextExercise}>
        <Text style={styles.playText}>Next!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  exerciseCounter: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 30,
  },
  readyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  timeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  startText: {
    color: "#fff",
    fontSize: 18,
  },
  nextText: {
    fontSize: 16,
    marginTop: 20,
    color: "#666",
  },
  nextExerciseText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
    width: 100,
    paddingLeft: 25,
    paddingBottom: 12,
  },
  playText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ExerciseScreen;
