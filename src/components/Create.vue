<script setup>
import db from "../database/firebaseConfig";
import { ref, push, set } from "firebase/database";
import downBtn from "../assets/down.svg"
</script>

<script>
export default {
    data() {
        return {
            quote: {
                id: "",
                text: "",
                author: "",
                genre: '',
                createdAt: null,
                updatedAt: null,
            },
        };
    },
    methods: {
        async createQuote() {
            try {
                const quotesRef = ref(db, "quotes");
                const newQuoteRef = push(quotesRef);
                this.quote.id = newQuoteRef.key;
                this.quote.createdAt = new Date().toISOString();
                await set(newQuoteRef, this.quote);
                alert("Quote created successfully!");
                this.quote.id = "";
                this.quote.text = "";
                this.quote.author = "";
                this.quote.genre = "";
                this.quote.createdAt = null;
            } catch (error) {
                console.error("Quote creation error: ", error);
                alert("An error occurred while creating the quote. Please try again.");
            }
        }
    },
};
</script>

<template>
    <section class="intro">
        <div class="container">
            <h1 class="intro-title">Quotes</h1>
            <ul class="intro__ul">
                <li class="intro__ul-li create-acc">
                    <div @click="this.$router.push('/')"
                        class="intro__acc">
                        <h3 class="intro__acc-title">Create</h3>
                        <p class="intro__acc-text">Create new quote</p>
                        <img class="intro__acc-img"
                            :src="downBtn"
                            alt=""
                            draggable="false">
                    </div>
                    <div class="intro__add">
                        <form class="intro__add-form"
                            @submit.prevent="createQuote">
                            <label for="text">
                                <h3>Quote text:</h3>
                                <input type="text"
                                    id="text"
                                    v-model.trim="quote.text"
                                    placeholder="Quote"
                                    required />
                            </label>
                            <label for="author">
                                <h3>Author:</h3>
                                <input type="text"
                                    id="author"
                                    v-model.trim="quote.author"
                                    placeholder="Author"
                                    required />
                            </label>

                            <label for="genre">
                                <h3>Genre:</h3>
                                <select v-model="quote.genre"
                                    name="genre"
                                    required
                                    id="genre">
                                    <option disabled
                                        value=""
                                        selected>-- Choose a quote genre --</option>
                                    <option value="Literary">Literary quotes</option>
                                    <option value="Philosophical">Philosophical quotes</option>
                                    <option value="Historical">Historical quotes</option>
                                    <option value="Religious">Religious quotes</option>
                                    <option value="Humorous">Humorous quotes</option>
                                </select>
                            </label>

                            <button class="intro__add-btn"
                                type="submit">Create</button>
                        </form>
                    </div>
                </li>
                <li @click="this.$router.push('/quotes/find')"
                    class="intro__ul-li  read-acc">
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

<style lang="scss" scoped>
.intro {
    .create-acc {
        .intro__acc {
            border-bottom: 1px solid rgba(0, 128, 0, .6);
        }
    }


    &__add {
        &-btn {
            font-weight: 400;
            font-size: 18px;
            text-transform: uppercase;
            height: 42px;
            border: 1px solid #c7c7c7;
            border-radius: 8px;
            cursor: pointer;
            background: #fffffffc;
        }

        &-form {
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            gap: 16px;

            label {
                display: flex;
                align-items: center;
                gap: 12px;

                h3 {
                    font-size: 14px;
                    width: 110px;
                }

                input,
                select {
                    height: 36px;
                    max-width: 350px;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.8);
                    border: 1px solid #E0E7FF;
                    border-radius: 6px;
                    padding: 0px 10px;
                }

                select {
                    text-align: center;
                }
            }
        }
    }
}
</style>