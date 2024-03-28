<script setup>

const { post } = defineProps(['post'])

const display = ref(useDisplay());

const photoStore = usePhotoStore();
const locationStore = useLocationStore();

const getLocation = (link) => {
    return "hej";
    return locations.value.find(x => x.link === link) || { title: link };
};

const splitLayout = (input) => {
    if (!input) return [];
    const sections = input.split(/(![A-Z]+\{.+\})|\!END/).filter(Boolean);

    const result = [];
    let currentCommand = null;
    let currentArgs = null;

    sections.forEach(section => {
        if (section.match(/![A-Z]+\{.+\}/)) {
            const args = section.match(/\{(.*)\}/)[1].split(",");
            const command = section.match(/!([A-Z]+)\{/)[1];
            currentCommand = command;
            currentArgs = args;
            result.push({
                type: command,
                args,
                body: "",
            });
        }
        else if (currentCommand) {
            result.find(x => x.type === currentCommand && x.args === currentArgs).body = section;
            currentCommand = null;
        } else if (section !== '\n') {
            result.push({
                type: "MARKDOWN",
                body: section
            });
        }
    });
    return result;
};

</script>

<template>
    <div>
        <h1 class="text-h2">{{ post.title }}</h1>
        <div v-for="content in splitLayout(post.content)" :key="content.type">
            <PostRender v-if="content.type === 'MARKDOWN'" :markdown="content.body" class="mb-2" />
            <TimelineItem v-if="content.type === 'TIMELINE' && !display.smAndDown">
                <template v-slot:icon>
                    <nuxt-link :to="localePath('/locations/' + content.args[0])">
                        <v-icon class="pa-0">mdi-map-marker</v-icon>
                    </nuxt-link>
                </template>
                <template v-slot:date>
                    {{ content.args[1] }}
                </template>
                <template v-slot:content>
                    <h2>
                        {{ locationStore.byName(content.args[0]).title }}
                    </h2>
                    <PostRender :markdown="content.body"></PostRender>
                </template>
            </TimelineItem>
            <TimelineItemSmall v-else-if="content.type === 'TIMELINE' && display.smAndDown">
                <template v-slot:icon>
                    <nuxt-link :to="localePath('/locations/' + content.args[0])">
                        <v-icon class="pa-0" large>mdi-map-marker</v-icon>
                    </nuxt-link>
                </template>
                <template v-slot:content>
                    <h2 class="text-h3">
                        {{ locationStore.byName(content.args[0]).title }}
                    </h2>
                    <PostRender :markdown="content.body"></PostRender>
                </template>
            </TimelineItemSmall>
            <SmallPhotoPreview v-else-if="content.type === 'SPHOTO'" :photo="photoStore.byName(content.args[0])"
                :location="content.args[1]">
                <template v-slot:content>
                    <PostRender :markdown="content.body"></PostRender>
                </template>
            </SmallPhotoPreview>
        </div>
    </div>
</template>

<style></style>