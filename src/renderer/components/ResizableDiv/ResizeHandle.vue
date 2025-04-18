<script lang="ts" setup>
import {type Direction} from ".";
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits<{
  (e: "reset"): void;
  (e: "startResizing"): void;
  (e: "resize", delta: number): void;
  (e: "stopResizing"): void;
}>();

const props = defineProps<{
  direction: Direction;
}>();

const resizing = ref(false);
const offset = ref(0);

function getDefiningMeasure(event: MouseEvent): number {
  return props.direction === "horizontal" ? event.clientY : event.clientX;
}

function onMouseMove(event: MouseEvent) {
  if (!resizing.value) return;
  event.preventDefault();
  const newOffset = getDefiningMeasure(event);
  const delta = newOffset - offset.value;
  emit("resize", delta);
}

function onMouseDown(event: MouseEvent) {
  event.preventDefault();
  resizing.value = true;
  offset.value = getDefiningMeasure(event);
  emit("startResizing");
}

function onMouseUp() {
  resizing.value = false;
  offset.value = 0;
  emit("stopResizing");
}

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
});
onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>

<template>
  <button
    class="flex items-center justify-center p-4px"
    :class="[props.direction === 'horizontal' ? 'handle-horizontal' : 'handle-vertical']"

    @dblclick="emit('reset')"
    @mousedown="onMouseDown"
    @click.stop
  >
    <div 
      class="border-r border-r-surface-500 pointer-events-none"
      :class="[props.direction === 'horizontal' ? 'handle-horizontal-thumb' : 'handle-vertical-thumb']"
    />
  </button>
</template>

<style lang="postcss" scoped>
.handle-horizontal {
  cursor: ns-resize !important;
  width: 100%;
  height: 10px;
}

.handle-horizontal-thumb {
  width: 5em;
  height: 100%;
}

.handle-vertical {
  cursor: ew-resize !important;
  height: 100%;
  width: 10px;
}

.handle-vertical-thumb {
  height: 5em;
  width: 100%;
}
</style>
