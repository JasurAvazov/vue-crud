<script setup>
// import { ref, onValue } from "firebase/database";
// import db from "../database/firebaseConfig";
import downBtn from "../assets/down.svg"
</script>

<script>
export default {
  data() {
    return {
      quotes: [],
      genre: 'all',
      author: 'all',
      search: '',
      newArr: [],
    };
  },
  mounted() {
    this.$store.dispatch('getData')
  },
  watch: {
    '$store.state.data': function (newData) {
      this.quotes = newData
    }
  },
  methods: {
    editQuote(id) {
      this.$router.push({ name: "update", params: { id } });
    },
  },
  computed: {
    updatedAuthors() {
      let updated = this.$store.state.dataAuthor
      return updated
    },
    filterGenre() {
      let filtered
      if (this.genre == 'all') { return this.quotes }
      else {
        filtered = this.quotes.filter(el => el.genre == this.genre)
        return filtered
      }
    },
    filterAuthor() {
      let filtered
      if (this.author == 'all') { return this.filterGenre }
      else {
        filtered = this.filterGenre.filter(el => el.author == this.author)
        return filtered
      }
    },
    searched() {
      const searchValue = this.search.toLowerCase().trim();
      return this.filterAuthor.filter(item => {
        return item.text.toLowerCase().includes(searchValue)
      });
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
        <li class="intro__ul-li  read-all-acc">
          <div @click="this.$router.push('/')"
            class="intro__acc">
            <h3 class="intro__acc-title">Read All</h3>
            <p class="intro__acc-text">Read all quotes with filter</p>
            <img class="intro__acc-img"
              :src="downBtn"
              alt=""
              draggable="false">
          </div>
          <div class="intro__all">
            <div class="intro__all-filter">
              <h2 class="filter-title">Filter</h2>
              <div class="filter__list">
                <div class="filter__list-item">
                  <h3>Genre:</h3>
                  <select v-model="this.genre"
                    name="genre"
                    required
                    id="genre">
                    <option value="all"
                      selected>All</option>
                    <option value="Literary">Literary quotes</option>
                    <option value="Philosophical">Philosophical quotes</option>
                    <option value="Historical">Historical quotes</option>
                    <option value="Religious">Religious quotes</option>
                    <option value="Humorous">Humorous quotes</option>
                  </select>
                </div>
                <div class="filter__list-item">
                  <h3>Authors:</h3>
                  <select v-model="this.author"
                    name="author"
                    required
                    id="author">
                    <option value="all"
                      selected>All</option>
                    <option v-for="(item, index) in updatedAuthors"
                      :key="index"
                      :value="item">{{ item }}</option>
                  </select>
                </div>
                <div class="filter__list-item">
                  <h3>Search quote:</h3>
                  <input class="filter__list-search"
                    placeholder="Search"
                    v-model="this.search"
                    type="search">
                </div>
              </div>
            </div>
            <ul v-if="this.searched.length"
              class="all__list">
              <li class="all__list-item"
                v-for="quote in this.searched"
                :key="quote.id">
                <ul>
                  <li>
                    <p>ID:</p>
                    <p> {{ quote.id }}</p>
                  </li>
                  <li>
                    <p>Quote:</p>
                    <p> {{ quote.text }}</p>
                  </li>
                  <li>
                    <p>Author:</p>
                    <p> {{ quote.author }}</p>
                  </li>
                  <li>
                    <p>Genre:</p>
                    <p> {{ quote.genre }}</p>
                  </li>
                  <li>
                    <p>CreatedAt:</p>
                    <p> {{ quote.createdAt }}</p>
                  </li>
                  <li>
                    <p>updatedAt:</p>
                    <p v-if="quote.updatedAt">{{ quote.updatedAt }}</p>
                    <p v-else>Not updated</p>
                  </li>
                </ul>
                <button class="all__list-btn"
                  @click="editQuote(quote.id)">Edit</button>
              </li>
            </ul>
            <ul v-else-if="this.filterAuthor.length"
              class="all__list">
              <li class="all__list-item"
                v-for="quote in this.filterAuthor"
                :key="quote.id">
                <ul>
                  <li>
                    <p>ID:</p>
                    <p> {{ quote.id }}</p>
                  </li>
                  <li>
                    <p>Quote:</p>
                    <p> {{ quote.text }}</p>
                  </li>
                  <li>
                    <p>Author:</p>
                    <p> {{ quote.author }}</p>
                  </li>
                  <li>
                    <p>Genre:</p>
                    <p> {{ quote.genre }}</p>
                  </li>
                  <li>
                    <p>CreatedAt:</p>
                    <p> {{ quote.createdAt }}</p>
                  </li>
                  <li>
                    <p>updatedAt:</p>
                    <p v-if="quote.updatedAt">{{ quote.updatedAt }}</p>
                    <p v-else>Not updated</p>
                  </li>
                </ul>
                <button class="all__list-btn"
                  @click="editQuote(quote.id)">Edit</button>
              </li>
            </ul>


            <div class="empty"
              v-else>Empty</div>
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
  .empty {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3a474d;
    border-radius: 8px;
    color: white;
    margin-top: 16px;
  }

  .read-all-acc {
    .intro__acc {
      border-bottom: 1px solid rgba(0, 0, 255, 0.6);
    }
  }

  &__all {
    &-filter {
      .filter {
        &-title {
          font-size: 24px;
          font-weight: 500;
        }

        &__list {
          margin-top: 12px;
          display: flex;
          gap: 24px;
          flex-wrap: wrap;

          &-item {
            display: flex;
            align-items: center;
            gap: 16px;

            h3 {
              font-weight: 400;
              white-space: nowrap;
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
          }

          &-search {
            min-width: 360px;

            @media (max-width: 768px) {
              min-width: auto
            }
          }
        }
      }
    }

    .all__list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 40px;

      &-item {
        background-color: #3a474d;
        border-radius: 8px;
        padding: 20px;

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
              color: white;

              &:first-child {
                color: #ffffffcb;
              }
            }
          }
        }
      }

      &-btn {
        margin-top: 16px;
        cursor: pointer;
        width: 100%;
        font-weight: 400;
        font-size: 18px;
        text-transform: uppercase;
        height: 42px;
        border: 1px solid #c7c7c7;
        border-radius: 8px;
        background: #f4f3f3;
      }
    }
  }


}
</style>