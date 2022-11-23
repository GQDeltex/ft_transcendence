<script setup lang="ts">
import { useUserStore } from '@/store/user';
import type { User } from '@/store/user';
import { inject, nextTick, ref, watch } from 'vue';
import Enable2FAComponent from './Enable2FAComponent.vue';
import ModalChangeUsernameComponent from './ModalChangeUsernameComponent.vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import ModalChangePictureComponent from './ModalChangePictureComponent.vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import DropDownComponent from '@/components/globalUse/DropDownComponent.vue';
import { cloneDeep } from 'lodash';
import { useI18n } from 'vue-i18n';
import { languagesDropDownContent } from '@/plugin/i18n';
import { languagesSelection } from '@/plugin/i18n';
import { i18n } from '@/plugin/i18n';

const userStore = useUserStore();
const checked = ref(userStore.twoFAEnable);
const show = ref(false);
const modalChangeUsername = ref(false);
const modalChangePicture = ref(false);
const dropDownTitle = ref(false);
let dropDownContent = ref<string[]>(cloneDeep(userStore.title));

dropDownContent.value[0] = useI18n().t('notitleselection');

const { user, isMe } = inject<{ user: User | null; isMe: boolean }>('user', {
  user: null,
  isMe: false,
});

watch(checked, async (newValue, oldValue) => {
  if (newValue === oldValue) return;

  if (!newValue && oldValue && userStore.twoFAEnable) {
    if (!(await userStore.disable2FA())) {
      await nextTick();
      checked.value = true;
    }
  }

  if (newValue && !oldValue && !userStore.twoFAEnable) {
    show.value = true;
  }
});

const onClose = () => {
  show.value = false;
  if (!userStore.twoFAEnable) {
    checked.value = false;
  }
};

const toggle = () => {
  dropDownTitle.value = !dropDownTitle.value;
};

const errorStore = useErrorStore();
const leaders = ref<Partial<User>[]>([]);
UserService.findLeaders()
  .then((users) => (leaders.value = users))
  .catch((error) => errorStore.setError(error.message));

async function updateTitle(title: string) {
  // console.log('new title selected! ', title);
  if (title == dropDownContent.value[0]) title = '';
  dropDownTitle.value = false;
  try {
    userStore.title = (await UserService.changeTitle(title)).title;
  } catch (error) {
    errorStore.setError((error as Error).message);
    return;
  }
}

const langShowDropDown = ref(false);
function dropDownClicked(selected: string) {
  langShowDropDown.value = false;
  let index = ref<number>(languagesDropDownContent.indexOf(selected));
  i18n.global.locale.value = languagesSelection[index.value];
  localStorage.setItem('language', i18n.global.locale.value);
}
</script>

<template>
  <div v-if="user" class="profile">
    <div class="parentPicture">
      <RoundPictureComponent
        class="picture"
        :picture="user.picture"
        size="10vw"
        border-color="white"
      />

      <img
        v-if="isMe"
        alt="pen"
        class="pen"
        title="Change picture"
        src="@/assets/pen.png"
        @click="modalChangePicture = true"
      />
    </div>
    <div class="infoBox" @mouseleave="dropDownTitle = false">
      <div class="title">
        {{ user.title[0] }}
        <img
          v-if="isMe"
          alt="pen"
          class="pen"
          title="Change picture"
          src="@/assets/pen.png"
          @click="toggle"
        />
      </div>
      <DropDownComponent
        v-if="dropDownTitle"
        :items="dropDownContent"
        width="18vw"
        height="6vw"
        @close="updateTitle"
      />
      <div class="username">
        <span>
          {{ user.username }}
          <span v-if="user.rank && user.rank > 0"
            >({{ useI18n().t('rank') }} {{ user.rank }})
          </span>
        </span>
        <img
          v-if="isMe"
          alt="pen"
          class="pen"
          title="Change username"
          src="@/assets/pen.png"
          @click="modalChangeUsername = true"
        />
      </div>
      <ModalChangeUsernameComponent
        v-if="modalChangeUsername"
        :user-id="user.id"
        :input-username="user.username"
        @close="modalChangeUsername = false"
      />
      <ModalChangePictureComponent
        v-show="modalChangePicture"
        @close="modalChangePicture = false"
      />
      <span class="campus">{{ user.campus }}, {{ user.country }}</span>
      <br />
      <span class="friends">{{
        useI18n().t('friends', user.friends ? user.friends.length : 0)
      }}</span>
    </div>

    <img class="banner" alt="banner" src="@/assets/christmas_banner.png" />

    <div v-if="isMe" class="langSetup" @mouseleave="langShowDropDown = false">
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

    <span v-if="isMe" class="twoFA"
      >{{ useI18n().t('twofa') }}
      <label class="switch">
        <input v-model="checked" type="checkbox" />
        <span class="slider round">
          <p v-if="checked" class="onSwitch">{{ useI18n().t('on') }}</p>
          <p v-else class="offSwitch">{{ useI18n().t('off') }}</p>
        </span>
      </label>
      <Enable2FAComponent v-if="show" @close="onClose" />
    </span>
  </div>
</template>

<style scoped>
.title {
  font-size: 2vw;
  color: white;
}

.onSwitch {
  color: white;
  margin-top: 10%;
  margin-left: 15%;
  margin-right: 0;
}

.offSwitch {
  color: white;
  margin-top: 10%;
  margin-left: 60%;
}

.banner {
  grid-column: 3 / 4;
  grid-row: 1 / 3;
  max-width: 90%;
  max-height: 20vw;
}

.profile {
  display: grid;
  grid-gap: 1%;
  align-items: center;
  padding: 10px 10px 1%;
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #c00000, #c00000, white, gray) 1;
}

.infoBox {
  grid-column: 2 / 3;
}

.parentPicture {
  grid-column: 1 / 2;
  display: flex;
  align-items: baseline;
}

.username {
  color: #c00000;
  font-size: 2vw;
}

.campus {
  color: white;
  font-size: 1.2vw;
}

.friends {
  color: grey;
  font-size: 1.2vw;
}

.twoFA {
  grid-column: 2 / 3;
  margin: 0;
  justify-content: left;
  color: grey;
  font-size: 1vw;
  display: flex;
}

.switch {
  position: relative;
  margin-top: -2%;
  margin-left: 5%;
  width: 4vw;
  height: 2vw;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: grey;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.6vw;
  width: 1.6vw;
  left: 0.3vw;
  bottom: 0.2vw;
  background-color: white;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:checked + .slider {
  background-color: #c00000;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.8vw);
  -ms-transform: translateX(1.8vw);
  transform: translateX(1.8vw);
}

.slider.round {
  border-radius: 25vw;
  white-space: nowrap;
}

.slider.round:before {
  border-radius: 50%;
  white-space: nowrap;
}

.pen {
  height: 1.5vw;
  width: 1.5vw;
  cursor: pointer;
}

.langSetup {
  margin: 1vw;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1vw;
}
</style>
