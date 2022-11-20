<script setup lang="ts">
import { useUserStore } from '@/store/user';
import type { User } from '@/store/user';
import { inject, nextTick, ref, watch, type Ref } from 'vue';
import Enable2FAComponent from './Enable2FAComponent.vue';
import ModalChangeUsernameComponent from './ModalChangeUsernameComponent.vue';
import RoundPictureComponent from '@/components/globalUse/RoundPictureComponent.vue';
import ModalChangePictureComponent from './ModalChangePictureComponent.vue';
import UserService from '@/service/UserService';
import { useErrorStore } from '@/store/error';
import DropDownComponent from '@/components/globalUse/DropDownComponent.vue';

const userStore = useUserStore();
const checked = ref(userStore.twoFAEnable);
const show = ref(false);
const modalChangeUsername = ref(false);
const modalChangePicture = ref(false);
const dropDownTitle = ref(false);
let dropDownContent = ref<string[]>([...userStore.title]);

dropDownContent.value[0] = '--- no title ---';

const { user, isMe } = inject<{ user: Ref<User | null>; isMe: Ref<boolean> }>(
  'user',
  {
    user: ref(null),
    isMe: ref(false),
  },
);

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

const updateTitle = async (title: string) => {
  if (title == '--- no title ---') title = '';
  dropDownTitle.value = false;
  try {
    userStore.title = (await UserService.changeTitle(title)).title;
  } catch (error) {
    useErrorStore().setError((error as Error).message);
    return;
  }
};
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
          <span v-if="user.rank && user.rank > 0">(Rank {{ user.rank }}) </span>
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

      <span class="campus">Wolfsburg, Germany</span>
      <br />
      <span class="friends">{{ userStore.friends.length }} Friends</span>
    </div>

    <img class="banner" alt="banner" src="@/assets/christmas_banner.png" />

    <span v-if="isMe" class="twoFA">
      2 Factor Authentication
      <label class="switch">
        <input v-model="checked" type="checkbox" />
        <span class="slider round">
          <p v-if="checked" class="onSwitch">on</p>
          <p v-else class="offSwitch">off</p>
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
}

.slider.round:before {
  border-radius: 50%;
}

.pen {
  height: 1.5vw;
  width: 1.5vw;
  cursor: pointer;
}
</style>
