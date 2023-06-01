<script setup lang="ts">
import GridField from "./GridField.vue";
import NavigationBtns from "./NavigationBtns.vue";
import VersusBar from "./VersusBar.vue";
import WhosTurn from "./WhosTurn.vue";
import HighscoreTable from "./HighscoreTable.vue";
</script>

<template>
  <section class="wrapper">
    <article class="grid-wrapper">
      <GridField></GridField>
    </article>
    <div>
      <VersusBar></VersusBar>
      <WhosTurn></WhosTurn>
      <NavigationBtns></NavigationBtns>
    </div>
  </section>
  <HighscoreTable></HighscoreTable>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;

  .grid-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    height: auto;
  }
}
</style>
