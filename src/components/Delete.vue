<script setup>
import { ref, remove } from "firebase/database";
import db from "../database/firebaseConfig";
import downBtn from "../assets/down.svg"
</script>

<script>
export default {
    data() {
        return {
            id: ''
        };
    },
    methods: {
        async deleteQuote() {
            const quoteRef = ref(db, `quotes/${this.id}`);
            await remove(quoteRef);
            this.$router.push({ name: "readall" });
        },
        openDelete() {
            if (confirm('Do you really want to remove the quote?')) {
                this.deleteQuote();
            }
            this.id = '';
        }
    },
};
</script>

<template>
    <section class="intro">
        <div class=" container">
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
                    class="intro__ul-li random-acc">
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
                    class="intro__ul-li read-all-acc">
                    <div class="intro__acc">
                        <h3 class="intro__acc-title">Read All</h3>
                        <p class="intro__acc-text">Read all quotes with filter</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li class="intro__ul-li update-acc">
                    <div @click="this.$router.push('/update')"
                        class="intro__acc">
                        <h3 class="intro__acc-title">Update</h3>
                        <p class="intro__acc-text">Update one quote with id</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li class="intro__ul-li delete-acc">
                    <div @click="this.$router.push('/')"
                        class="intro__acc">
                        <h3 class="intro__acc-title">Delete</h3>
                        <p class="intro__acc-text">Delete one quote with id</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                    <div class="intro__read">
                        <form @submit.prevent="openDelete"
                            class="intro__read-id">
                            <label for="quoteId">
                                <h3>ID:</h3>
                                <input type="text"
                                    id="quoteId"
                                    v-model="id"
                                    placeholder="ID">
                            </label>
                            <button class="intro__read-btn"
                                type="submit">Delete</button>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.intro {
    &__read {
        &.active {
            display: block;
        }

        .canvas {
            background-color: #3a474d;
            border-radius: 8px;
            padding: 20px;
            margin-top: 10px;

            ul {
                list-style: none;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 10px;

                li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 10px;

                    p {
                        color: #ffffffcb;

                        &:last-child {
                            color: white;
                        }
                    }
                }
            }
        }

        &-id {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-top: 40px;

            label {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
            }

            h3 {
                font-size: 14px;
                width: 50px;
            }

            input {
                height: 36px;
                max-width: 350px;
                width: 100%;
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid #E0E7FF;
                border-radius: 6px;
                padding: 0px 10px;
            }
        }

        &-btn {
            margin-top: 50px;
            width: 100%;
            font-weight: 400;
            font-size: 18px;
            text-transform: uppercase;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #c7c7c7;
            border-radius: 8px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.8);
        }
    }

    .notfind {
        color: white;
    }
}

.delete-acc {
    .intro__acc {
        border-bottom: 1px solid rgba(180, 0, 0, 0.6);
        padding-bottom: 8px;
    }
}
</style>

