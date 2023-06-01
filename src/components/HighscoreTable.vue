<script setup lang="ts">
import { IHighscoreInfo } from "../models/IHighscoreInfo";
import { useGameStore } from "../stores/gameStore";
import { ComputedRef, computed } from "vue";

const store = useGameStore();

const closeHs = (): void => {
  store.showHs = false;
};

//Computed = reactive proprties -> sort most wins first
const sortedPlayers: ComputedRef<IHighscoreInfo[]> = computed(() => {
  const players: IHighscoreInfo[] = [
    { name: store.playerOInput, wins: store.playerOWins },
    { name: store.playerXInput, wins: store.playerXWins },
  ];

  return players.sort((a, b) => b.wins - a.wins);
});
</script>

<template>
  <div v-if="store.showHs" class="hs-bg">
    <div class="hs-wrapper">
      <div class="hs-container">
        <h3 class="hs-title">Highscore</h3>
        <img
          class="trophy-icon"
          src="../assets/trophy-icon.svg"
          alt="A gold trophy on first place on a podium"
        />
      </div>
      <table class="hs-table">
        <thead>
          <tr>
            <th class="hs-header-rank">#</th>
            <th class="hs-header-player">Player</th>
            <th class="hs-header-wins">Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, index) in sortedPlayers"
            :key="player.name"
            class="hs-row"
          >
            <td class="hs-rank">{{ index + 1 }}.</td>
            <td class="hs-player">{{ player.name }}</td>
            <td class="hs-score">{{ player.wins }} wins</td>
          </tr>
        </tbody>
      </table>
      <button @click="closeHs" class="closeHsBtn">Close</button>
    </div>
  </div>
</template>

<style lang="scss">
.hs-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .hs-wrapper {
    background-color: rgb(48, 48, 48);
    border: 2px solid rgba(99, 42, 255, 0.787);
    padding: 40px;
    border-radius: 8px;
    text-align: center;
    width: 30%;

    .hs-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 20px;
      gap: 20px;

      .hs-title {
        color: #fff;
        margin-bottom: 20px;
        font-size: 2rem;
        font-family: "DM Sans", sans-serif;
        text-align: center;
      }

      .trophy-icon {
        width: 20%;
        margin-bottom: 15px;
      }
    }

    .hs-table {
      width: 100%;
      margin-bottom: 20px;
      border-collapse: collapse;

      .hs-header-rank,
      .hs-header-player,
      .hs-header-wins {
        color: #fff;
        font-weight: bold;
        text-align: center;
        font-size: 1.3rem;
        text-decoration: underline 2px rgba(99, 42, 255, 0.787);
        font-family: "DM Sans", sans-serif;
      }

      .hs-rank,
      .hs-player,
      .hs-score {
        background-color: rgb(48, 48, 48);
        font-size: 1.5rem;
        color: #fff;
        font-family: "DM Sans", sans-serif;
      }
    }

    .closeHsBtn {
      margin-top: 20px;
      border: none;
      width: 70%;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 8px 16px;
      background-color: rgba(99, 42, 255, 0.616);
      border-radius: 7px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #3b41d1;
      }
    }
  }
}
</style>
