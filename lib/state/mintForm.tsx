import { Contract } from "web3-eth-contract";
import { BigNumber } from "@ethersproject/bignumber";
import { ContractReceipt } from "@ethersproject/contracts";
import { createCtx } from "./createCtx";
import * as R from "ramda";

export interface MintForm {
  isOnOptimismChain: boolean;
  contract?: Contract;
  isReadyForStep2: boolean;
  quantity: number;
  pricePerUnit: BigNumber;
  isReadyForStep3: boolean;
  receipt?: ContractReceipt;
}

export const mintFormInitialState: MintForm = {
  isOnOptimismChain: false,
  contract: undefined,
  isReadyForStep2: false,
  quantity: 0,
  pricePerUnit: BigNumber.from("0"),
  isReadyForStep3: false,
  receipt: undefined,
};

type AppState = MintForm;
type Action =
  | { type: "setMintFormState"; payload: MintForm }
  | { type: "stepOneComplete"; payload: boolean }
  | { type: "stepTwoComplete"; payload: boolean }
  | { type: "resetForm" };

const markStepOneComplete = (state: MintForm, payload: boolean): MintForm => {
  return { ...state, isReadyForStep2: payload };
};

const markStepTwoComplete = (state: MintForm, payload: boolean): MintForm => {
  return { ...state, isReadyForStep3: payload };
};

export function mintFormReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "setMintFormState":
      return action.payload;
    case "stepOneComplete":
      return markStepOneComplete(state, action.payload);
    case "stepTwoComplete":
      return markStepTwoComplete(state, action.payload);
    default:
      return state;
  }
}

const [ctx, provider] = createCtx(mintFormReducer, mintFormInitialState);
export const MintFormContext = ctx;
export const MintFormProvider = provider;
