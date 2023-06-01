<script setup lang="ts">
import StartGame from "./components/StartGame.vue";
import GameView from "./components/GameView.vue";
import { useGameStore } from "./stores/gameStore";
import { IGameInfo } from "./models/IGameInfo";
import { onMounted } from "vue";

const store = useGameStore();
onMounted(() => {
  const gameInfoJSON: string | null = localStorage.getItem("gameInfo");

  // Check if gameInfoJSON exists
  if (gameInfoJSON) {
    const gameInfo: IGameInfo = JSON.parse(gameInfoJSON);

    // Check if player names are not empty
    if (gameInfo.playerO.length && gameInfo.playerX.length) {
      store.showStartPage = false;
      store.playerOInput = gameInfo.playerO;
      store.playerXInput = gameInfo.playerX;

      // Check if win counts are defined
      if (gameInfo.winsO !== undefined && gameInfo.winsX !== undefined) {
        store.playerOWins = gameInfo.winsO;
        store.playerXWins = gameInfo.winsX;
      }

      // Check if game data exists
      if (gameInfo.game) {
        if (gameInfo.game.length) {
          gameInfo.game.forEach((cell: string, i: number) => {
            // Assign cell value to store if it is not null
            cell !== null ? (store.cellValues[i] = cell) : null;
          });
        }
      }

      // Restore the player turn based store.cellValues
      store.isO = store.cellValues.filter(Boolean).length % 2 === 0;
    }
  }
});
</script>

<template>
  <header class="title-wrapper">
    <h1 class="title">Tic-Tac-Toe</h1>
    <img
      class="svg"
      src="./assets/tic-tac-toe-white.svg"
      alt="Tic-tac-toe with X's and O's"
    />
  </header>
  <div class="game">
    <StartGame v-if="store.showStartPage"></StartGame>
    <GameView v-else></GameView>
  </div>
</template>

<style scoped lang="scss">
.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    margin-bottom: 50px;
    font-family: "Kranky";
    font-style: normal;
    font-weight: 400;
    font-size: 7rem;
    line-height: 162px;
    color: white;
  }

  .svg {
    margin-left: 30px;
    margin-top: 20px;
    width: 10%;
  }
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
