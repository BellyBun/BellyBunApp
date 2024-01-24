import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorageState<T>(
  initialState: T,
  key: string
): [T, (newState: T | ((prevState: T) => T)) => Promise<void>] {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(key);
        if (storedData) {
          setState(JSON.parse(storedData));
          console.log("Stored data:", storedData);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    retrieveData();
  }, [key]);

  const setAsyncStorageState = async (newState: T | ((prevState: T) => T)) => {
    try {
      const valueToStore =
        newState instanceof Function ? newState(state) : newState;
      setState(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
      console.log("Item set:", valueToStore);
    } catch (error) {
      console.error("Error storing data in AsyncStorage:", error);
    }
  };

  return [state, setAsyncStorageState];
}
