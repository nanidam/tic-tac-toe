<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "../stores/gameStore";
import { IPlayersInfo } from "../models/IPlayersName";

const store = useGameStore();
let invalidInput = ref<boolean>(false);

const startGameBtn = (): void => {
  if (store.playerOInput !== "" && store.playerXInput !== "") {
    store.showStartPage = false;

    const playersInfo: IPlayersInfo = {
      playerO: store.playerOInput,
      playerX: store.playerXInput,
    };

    const gameInfoJSON: string = JSON.stringify(playersInfo);
    localStorage.setItem("gameInfo", gameInfoJSON);
  } else {
    invalidInput.value = true;
  }
};
</script>

<template>
  <section class="game-rules">
    <h3 class="game-intro">How to play:</h3>
    <p class="game-info">
      The game is played on a 3x3 grid with two players; X and O. Player O
      starts the game, and turns alternate between players until the game ends.
      The game ends when either one player successfully places three of their
      symbols in a row, column, or diagonal, or when all cells on the grid are
      filled resulting in a tie. To win, a player must have three of their
      symbols in a row, column, or diagonal alignment. After the game ends,
      players can choose to play again in the same party, and if they do, Player
      X starts the next game.
    </p>
  </section>
  <section class="enter-player-names">
    <h3 class="enter-player-title">Enter your names below:</h3>
    <label for="playerOInput"
      >Player O:
      <input
        v-model="store.playerOInput"
        type="text"
        class="player-input-field"
        placeholder="Enter player O's name"
      />
    </label>
    <label for="playerXInput"
      >Player X:
      <input
        v-model="store.playerXInput"
        type="text"
        class="player-input-field"
        placeholder="Enter player X's name"
        @keyup.enter="startGameBtn"
      />
    </label>
    <p v-if="invalidInput" class="invalid-input">
      * Please enter a name for <span class="underlined-text">both</span> Player
      O and Player X *
    </p>
    <button @click="startGameBtn" class="start-game-btn">Start game!</button>
  </section>
</template>

<style lang="scss">
.game-rules {
  width: 60%;
  font-family: "DM Sans", sans-serif;
  .game-intro {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .game-info {
    font-size: 1.1rem;
    margin: 0;
  }
}

.enter-player-names {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  .player-input-field {
    height: 30px;
    width: 170px;
    margin: 5px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
    background-color: #242424;

    &:focus {
      border-bottom: 2px solid #3b41d1;
      outline: none;
    }
  }

  .invalid-input {
    margin-bottom: 0;

    .underlined-text {
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .start-game-btn {
    width: 200px;
    margin: 20px;
    font-size: 1.3rem;
  }
}
</style>
