<script setup>
import { ref, onValue, update } from "firebase/database";
import db from "../database/firebaseConfig";
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
        createdAt: "",
        genre: "",
        updatedAt: "",
      },
    };
  },
  mounted() {
    const quoteId = this.$route.params.id;
    const quoteRef = ref(db, `quotes/${quoteId}`);
    onValue(quoteRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data == null) {
        console.log("null");
        this.$router.push("/")
      }
      this.quote = {
        id: quoteId,
        ...data,
      };
    });

  },
  methods: {
    async updateQuote() {
      try {
        this.quote.updatedAt = new Date().toISOString();
        const quoteRef = ref(db, `quotes/${this.quote.id}`);
        await update(quoteRef, this.quote);
        alert("Quote successfully updated!");
        this.$router.push('/update')
      } catch (error) {
        console.error("Ошибка обновления цитаты: ", error);
        alert("An error occurred while updating the quote. Please try again.");
        this.$router.push('/update')
      }
    },
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
          <div @click="this.$router.push('/')"
            class="intro__acc">
            <h3 class="intro__acc-title">Update</h3>
            <p class="intro__acc-text">Update one quote with id</p>
            <img class="intro__acc-img"
              :src="downBtn"
              alt=""
              draggable="false">
          </div>
          <div class="intro__read">
            <div class="intro__update">
              <form @submit.prevent="updateQuote">
                <div>
                  <label for="text">
                    <h4>Quote:</h4>
                    <input id="text"
                      type="text"
                      v-model="quote.text"
                      required />
                  </label>
                </div>
                <div>
                  <label for="author">
                    <h4>Author:</h4>
                    <input id="author"
                      type="text"
                      v-model="quote.author"
                      required />
                  </label>
                </div>
                <div>
                  <label for="genre">
                    <h4>Genre:</h4>
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
                </div>
                <button type="submit">Save changes</button>
              </form>
            </div>
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
  &__update {
    background-color: #3a474d;
    padding: 0 20px 20px;
    margin-top: 10px;
    border-radius: 8px;

    form {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;

      button {
        margin-top: 30px;
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
        background: white;
      }
    }

    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;

      h4 {
        width: 100px;
        color: white;
      }

      input,
      select {
        height: 36px;
        max-width: 350px;
        width: 100%;
        background: white;
        border: 1px solid #E0E7FF;
        border-radius: 6px;
        padding: 0px 10px;
      }
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

.update-acc {
  .intro__acc {
    border-bottom: 1px solid rgba(255, 196, 2, 0.8);
  }
}</style>