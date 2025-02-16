<template>
    <section class="footer">
        <p>Footer</p>
    </section>
</template>

<style scoped>
    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #111111;
        min-height: 400px;
        color: #F1F1F1;
    }

    @media(max-width:600px) {
        .footer {
            border-top: 1px solid rgb(61, 61, 61);
        }
    }
</style>