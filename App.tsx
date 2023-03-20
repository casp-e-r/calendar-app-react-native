import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";

import calculator, { initialState } from "./util/calculator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end"
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  }
});

const Row = ({ children }: any) => (
  <View style={{ flexDirection: "row" }}>{children}</View>
);

const Button = ({ onPress, text, size, theme }: any) => {
  const screen = Dimensions.get("window");
  const buttonWidth = screen.width / 4;

  const styles = StyleSheet.create({
    text: {
      color: "#fff",
      fontSize: 25
    },
    textSecondary: {
      color: "#060606"
    },
    button: {
      backgroundColor: "#333333",
      flex: 1,
      height: Math.floor(buttonWidth - 10),
      alignItems: "center",
      justifyContent: "center",
      // borderRadius: Math.floor(buttonWidth),
      margin: 5
    },
    buttonDouble: {
      width: screen.width / 2 - 10,
      flex: 0,
      alignItems: "flex-start",
      paddingLeft: 40
    },
    buttonSecondary: {
      backgroundColor: "#a6a6a6"
    },
    buttonAccent: {
      backgroundColor: "#f09a36"
    }
  });

  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble as any);
  }

  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary as any);
    textStyles.push(styles.textSecondary as any);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent as any);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};


const App = () => {
  const [state, setState] = useState(initialState);
  console.log(state);


  const handleTap = (type: string, value: any) => {
    setState(state => calculator(type, value, state));
  };

  const backSpace = {
    currentNumber: "",
    clearLastNumber: function () {
      this.currentNumber = this.currentNumber.slice(0, -1);
      setState(state => ({
        ...state,
        currentValue: this.currentNumber.slice(0, -1),
        operator: null,
        previousValue: null
      }));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.value}>
          {parseFloat(state.currentValue).toLocaleString()}
        </Text>
        {/* <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "75%", backgroundColor: "red", }} >
            <Text>ASD</Text>
          </View>
          <View style={{ backgroundColor: "blue", width: "25%" }}>
            <Button
              text="+"
              theme="accent"
              onPress={() => handleTap("operator", "+")}
            />
            <Button
              text="-"
              theme="accent"
              onPress={() => handleTap("operator", "-")}
            />
            <Button
              text="x"
              theme="accent"
              onPress={() => handleTap("operator", "*")}
            />
            <Button
              text="/"
              theme="accent"
              onPress={() => handleTap("operator", "/")}
            />
          </View>

        </View> */}
        <Row>
          
          <Button
            text="C"
            theme="secondary"
            onPress={() => handleTap("clear", null)}
          />
          <Button
            text="+/-"
            theme="secondary"
            onPress={() => handleTap("posneg", null)}
          />
          <Button
            text="%"
            theme="secondary"
            onPress={() => handleTap("percentage", null)}
          />
          <Button
            text="/"
            theme="accent"
            onPress={() => handleTap("operator", "/")}
          />
        </Row>

        <Row>
          <Button text="7" onPress={() => handleTap("number", 7)} />
          <Button text="8" onPress={() => handleTap("number", 8)} />
          <Button text="9" onPress={() => handleTap("number", 9)} />
          <Button
            text="x"
            theme="accent"
            onPress={() => handleTap("operator", "*")}
          />
        </Row>

        <Row>
          <Button text="4" onPress={() => handleTap("number", 4)} />
          <Button text="5" onPress={() => handleTap("number", 5)} />
          <Button text="6" onPress={() => handleTap("number", 6)} />
          <Button
            text="-"
            theme="accent"
            onPress={() => handleTap("operator", "-")}
          />
        </Row>

        <Row>
          <Button text="1" onPress={() => handleTap("number", 1)} />
          <Button text="2" onPress={() => handleTap("number", 2)} />
          <Button text="3" onPress={() => handleTap("number", 3)} />
          <Button
            text="+"
            theme="accent"
            onPress={() => handleTap("operator", "+")}
          />
        </Row>

        <Row>
        <Button
            text="Clear"
            onPress={() => {backSpace.clearLastNumber() }}
          />
          <Button
            text="0"
            onPress={() => handleTap("number", 0)}
          />
          <Button text="." onPress={() => handleTap("number", ".")} />
          <Button
            text="="
            theme="accent"
            onPress={() => handleTap("equal", null)}
          />
        </Row>
      </SafeAreaView>
    </View>
  );
};

export default App;