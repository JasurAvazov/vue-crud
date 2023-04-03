<script setup>
import downBtn from "../assets/down.svg"
</script>

<script>
export default {
    name: 'Intro',
    methods: {},
}
</script>

<template>
    <section class="intro">
        <div class="container">
            <h1 class="intro-title">Quotes</h1>
            <ul class="intro__ul">
                <li @click="this.$router.push('/create')"
                    class="intro__ul-li create-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Create</h3>
                        <p class="intro__acc-text">Create new quote</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li @click="this.$router.push('/quotes/find')"
                    class="intro__ul-li read-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Read</h3>
                        <p class="intro__acc-text">Read one with id</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li @click="this.$router.push('/read/random')"
                    class="intro__ul-li read-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Read</h3>
                        <p class="intro__acc-text">Read one random quote</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li @click="this.$router.push('/readall')"
                    class="intro__ul-li  read-all-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Read All</h3>
                        <p class="intro__acc-text">Read all quotes with filter</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li @click="this.$router.push('/update')"
                    class="intro__ul-li  update-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Update</h3>
                        <p class="intro__acc-text">Update one quote with id</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li @click="this.$router.push('/delete')"
                    class="intro__ul-li delete-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Delete</h3>
                        <p class="intro__acc-text">Delete one quote with id</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss">
.intro {
    padding: 20px 0px 50px;

    &-title {
        font-size: 24px;
        color: black;
        margin-bottom: 20px;
    }

    &__ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;

        &-li {
            display: flex;
            flex-direction: column;
            border-radius: 8px;

            &>div {
                padding: 10px 50px 10px 10px;
            }
        }
    }

    .create-acc {
        background-color: rgba(0, 128, 0, .1);
        border: 1px solid rgba(0, 128, 0, .6);

        .intro__acc-title {
            background-color: rgba(0, 128, 0, .6);
        }
    }

    .read-acc,
    .random-acc {
        background-color: rgba(0, 102, 255, 0.1);
        border: 1px solid rgba(0, 102, 255, 0.6);

        .intro__acc-title {
            background-color: rgba(0, 102, 255, 0.6);
        }
    }

    .read-all-acc {
        background-color: rgba(0, 0, 255, 0.1);
        border: 1px solid rgba(0, 0, 255, 0.6);

        .intro__acc-title {
            background-color: rgba(0, 0, 255, 0.6);
        }
    }

    .update-acc {
        background-color: rgba(255, 196, 2, 0.1);
        border: 1px solid rgba(255, 196, 2, 0.8);

        .intro__acc-title {
            background-color: rgba(255, 196, 2, 1);
        }
    }

    .delete-acc {
        background-color: rgba(180, 0, 0, 0.1);
        border: 1px solid rgba(180, 0, 0, 0.6);

        .intro__acc-title {
            background-color: rgba(180, 0, 0, 0.6);
        }
    }

    &__acc {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        cursor: pointer;

        &-title {
            font-size: 20px;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
        }

        &-text {
            font-size: 20px;
        }

        &-img {
            position: absolute;
            top: calc(50% + 2px);
            transform: translateY(-50%);
            right: 10px;
            width: 25px;
        }
    }
}
</style>

<style lang="scss" scoped>
.intro {
    &__ul-li {
        cursor: pointer;
    }
}
</style>