import { Step } from "../../components/Stepper";
import { createCtx } from "./createCtx";

export const stepperInitialState: Step[] = [
  {
    id: "1",
    name: "Connect",
    description: "wallet and check network",
    href: "",
    status: "current",
  },
  {
    id: "2",
    name: "Checkout",
    description: "quantity and mint",
    href: "",
    status: "upcoming",
  },
  {
    id: "3",
    name: "Review",
    description: "receipt",
    href: "",
    status: "upcoming",
  },
];

type AppState = typeof stepperInitialState;
type Action = { type: "setSteps"; payload: Step[] };

// union structure:
// type Action =
// | { type: 'increment' }
// | { type: 'add'; payload: number }
// | { type: 'minus'; payload: number }
// | { type: 'decrement' }

export function stepperReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "setSteps":
      return action.payload;
    default:
      return state;
  }
}

const [ctx, provider] = createCtx(stepperReducer, stepperInitialState);
export const StepperContext = ctx;
export const StepperProvider = provider;
