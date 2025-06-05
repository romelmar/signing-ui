<!-- src/components/SigningPad.vue -->
<template>
  <div>
    <canvas ref="canvas" class="border rounded" :width="width" :height="height" />
    <div class="mt-2">
      <button @click="clear" class="btn btn-warning">Clear</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  width: { type: Number, default: 400 },
  height: { type: Number, default: 200 }
});

const canvas = ref(null);
let ctx;
let drawing = false;

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  canvas.value.addEventListener('mousedown', startDrawing);
  canvas.value.addEventListener('mouseup', stopDrawing);
  canvas.value.addEventListener('mousemove', draw);
  canvas.value.addEventListener('mouseout', stopDrawing);
});

function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function stopDrawing() {
  drawing = false;
  ctx.closePath();
}

function clear() {
  ctx.clearRect(0, 0, props.width, props.height);
}
</script>

<style scoped>
canvas {
  background: #fff;
  touch-action: none;
}
</style>
