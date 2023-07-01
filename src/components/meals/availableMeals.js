import Classes from "./availableMeals.module.css";
import Card from "../UI/card";
import MealItem from "./mealItem/mealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-order-app-e8c78-default-rtdb.firebaseio.com/meals.json"
      );

      //console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      //console.log(responseData);

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      //console.log(loadedMeals)
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);
  return (
    <section className={Classes.meals}>
      {isloading && !httpError && <p className={Classes.loading}>Loading...</p>}
      {httpError && !isloading && <p className={Classes.error}>{httpError} </p>}
      {!isloading && !httpError && (
        <Card>
          <ul>
            {meals.map((meal) => {
              return (
                <MealItem
                  id={meal.id}
                  key={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                ></MealItem>
              );
            })}
          </ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
