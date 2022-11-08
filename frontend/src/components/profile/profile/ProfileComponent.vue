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

const userStore = useUserStore();
const checked = ref(userStore.twoFAEnable);
const show = ref(false);
const modalChangeUsername = ref(false);
const modalChangePicture = ref(false);

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

const errorStore = useErrorStore();
const leaders = ref<Partial<User>[]>([]);
UserService.findLeaders()
  .then((users) => (leaders.value = users))
  .catch((error) => errorStore.setError(error.message));
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
    <div class="infoBox">
      <span class="title">{{ user.title[0] }}</span>
      <br />
      <div class="rank">
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
        v-show="modalChangeUsername"
        :user-id="user.id"
        :input-username="user.username"
        @close="modalChangeUsername = false"
      />
      <ModalChangePictureComponent
        v-show="modalChangePicture"
        @close="modalChangePicture = false"
      />
      <br />
      <span class="text">Wolfsburg, Germany</span>
      <br />
      <span class="friends">{{ userStore.friends.length }} Friends</span>
    </div>

    <img class="banner" alt="banner" src="@/assets/PongKingBanner3D.png" />

    <span v-if="isMe" class="twoFA"
      >2 Factor Authentication
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
  font-size: var(--main-title-font-size);
}
.rank {
  font-size: var(--main-title-font-size);
  color: var(--main-1-color);
}
.onSwitch {
  color: var(--main-2-color);
  margin-top: 10%;
  margin-left: 6%;
  margin-right: 0;
}

.offSwitch {
  color: var(--main-2-color);
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
  border-image: linear-gradient(
      to bottom,
      var(--main-2-color),
      var(--main-1-color),
      var(--main-1-color),
      var(--main-4-color)
    )
    1;
}

.infoBox {
  grid-column: 2 / 3;
}

.parentPicture {
  grid-column: 1 / 2;
}

.twoFA {
  grid-column: 2 / 3;
  margin: 0;
  justify-content: left;
  display: flex;
  font-size: var(--main-text-font-size);
  color: var(--main-3-color);
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
  background-color: var(--main-3-color);
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.6vw;
  width: 1.6vw;
  left: 0.3vw;
  bottom: 0.2vw;
  background-color: var(--main-2-color);
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:checked + .slider {
  background-color: var(--main-1-color);
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
