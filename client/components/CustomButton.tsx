import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function Baby({ children }: PropsWithChildren) {
  return <Button style={styles.button}>{children}</Button>;
}

const styles = StyleSheet.create({
  button: {},
});
