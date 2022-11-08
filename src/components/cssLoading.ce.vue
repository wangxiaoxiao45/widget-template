<!-- @format -->

<template>
  <div class="custorm-loading" :style="{ height: typeof height === 'number' && isFinite(height) ? `${height}px` : height }">
    <transition name="fade">
      <div v-if="loading" class="loading-warp flex" :class="{ center: center }">
        <div class="point"></div>
        <div class="point"></div>
        <div class="point"></div>
      </div>
    </transition>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CssLoading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.custorm-loading {
  position: relative;
  .loading-warp {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    padding-top: 30px;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1000;
    .point {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #5334ab;
      margin: 0 6px;
      animation: point linear 1.5s infinite;
      -webkit-animation: point linear 1.5s infinite;
    }
    .point:nth-child(1) {
      animation-delay: 0s;
    }
    .point:nth-child(2) {
      animation-delay: 0.15s;
    }
    .point:nth-child(3) {
      animation-delay: 0.3s;
    }
    &.center {
      align-items: center;
      padding: 0;
    }
  }
}

@keyframes point {
  0%,
  60%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(2.5);
  }
}
@-webkit-keyframes point {
  0%,
  60%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(2.5);
  }
}
</style>
