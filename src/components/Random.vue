<script setup>
import db from "../database/firebaseConfig";
import { ref, onValue, child, get } from "firebase/database";
import downBtn from "../assets/down.svg";
</script>

<script>
export default {
    data() {
        return {
            quote: {
                id: "",
                text: "",
                author: "",
                createdAt: "",
                genre: "",
                updatedAt: "",
            },
        }
    },
    methods: {
        async getRandomQuote() {
            const quotesRef = ref(db, "quotes");
            const snapshot = await get(quotesRef)
            const quotesObj = snapshot.val()
            const quotes = Object.values(quotesObj)
            const randomIndex = Math.floor(Math.random() * quotes.length)
            this.quote.id = quotes[randomIndex].id
            this.quote.text = quotes[randomIndex].text
            this.quote.author = quotes[randomIndex].author
            this.quote.genre = quotes[randomIndex].genre
            this.quote.createdAt = quotes[randomIndex].createdAt
            this.quote.updatedAt = quotes[randomIndex].updatedAt
        }
    }
}
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
                <li class="intro__ul-li read-acc">
                    <div @click="this.$router.push('/quotes/find')"
                        class="intro__acc">
                        <h3 class="intro__acc-title">Read</h3>
                        <p class="intro__acc-text">Read one with id</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                </li>
                <li class="intro__ul-li random-acc">
                    <div @click="this.$router.push('/')"
                        class="intro__acc">
                        <h3 class="intro__acc-title">Read</h3>
                        <p class="intro__acc-text">Read one random quote</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                    <div class="intro__read">
                        <button class="intro__read-btn"
                            @click="getRandomQuote">Random Quote</button>
                        <div class="canvas">
                            <div v-if="getRandomQuote">
                                <ul>
                                    <li>
                                        <p>id:</p>
                                        <p>{{ quote.id }}</p>
                                    </li>
                                    <li>
                                        <p>quote:</p>
                                        <p>{{ quote.text }}</p>
                                    </li>
                                    <li>
                                        <p>author:</p>
                                        <p>{{ quote.author }}</p>
                                    </li>
                                    <li>
                                        <p>genre:</p>
                                        <p>{{ quote.genre }}</p>
                                    </li>
                                    <li>
                                        <p>createdAt:</p>
                                        <p>{{ quote.createdAt }}</p>
                                    </li>
                                    <li>
                                        <p>updatedAt:</p>
                                        <p v-if="quote.updatedAt">{{ quote.updatedAt }}</p>
                                        <p v-else>Not updated</p>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                <p class="notfind">Цитата не найдена</p>
                            </div>
                        </div>
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
                <li @click="this.$router.push('/update')"
                    class="intro__ul-li update-acc">
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

<style lang="scss" scoped>
.intro {
    .random-acc {
        .intro__acc {
            border-bottom: 1px solid rgba(0, 102, 255, 0.6);
        }
    }

    &__read {
        &.active {
            display: block;
        }

        .canvas {
            background-color: #3a474d;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;

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

        &-btn {
            margin-top: 20px;
            width: 100%;
            font-weight: 400;
            font-size: 18px;
            text-transform: uppercase;
            height: 42px;
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
</style>
