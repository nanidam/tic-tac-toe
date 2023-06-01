<script setup lang="ts">
import { ref, watch } from "vue";
import { numbers } from "../data/getNum";
import { winningCombinations } from "../data/winningCombinations";
import { useGameStore } from "../stores/gameStore";
import { IGameInfo } from "../models/IGameInfo";

const store = useGameStore();
const winner = ref<string>("");

const cellClick = (number: number): void => {
  if (store.isGameOver || store.cellValues[number]) return;

  store.cellValues[number] = store.isO ? "O" : "X";
  store.isO = !store.isO; // Toggle between O & X

  checkWin(store.cellValues);
  checkDraw(store.cellValues);

  const gameInfo: IGameInfo = {
    game: store.cellValues,
    playerO: store.playerOInput,
    playerX: store.playerXInput,
    winsO: store.playerOWins,
    winsX: store.playerXWins,
    isGameOver: store.isGameOver,
  };

  // Save the game info to local storage
  const gameInfoJSON: string = JSON.stringify(gameInfo);
  localStorage.setItem("gameInfo", gameInfoJSON);
};

const checkWin = (cellValues: string[]): void => {
  for (const combination of winningCombinations) {
    const [cellA, cellB, cellC] = combination;

    // Check if the current combination is a winning combination
    if (
      cellValues[cellA] &&
      cellValues[cellA] === cellValues[cellB] &&
      cellValues[cellB] === cellValues[cellC]
    ) {
      // Set the winner value based on the current player
      winner.value = store.isO ? store.playerXInput : store.playerOInput;
      store.isO ? (store.playerXWins += 1) : (store.playerOWins += 1);
      store.isGameOver = true;

      // Clear the game data from local storage
      const gameInfoJSON: string | null = localStorage.getItem("gameInfo");
      if (gameInfoJSON) {
        const gameInfo: IGameInfo = JSON.parse(gameInfoJSON);
        gameInfo.game = [];

        const newGameInfoJSON: string = JSON.stringify(gameInfo);
        localStorage.setItem("gameInfo", newGameInfoJSON);
      }

      return;
    }
  }
};

const checkDraw = (cellValues: string[]): void => {
  // If all cells are filled and no winner
  if (cellValues.filter(Boolean).length === numbers.length && !winner.value) {
    winner.value = "Draw";
    store.isGameOver = true;
  }
};

const closeWinnerBox = (): void => {
  winner.value = "";
};

const resetGrid = (): void => {
  store.cellValues = [];
  store.isGameOver = false;
  winner.value = "";
};

// Watch for changes in the resetGrid
watch(
  () => store.resetGrid,
  (newValue) => {
    if (newValue) {
      resetGrid();
      store.resetGrid = false;
    }
  }
);
</script>

<template>
  <div class="cell-wrapper">
    <div
      v-for="number in numbers"
      :key="number"
      :id="`cell-${number}`"
      class="cell"
      @click="cellClick(number)"
      :class="{ disabled: store.isGameOver || store.cellValues[number] }"
    >
      {{ store.cellValues[number] }}
    </div>
    <div v-if="winner !== ''" class="winner-wrapper">
      <div class="winner-container">
        <p class="winner-text">
          {{ winner === "Draw" ? `Oh no, it's a draw!` : `${winner} wins!` }}
        </p>
        <button @click="closeWinnerBox" class="resetGameBtn">Close</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.cell-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;

  .cell {
    flex: 0 0 calc(33.33% - 20px);
    margin: 8px;
    color: white;
    background-color: #5a62ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
    width: 200px;
    height: 200px;

    &:hover {
      background-color: #3b41d1;
    }

    &.disabled {
      pointer-events: none;
      cursor: default;
      background-color: #535bf2bb;
    }
  }

  .winner-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .winner-container {
    background-color: rgb(48, 48, 48);
    border: 3px solid rgb(99, 42, 255);
    padding: 40px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .winner-text {
      font-size: 4rem;
      font-family: "DM Sans", sans-serif;
      font-weight: bold;
      color: white;
      margin: 40px;
    }

    .resetGameBtn {
      padding: 8px 16px;
      margin: 10px;
      color: white;
      font-family: "DM Sans", sans-serif;
      background-color: #5a62ff;
      border-radius: 7px;
      font-size: 1.5rem;
      width: 50%;
      height: 55px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #3b41d1;
      }
    }
  }
}
</style>
