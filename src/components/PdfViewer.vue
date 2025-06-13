<template>
  <div style="text-align: center">
    <canvas ref="canvasRef"></canvas>

    <div style="margin-top: 1rem; display: flex; align-items: center; justify-content: center; gap: 1rem;">
      <button @click="prevPage" :disabled="page <= 1">Previous</button>
      <span>Page {{ page }} of {{ numPages }}</span>
      <button @click="nextPage" :disabled="page >= numPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// // ✅ Import *everything* from one source only
// import * as pdfjsLib from 'pdfjs-dist/build/pdf'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker?url'

// // ✅ Set the correct worker
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker


// ✅ Instead, use the CDN or self-hosted version:
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

// Use official worker from unpkg CDN:
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.js`

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

const canvasRef = ref(null)
const pdfDoc = ref(null)
const page = ref(1)
const numPages = ref(0)

const renderPage = async () => {
  if (!pdfDoc.value) return

  const currentPage = await pdfDoc.value.getPage(page.value)
  const viewport = currentPage.getViewport({ scale: 1.5 })

  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  canvas.width = viewport.width
  canvas.height = viewport.height

  await currentPage.render({
    canvasContext: context,
    viewport
  }).promise
}

const loadPdf = async () => {
  try {
    const loadingTask = pdfjsLib.getDocument(props.url)
    pdfDoc.value = await loadingTask.promise
    numPages.value = pdfDoc.value.numPages
    page.value = 1
    await renderPage()
  } catch (e) {
    console.error('Error loading PDF:', e)
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const nextPage = () => {
  if (page.value < numPages.value) {
    page.value++
  }
}

watch(() => props.url, loadPdf)
watch(page, renderPage)

onMounted(loadPdf)
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
</style>
