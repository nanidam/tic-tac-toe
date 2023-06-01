<script setup lang="ts">
import { resetGlobalGrid } from "../data/resetGrid";
import { IGameInfo } from "../models/IGameInfo";
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

const quitGame = (): void => {
  store.showStartPage = true;
  store.isGameOver = false;
  store.playerOInput = "";
  store.playerXInput = "";
  store.playerOWins = 0;
  store.playerXWins = 0;

  resetGlobalGrid();

  const gameInfoJSON: string | null = localStorage.getItem("gameInfo");

  if (gameInfoJSON) {
    const gameInfo: IGameInfo = JSON.parse(gameInfoJSON);
    gameInfo.game = [];
    gameInfo.playerO = "";
    gameInfo.playerX = "";
    gameInfo.winsO = 0;
    gameInfo.winsX = 0;

    const newGameInfoJSON: string = JSON.stringify(gameInfo);
    localStorage.setItem("gameInfo", newGameInfoJSON);
  }
};
</script>

<template>
  <button @click="quitGame" class="nav-btn">Quit game</button>
</template>

<style></style>
