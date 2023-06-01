<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";

const store = useGameStore();
</script>

<template>
  <article class="players">
    Player O: {{ store.playerOInput }}<br />
    vs. <br />Player X: {{ store.playerXInput }}
  </article>
</template>

<style lang="scss">
.players {
  font-size: 1.7rem;
  padding-bottom: 20px;
  margin-top: 15px;
  font-family: "DM Sans", sans-serif;
  color: white;
}
</style>
