<script setup>
import { ref } from 'vue'

const zipFile = ref(null)
const password = ref('')

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (!zipFile.value) {
    alert('Please select a ZIP file.')
    return
  }

  const formData = new FormData()
  formData.append('zip', zipFile.value)
  formData.append('password', password.value)

  emit('submit', formData)
}
</script>

<template>
  <VCard class="pa-6">
    <h3 class="mb-4">Upload ZIP File</h3>

    <VForm @submit.prevent="handleSubmit">
      <VFileInput
        label="ZIP File"
        accept=".zip"
        @change="zipFile = $event.target.files[0]"
        required
      />

      <VTextField
        label="Password"
        type="password"
        v-model="password"
        required
        class="mt-4"
      />

      <VBtn color="primary" type="submit" class="mt-6">
        Upload
      </VBtn>
    </VForm>
  </VCard>
</template>
