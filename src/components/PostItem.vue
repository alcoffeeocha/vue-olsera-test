<template>
  <p>{{ post.title + " " + post.id }}</p>
</template>

<script>
export default {
  name: "PostItem",
  props: ["post"],
};
</script>
