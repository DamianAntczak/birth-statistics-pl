<script setup lang="ts">
import hospitals from '../assets/hospitals.json';

const hospitalArray = Object.values(hospitals);

const hospitalSize = hospitalArray.length;

console.log(hospitalArray.length);

console.log(Math.floor(Math.random() * hospitalSize));


</script>
<template>
    <h1>Strona główna</h1>
    <Card style="width: 25rem; overflow: hidden">
        <template #title>Losowy szpital</template>
        <template #footer>
            <Button label="Losuj" />
        </template>
    </Card>
</template>
<style scoped>
</style>