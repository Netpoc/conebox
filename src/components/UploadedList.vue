<template>
    <v-card>
        <v-list v-for="item in items" :key="item.name">
            <v-list-item>
            <div class="d-flex align-center">
              {{ item.name }} | {{ item.uploading_date }}
                <v-checkbox></v-checkbox>
            </div>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        items: [
            {
                name: 'Trial Balance',
                uploading_date: '22-06-2024',
                company: 'Company A',
            },
            {
                name: 'Trial Balance',
                uploading_date: '12-05-2024',
                company: 'Company B',
            },
            {
                name: 'CoA',
                uploading_date: '18-03-2024',
                company: 'Company A',
            },
        ],
    }),
}
</script>