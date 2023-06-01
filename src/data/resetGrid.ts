import { useGameStore } from "../stores/gameStore";

export const resetGlobalGrid = (): void => {
  const store = useGameStore();
  store.cellValues = [];
};
