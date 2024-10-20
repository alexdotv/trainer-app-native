import { makeAutoObservable, runInAction } from "mobx";

class Store {

  images = [
'https://pretatrain.com/wp-content/uploads/2023/02/Man-doing-Calisthenics-street-workout.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1drTSBhLPd2QNpGMIWJAtVYPt4M008p8Yuw&s',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6YTlEQgFOqIS8r-AaM_w-8IsiWjttksTHhg&s'
    
  ]

  dailyExercises = [];
  goals = [
    {
      title: "Body Building",
      sub_title: "Full body workout",
      duration_seconds: 2100,
      calories_count: 120,
      cover:
        "https://food-imagescaler.lwprod.nl/imageScaled/?site=vytal-whitelabel-prod&group=4&file=b24-het-verhaal-achter-bodybuilding-zcsxumsx.jpg&w=1300&h=700&cropped=1",
    },
    {
      title: "Siberian Fitness",
      sub_title: "Power training",
      duration_seconds: 1500,
      calories_count: 100,
      cover:
        "https://runners.com.ua/wp-content/uploads/2021/12/pravila-povedeniya-v-sportzale-800x533.jpg",
    },
    {
      title: "Workout",
      sub_title: "Training on street",
      duration_seconds: 1500,
      calories_count: 200,
      cover:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-5ZpzaxtAC-ZNXDf4LXrpkJvnqjPPoawpA&s",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  fetchDailyExercises = async () => {
    try {
      const API_KEY = "fcaMpRDV6V/0fp3ZQ8zRxg==ZcAifztjPuYIh1y9";

      const response = await fetch(
        "https://api.api-ninjas.com/v1/exercises?muscle=chest",
        {
          headers: {
            "X-Api-Key": API_KEY,
          },
        }
      );
      const data = await response.json();

      runInAction(() => {
        this.dailyExercises = data.map((exercise) => ({
          name: exercise.name,
          duration: 5,
          calories: Math.floor(Math.random() * 200),
        }));
      });
    } catch (error) {
      console.error("Failed to fetch exercises", error);
    }
  };
}

export const store = new Store();
