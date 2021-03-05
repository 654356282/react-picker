import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Machine } from "xstate";

// const lightMachine = Machine(
//   {
//     id: "light",
//     initial: "green",
//     context: {
//       elapsed: 0,
//       direction: "east",
//     },
//     states: {
//       green: {},
//       yellow: {},
//       red: {},
//     },
//   },
//   {
//     actions: {
//       alertGreen: (context, event) => {
//         console.log(context);
//         alert("green");
//       },
//     },
//     activities: {},
//     delays: {},
//     guards: {},
//     services: {},
//   }
// );

// const { initialState } = lightMachine;

// const nextState = lightMachine.transition(initialState, "TIMER");
// console.log(nextState.changed);

// const noAlertLightMachine = lightMachine.withConfig({
//   actions: {
//     alertGreen: (context, event) => {
//       console.log("green");
//     },
//   },
// });

// const testLightMachine = lightMachine.withContext({
//   elapsed: 1000,
//   direction: "north",
// });
// const ref = React.createRef()
// console.log(<App />)
// console.log(React.createElement("hehe"))

ReactDOM.render(<App />, document.getElementById("root"));

