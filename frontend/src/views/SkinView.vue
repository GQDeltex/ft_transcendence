<script setup lang="ts">
import SkinShopComponent from '../components/SkinShopComponent.vue';
</script>

<template>
  <div class="header">
    <button class="button">Profile Pictures</button>
    <button class="button button-wide">Maps</button>
    <button class="button">Sounds</button>
  </div>
  <SkinShopComponent
    item-id="shop-item-1"
    item-name="Avatar"
    item-img="/src/assets/sexy-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-2"
    item-name="Sexy Avatar"
    item-img="/src/assets/even-sexier-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-3"
    item-name="Even sexier Avatar"
    item-img="/src/assets/sexiest-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-4"
    item-name="Avatar"
    item-img="/src/assets/sexy-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-5"
    item-name="Sexy Avatar"
    item-img="/src/assets/even-sexier-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-6"
    item-name="Even sexier Avatar"
    item-img="/src/assets/sexiest-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-7"
    item-name="Avatar"
    item-img="/src/assets/sexy-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-8"
    item-name="Sexy Avatar"
    item-img="/src/assets/even-sexier-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-9"
    item-name="Even sexier Avatar"
    item-img="/src/assets/sexiest-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-10"
    item-name="Avatar"
    item-img="/src/assets/sexy-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-11"
    item-name="Sexy Avatar"
    item-img="/src/assets/even-sexier-guy-001-modified.png"
  />
  <SkinShopComponent
    item-id="shop-item-12"
    item-name="Even sexier Avatar"
    item-img="/src/assets/sexiest-guy-001-modified.png"
  />
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
}
.button {
  height: 40px;
  width: 25%;
  text-decoration: none;
  border-radius: 5px;
  color: black;
  background-color: #f8971d;
  padding: 10px;
  margin: 20px;
}
.button-wide {
  width: 40%;
}
</style>
