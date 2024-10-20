import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react-lite";
import { store } from "../exercise_store";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const MainPage = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    store.fetchDailyExercises();
  }, []);

  const GoalCard = ({ item }) => (
    <View style={styles.goalCard}>
      <Image source={{ uri: item.cover }} style={styles.goalImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subTitle}>{item.sub_title}</Text>
      <View style={styles.infoContainer}>
        <Text style={tw`text-green-500 text-md`}>
          {(item.duration_seconds / 60).toFixed(0)} min
        </Text>
        <Text style={tw`text-yellow-500 text-md`}>
          {item.calories_count} cal
        </Text>
      </View>
    </View>
  );

  const ExerciseCard = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ExerciseScreen", { exerciseIndex: index })
      } 
    >
      <View style={styles.exerciseCard}>
        <Image
          source={{
            uri:
              item.image ||
              "https://musclefit.info/wp-content/uploads/2021/08/tablicza-prisedanij-dlya-muzhchin-na-30-dnej-min.jpg",
          }}
          style={styles.exerciseImage}
        />
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseTitle}>{item.name}</Text>
          <View style={tw`flex flex-row gap-3 mt-2`}>
            <Text style={tw`text-green-500`}>5 min</Text>
            <Text style={tw`text-yellow-500`}>{item.calories} cal</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playText}>▶</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Start New!</Text>
      <FlatList
        data={store.goals}
        renderItem={GoalCard}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.goalsList}
      />

      <Text style={styles.sectionTitle}>Daily Task</Text>
      <FlatList
        data={store.dailyExercises}
        renderItem={({ item, index }) => (
          <ExerciseCard item={item} index={index} />
        )} 
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.exercisesList}
      />
      
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  goalsList: {
    marginBottom: 20,
  },
  goalCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    height: 460,
  },
  goalImage: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  exercisesList: {
    marginTop: 10,
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 10,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
  },
  playText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 3,
    marginLeft: 2,
  },
});

export default MainPage;