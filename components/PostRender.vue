<template>
    <div>
        <div v-for="segment in post">
            <div v-if="segment.type == 'HTML'" v-html="segment.data"></div>
            <photo-preview v-if="segment.type == 'PHOTO'" :photo="photos.find(x => x.filename == segment.data)"/>
        </div>
    </div>
</template>
  
<script>
import LocationPreview from '~/components/LocationPreview.vue';
import PhotoPreview from '~/components/PhotoPreview.vue';

export default {
    components: { LocationPreview, PhotoPreview },
    props: {
        markdown: String,
    },
    computed: {
        photos() {
            return this.$store.state.photos;
        },
        post() {
            return this.splitMarkdown(this.parseMarkdown(this.markdown))
        }
    },
    methods: {
        parseMarkdown: function (markdown) {
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
            markdown = markdown.replace(/!\[([^\]]+?)\]\(([^)]+?)\)/g, '<img src="$2" alt="$1">');

            // Parse links
            markdown = markdown.replace(/\[([^\]]+?)\]\(([^)]+?)\)/g, '<a href="$2">$1</a>');

            // Wrap everything in a paragraph tag
            // markdown = `<p>${markdown}</p>`;

            console.log(this.photos.find(x => x.filename === '_MK28844-Pano.jpg'))

            return markdown;
        },
        splitMarkdown(html) {
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
                segments.push({ type, data });

                lastIndex = match.index + match[0].length;
            }

            // Push any remaining HTML segment
            if (lastIndex < html.length) {
                segments.push({ type: "HTML", data: html.slice(lastIndex) });
            }

            return segments;
        },
    }
};
</script>
