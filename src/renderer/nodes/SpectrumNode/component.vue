<script setup lang="ts">
import CustomNode from "@/components/nodes/CustomNode.vue";
import { SpectrumAnalyzer } from "@/components/visualizers/SpectrumAnalyzer";
import { AmethystIcon } from "@/icons";
import { AmethystSpectrumNode } from ".";
defineProps<{ node: AmethystSpectrumNode }>();

</script>

<template>
  <CustomNode
    :node="node"
    title="Spectrum analyzer"
    :icon="AmethystIcon"
  >
    <SpectrumAnalyzer
      class="h-76px w-152px"
      :node="node.post"
    />
  </CustomNode>
</template>
