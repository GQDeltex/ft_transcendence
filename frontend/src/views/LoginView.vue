<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { i18n } from '@/plugin/i18n';
import TwoFAInputComponent from '@/components/globalUse/TwoFAInputComponent.vue';
import { useUserStore } from '@/store/user';
import DropDownComponent from '@/components/globalUse/DropDownComponent.vue';
import { ref } from 'vue';
import { languagesDropDownContent } from '@/plugin/i18n';
import { languagesSelection } from '@/plugin/i18n';

const userStore = useUserStore();
const uri = `http://${import.meta.env.VITE_DOMAIN}:8080/42intra/login`;

const login = () => {
  location.href = uri;
};

const langShowDropDown = ref(false);

function dropDownClicked(selected: string) {
  langShowDropDown.value = false;
  let index = ref<number>(languagesDropDownContent.indexOf(selected));
  // console.log('index: ' + index.value);
  // console.log(languagesDropDownContent.indexOf(selected));
  // console.log('return value= ' + languagesSelection[index.value]);
  i18n.global.locale.value = languagesSelection[index.value];
  localStorage.setItem('language', i18n.global.locale.value);
  // console.log('stored= ' + localStorage.getItem('language'));
}
</script>

<template>
  <div class="loginParent">
    <div class="buttons">
      <img alt="page logo" class="logo" src="@/assets/xmas.png" />
      <div class="langSetup">
        {{ useI18n().t('changelanguage') }}
        <img
          alt="pen"
          class="pen"
          title="Change picture"
          src="@/assets/pen.png"
          @click="langShowDropDown = !langShowDropDown"
        />
        <DropDownComponent
          v-if="langShowDropDown"
          :items="languagesDropDownContent"
          width="12vw"
          height="12vw"
          @close="dropDownClicked"
          @mouseleave="langShowDropDown = false"
        />
      </div>
    </div>
    <div class="welcomeText">
      <span class="text"
        >{{ useI18n().t('welcome1') }}
        <p>{{ useI18n().t('welcome2') }}</p>
        <p>{{ useI18n().t('welcome3') }}</p>
      </span>
    </div>
    <div
      v-if="!userStore.isLoggedIn && !userStore.require2FAVerify"
      class="buttons"
    >
      <button class="button" @click="login">
        {{ useI18n().t('loginbutton') }}
      </button>
    </div>
    <TwoFAInputComponent
      v-else-if="!userStore.isLoggedIn && userStore.require2FAVerify"
    />
  </div>
</template>

<style scoped>
.loginParent {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.logo {
  width: 30%;
}

.text {
  text-align: center;
  flex-wrap: wrap;
  color: white;
  font-size: 2vw;
}

.buttons {
  display: flex;
  justify-content: center;
}

.button {
  text-decoration: none;
  border-radius: 20px;
  color: white;
  background-color: #c00000;
  padding: 10px;
  align-content: center;
  cursor: pointer;
  width: min-content;
  align-items: center;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: #c00000;
}

button {
  border-radius: 50%;
  /* border: 2px outset grey; */
  position: relative;
  color: white;
  overflow: hidden;
  border-style: none;

  /* box-shadow: 0 0 10px rgb(0, 0, 0, 1); */

  font-size: 2vw;
  font-weight: bolder;
  text-decoration: none;
  background: #c00000;
  /* text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  transition: 0.3s; */
}

/* button:hover {
  border: 2px outset #ddd;
  color: white;
  background: linear-gradient(160deg, white, #c00000, #c00000, black);
  text-shadow: 0px 0px 4px #202020;
  box-shadow: 0 0 10px #fff, 0 0 40px #fff, 0 0 80px #fff;
  transition-delay: 0.2s;
} */
.welcomeText {
  display: flex;
  flex-direction: row;
}
.langSetup {
  margin: 1vw;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5vw;
}

.pen {
  width: 1.5vw;
  height: 1.5vw;
  cursor: pointer;
}
</style>
