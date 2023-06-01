<script setup lang="ts">
import { ComputedRef, computed } from "vue";
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();

const currentPlayerName: ComputedRef<string> = computed(() =>
  store.isO ? store.playerOInput : store.playerXInput
);
</script>

<template>
  <article class="text-box">
    It's {{ currentPlayerName }}'s <br />
    turn to make a move
  </article>
</template>

<style lang="scss">
.text-box {
  background-color: rgba(255, 255, 255, 0.919);
  color: black;
  height: 150px;
  width: 250px;
  padding: 15px;
  border-radius: 15px;
  font-size: 2rem;
  font-family: "DM Sans", sans-serif;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
