import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("game", () => {
  const playerOInput = ref<string>("");
  const playerXInput = ref<string>("");
  const playerOWins = ref<number>(0);
  const playerXWins = ref<number>(0);

  const showStartPage = ref<boolean>(true);
  const cellValues = ref<string[]>([]);
  const isO = ref<boolean>(true);
  const isGameOver = ref<boolean>(false);
  const showHs = ref<boolean>(false);
  const resetGrid = ref<boolean>(false);

  return {
    playerOInput,
    playerXInput,
    isO,
    isGameOver,
    showStartPage,
    playerOWins,
    playerXWins,
    showHs,
    resetGrid,
    cellValues,
  };
});
