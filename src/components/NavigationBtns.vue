<script setup lang="ts">
import { ComputedRef, computed, onMounted } from "vue";
import { useGameStore } from "../stores/gameStore";
import QuitGame from "./QuitGame.vue";
import { IGameInfo } from "../models/IGameInfo";

const store = useGameStore();
const gameOver: ComputedRef<boolean> = computed(() => store.isGameOver);

const showHs = (): void => {
  store.showHs = true;
};

const restartGame = (): void => {
  store.resetGrid = true;
  const gameInfoJSON: string | null = localStorage.getItem("gameInfo");

  if (gameInfoJSON) {
    const gameInfo: IGameInfo = JSON.parse(gameInfoJSON);
    gameInfo.game = [];

    const newGameInfoJSON: string = JSON.stringify(gameInfo);
    localStorage.setItem("gameInfo", newGameInfoJSON);
  }
};

onMounted(() => {
  // Check if there is saved game in local storage
  const gameInfoJSON: string | null = localStorage.getItem("gameInfo");

  if (gameInfoJSON) {
    const gameInfo: IGameInfo = JSON.parse(gameInfoJSON);
    store.isGameOver = gameInfo.isGameOver;
  }
});
</script>

<template>
  <div class="btns-wrapper">
    <div v-if="!gameOver" class="game-wrapper">
      <QuitGame class="nav-btn"></QuitGame>
    </div>
    <div v-else class="option-wrapper">
      <button @click="showHs" class="nav-btn">See highscore</button>
      <button @click="restartGame" class="nav-btn">Play again</button>
      <QuitGame class="nav-btn"></QuitGame>
    </div>
  </div>
</template>

<style lang="scss">
.btns-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
  font-family: "DM Sans", sans-serif;

  .option-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .nav-btn {
    height: 60px;
    font-size: 1.6rem;
    padding: 10px;
    width: 100%;
  }
}
</style>
