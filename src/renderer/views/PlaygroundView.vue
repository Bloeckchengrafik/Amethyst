<script setup lang="ts">
import ResizableDiv from "@/components/ResizableDiv";
</script>

<template>
  <div class="w-full h-full flex">
    <ResizableDiv
      name="playground"
      side="right"
      class="min-h-8 min-w-8 max-w-80vw"
      default-size="80em"
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
      inventore repellendus, ratione libero commodi tempore cum repudiandae
      ipsam eligendi adipisci velit delectus pariatur? Modi ratione dolore
      voluptatem vitae tempora quis?
    </ResizableDiv>
  </div>
</template>
