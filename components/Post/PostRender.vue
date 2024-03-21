<template>
    <div>
      <div v-for="segment in post" :key="segment.type">
        <div v-if="segment.type === 'HTML'" v-html="segment.data"></div>
        <!-- <photo-preview v-else-if="segment.type === 'PHOTO' && getPhoto(segment.data[0])" :photo="getPhoto(segment.data[0])"/> -->
      </div>
    </div>
  </template>
  
  <script setup>
  const {markdown} = defineProps(['markdown'])
      
  const getPhoto = (filename) => {
    return "hej";
    // return photos.value.find(x => x.filename == filename) || false;
  };
  
  const parseMarkdown = (markdown) => {
    // Parse headings
    markdown = markdown.replace(/### (.+?)\n/g, '<h4>$1</h4>');
    markdown = markdown.replace(/## (.+?)\n/g, '<h3>$1</h3>');
    markdown = markdown.replace(/# (.+?)\n/g, '<h2>$1</h2>');
  
    markdown = markdown.replace(/\n/g, ' ');
    markdown = markdown.replace(/\s{2,}/g, '<br>');
  
    // Parse bold and italic
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
    // Parse images
    markdown = markdown.replace(/!\[([^\]]+?)\]\(([^)]+?)\)/g, '<img class="post-img" src="$2" alt="$1">');
  
    // Parse links
    markdown = markdown.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, '<a href="$2">$1</a>');
  
    return markdown;
  };
  
  const splitMarkdown = (html) => {
    const segments = [];
    const customRegex = /!([A-Z]+)\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;
  
    while ((match = customRegex.exec(html)) !== null) {
      // Push HTML segment before the custom tag
      if (lastIndex !== match.index) {
        segments.push({ type: "HTML", data: html.slice(lastIndex, match.index) });
      }
  
      // Push the custom tag
      const [, type, data] = match;
      segments.push({ type, data: data.split("|") });
  
      lastIndex = match.index + match[0].length;
    }
  
    // Push any remaining HTML segment
    if (lastIndex < html.length) {
      segments.push({ type: "HTML", data: html.slice(lastIndex) });
    }
  
    return segments;
  };
  
  const post = computed(() => splitMarkdown(parseMarkdown(markdown)));
  
  </script>
  
  <style>
  .post-img {
    width: 100%;
  }
  </style>
  