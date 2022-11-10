<!-- @format -->
<template>
  <div class="widget-wrapper">
    <cssLoading :loading="loading" center>
      <div class="coin-grade-container flex-col" :class="subject">
        <div v-if="mode == 'level'" class="lavel-bg" :class="lavelColor"></div>
        <template v-if="!loading">
          <div class="base-info flex">
            <div class="info-name flex1 flex" @click="handleCoinClick">
              <div class="coin-img">
                <img :src="ratingDetails.imgUrl" />
              </div>
              <div class="coin-name flex1">{{ tokenName }}{{ $t('rating') }}</div>
            </div>
            <div v-if="mode == 'level'" class="coin-price flex-col">
              <div class="price">{{ priceFormat(ratingDetails.currentPrice) }}</div>
              <span class="price-change" :class="Number(ratingDetails.changeOned) > 0 ? 'green' : 'red'">{{ percentageFormat(ratingDetails.changeOned) }}</span>
            </div>
          </div>
          <div v-if="mode == 'score'" class="rating-info flex">
            <div class="price-info">
              <div class="price-num">{{ priceFormat(ratingDetails.currentPrice) }}</div>
              <div class="change-num">
                <span :class="Number(ratingDetails.changeOned) > 0 ? 'green' : 'red'">{{ percentageFormat(ratingDetails.changeOned) }}</span>
              </div>
            </div>
            <div class="score flex" :class="lavelColor">{{ ratingScoreFormat(ratingDetails.totalScore) }}</div>
          </div>
          <div v-if="ratingDetails && ratingDetails.ratingReport && mode == 'level'" class="level-box flex-col">
            <div class="level-center flex-col" :class="{ unrated: levelName === 'Unrated' }">
              <span class="level" :class="lavelColor">{{ levelName }}</span>
              <span class="lookValue" :class="lavelColor">{{ ratingDetails.outlook }}</span>
            </div>
          </div>
          <div class="about-report flex">
            <div class="reprot-left flex">
              <div v-if="!ratingDetails || !ratingDetails.ratingReport" class="level-box flex-col">
                <div class="level-center flex-col" :class="{ unrated: levelName === 'Unrated' }">
                  <span class="level" :class="lavelColor">{{ levelName }}</span>
                  <span class="lookValue" :class="lavelColor">{{ (ratingDetails && ratingDetails.outlook) || 'Outlook' }}</span>
                </div>
              </div>
              <a
                :href="
                  mode == 'level'
                    ? `https://tokeninsight.com/${language}/research/reports/${ratingDetails.ratingReport}`
                    : `https://tokeninsight.com/${language}/coins/${ratingDetails.tid}/rating`
                "
                target="__blank"
              >
                <span class="report flex">
                  <template v-if="mode == 'level' && levelName != 'Unrated'">
                    <img v-if="subject == 'white'" src="@/assets/images/research.svg" alt="" />

                    <img v-else src="@/assets/images/research-dark.svg" alt="" />
                    {{ $t('ratingReport') }}
                  </template>
                  <template v-if="mode == 'level' && levelName == 'Unrated'">
                    <a class="explore-more" :href="`https://tokeninsight.com/${language}/cryptocurrencies`" target="__blank"> Explore more Projects’ Ratings</a>
                  </template>
                  <template v-if="mode == 'score'">
                    <img v-if="subject == 'white'" src="@/assets/images/card-score/link.svg" alt="" />

                    <img v-else src="@/assets/images/card-score/link-light.svg" alt="" />
                    Score Breakdown
                  </template>
                </span>
              </a>
            </div>
            <div class="reprot-right">
              <p class="powered-by">
                Powered By
                <img @click="handleTIClick" v-if="subject === 'white'" src="@/assets/images/share-card-logo-light.svg" />
                <img @click="handleTIClick" v-else src="@/assets/images/share-card-logo.svg" />
              </p>
            </div>
          </div>
        </template>
      </div>
    </cssLoading>
  </div>
</template>

<script setup lang="ts">
// import { getCaptcha } from '@/api'
import cssLoading from '@/components/cssLoading.ce.vue'
import { ref, onMounted, computed, reactive } from 'vue'
import currency from 'currency.js'
import i18n from '@/i18n/index'

// subject: 'black' | 'white' | 'purple'
// language: 'en' | 'zh' | 'kr'
// mode: 'level' | 'score'
let props = defineProps({
  mode: {
    type: String,
    default: 'level',
  },
  token: String,
  currency: String,
  subject: {
    type: String,
    default: 'white',
  },
  language: {
    type: String,
    default: 'en',
  },
})
i18n.global.locale = props.language

let loading = ref(false)
let ratingDetails = reactive({
  abbreviate: 'BTC',
  imgUrl: 'https://image.tokeninsight.com/content/imgUrl/opengraph.png?x-oss-process=image/resize,l_160',
  tid: 'bitcoin',
  changeOned: '-0.0115051900',
  currentPrice: '20119.384345860915',
  ecoScore: '64.70',
  lastRatingReview: '2022-11-03 15:03:40',
  name: 'Bitcoin',
  outlook: 'Stable',
  rating: 'AAA',
  ratingReport: 'bitcoin-rating-update-report',
  ratingReportPdf: 'https://image.tokeninsight.com/upload/levelPdf/Bitcoin-Rating-Update-Report.pdf',
  roadmapScore: '94.67',
  teamScore: '77.20',
  tickerScore: '67.20',
  tokenScore: '97.33',
  totalScore: '79.14',
  tsScore: '78.70',
  updateTime: '2022-11-08 00:00:10',
})

let tokenName = computed(() => `${ratingDetails.name} (${ratingDetails.abbreviate}) `)
let levelName = computed(() => {
  if (ratingDetails) return ratingDetails.rating || 'Unrated'
  return 'Unrated'
})
let lavelColor = computed(() => {
  if (ratingDetails) {
    const totalScore = ratingDetails.rating || ratingDetails.level
    if (!totalScore) return 'gray'
    if (totalScore.includes('D')) return 'red'
    if (totalScore.includes('C')) return 'orange'
    if (totalScore.includes('B')) return 'teal'
    if (totalScore.includes('A')) return 'green'
  }
  return 'gray'
})

onMounted(() => {
  // getRatingDetails()
})

// let getRatingDetails= async () {
//       const language = this.$i18n.locale
//       const cid = this.coinDetail.cid
//       const params = {
//         language,
//         cid
//       }
//       try {
//         const res = await this.$request.post(CoinApi.ratingDetails, params)
//         if (res.code === 0) {
//           this.ratingDetails = res.data
//         }
//         this.loading = false
//       } catch (error) {}
//     }

let priceFormat = (value, precision, symbol = '$', zero) => {
  if (!parseFloat(value)) {
    if (zero) {
      return 0
    } else {
      return '-'
    }
  }
  if (value > -0.0000001 && value < 0.0000001) {
    return currency(value, { symbol, precision: precision || 12 }).format()
  }
  if (value <= -0.0000001 && value > -0.001) {
    return currency(value, { symbol, precision: precision || 10 }).format()
  }
  if (value <= -0.001 && value > -1) {
    return currency(value, { symbol, precision: precision || 6 }).format()
  }
  if (value <= -1 && value > -10) {
    return currency(value, { symbol, precision: precision || 4 }).format()
  }
  if (value <= -10) {
    return currency(value, { symbol, precision: precision || 2 }).format()
  }
  if (value >= 0.0000001 && value < 0.001) {
    return currency(value, { symbol, precision: precision || 8 }).format()
  }
  if (value >= 0.001 && value < 1) {
    return currency(value, { symbol, precision: precision || 6 }).format()
  }
  if (value >= 1 && value < 10) {
    return currency(value, { symbol, precision: precision || 4 }).format()
  }
  if (value >= 10) {
    return currency(value, { symbol, precision: precision || 2 }).format()
  }
}

const percentageFormat = (value, zero) => {
  const v = parseFloat(value)
  if (!v) {
    if (zero) {
      return '0%'
    } else {
      return '-'
    }
  }
  const num = (v * 100).toFixed(2)
  const formatNum = () => {
    if (num > 0) return `+${num}`
    return num
  }
  return `${formatNum()}%`
}
const ratingScoreFormat = (value, zero) => {
  const v = parseFloat(value)
  if (!v) {
    if (zero) {
      return '0'
    } else {
      return '-'
    }
  }
  const num = Math.round(v)
  return `${num}`
}

let handleCoinClick = () => {
  window.open(`https://tokeninsight.com/${props.language}/coins/${ratingDetails.tid}/rating`)
}

let handleTIClick = () => {
  window.open(`https://tokeninsight.com/${props.language}/cryptocurrencies`)
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
* {
  margin: 0;
  padding: 0;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.flex-col {
  display: flex;
  flex-direction: column;
}

.flex1 {
  flex: 1;
}
.widget-wrapper {
  height: 165px;
  width: 440px;
}
.coin-grade-container {
  &.white {
    .rating-info {
      .price-num {
        color: #171717;
      }
      .change-num {
        span {
          &.red {
            background: rgba(255, 50, 38, 0.06) !important;
          }
          &.green {
            background: rgba(10, 178, 125, 0.06) !important;
          }
        }
      }
    }

    .price-change {
      &.red {
        background: rgba(255, 50, 38, 0.06) !important;
      }
      &.green {
        background: rgba(10, 178, 125, 0.06) !important;
      }
    }
    .powered-by {
      color: #9e9e9e !important;
    }
    .lavel-bg {
      &.red {
        background: url('@/assets/images/rating-d.png') right bottom no-repeat;
        background-size: contain;
      }
      &.orange {
        background: url('@/assets/images/rating-c.png') right bottom no-repeat;
        background-size: contain;
      }
      &.teal {
        background: url('@/assets/images/rating-b.png') right bottom no-repeat;
        background-size: contain;
      }
      &.green {
        background: url('@/assets/images/rating-a.png') right bottom no-repeat;
        background-size: contain;
      }
      &.gray {
        background: url('@/assets/images/rating-no.png') right bottom no-repeat;
        background-size: contain;
      }
    }
    .coin-name {
      color: #171717 !important;
    }
    .report {
      color: #5334ab !important;
      .explore-more {
        color: #5334ab !important;
      }
    }
    .coin-price {
      .price {
        color: #171717;
      }
    }
  }
  &.black {
    background: #1f2937;
  }
  &.purple {
    background: linear-gradient(70.83deg, #5334ab -9.45%, #8c67f7 96.46%);
  }
  height: 165px;
  width: 440px;

  box-sizing: border-box;
  padding: 16px;
  position: relative;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 11px;
  overflow: hidden;
  justify-content: space-between;
  .coin-price {
    align-items: flex-end;
    justify-content: flex-start;
    position: absolute;
    right: 0px;
    .price {
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
    }
    .price-change {
      font-weight: 400;
      font-size: 12px;
      padding: 0px 4px;
      line-height: 18px;
      height: 18px;
      border-radius: 4px;
      margin-top: 1px;
      box-sizing: border-box;
      &.red {
        color: #e96975;

        background: #fddbd9;
      }
      &.green {
        color: #0ab27d;
        background: #daf8ee;
      }
    }
  }
  &.loading {
    padding: 0;
  }
  .custorm-loading {
    justify-content: space-between;
  }
  .lavel-bg {
    width: 136px;
    height: 148px;
    position: absolute;
    right: 38px;
    bottom: -37px;
    &.red {
      background: url('@/assets/images/rating-d-dark.png') right bottom no-repeat;
      background-size: contain;
    }
    &.orange {
      background: url('@/assets/images/rating-c-dark.png') right bottom no-repeat;
      background-size: contain;
    }
    &.teal {
      background: url('@/assets/images/rating-b-dark.png') right bottom no-repeat;
      background-size: contain;
    }
    &.green {
      background: url('@/assets/images/rating-a-dark.png') right bottom no-repeat;
      background-size: contain;
    }
    &.gray {
      background: url('@/assets/images/rating-no-dark.png') right bottom no-repeat;
      background-size: contain;
    }
  }
  .base-info {
    position: relative;
    z-index: 2;
    .info-name {
      justify-content: flex-start;

      cursor: pointer;
      .coin-img {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border: 0;
          border-radius: 50%;
        }
      }
      .coin-name {
        color: #fff;
        font-size: 14px;
        line-height: 24px;
        padding: 0 65px 0 6px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .about-report {
    line-height: 1;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    line-height: 1;
    align-items: flex-end;
    .report {
      color: white;
      font-size: 14px;
      align-items: center;
      font-weight: 500;
      img {
        width: 14px;
        height: 14px;
      }
      .explore-more {
        color: white;
        font-weight: 500;
        font-size: 14px;
        text-decoration-line: underline;
      }
    }
    .reprot-left {
      align-items: flex-end;
    }
    .reprot-right {
      align-items: flex-end;
      .powered-by {
        color: rgba(255, 255, 255, 0.6);
        font-size: 12px;
        line-height: 14px;
        img {
          vertical-align: bottom;
          height: 14px;
          cursor: pointer;
        }
      }
    }
  }
  .level-box {
    justify-content: flex-end;
    align-items: flex-start;
    .level-center {
      padding: 0 10px;
      position: relative;
      text-align: center;
      justify-content: space-between;
      height: 64px;
      margin-top: -5px;
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        background: #ececec;
        position: absolute;
        left: 0;
        top: 42px;
      }
      .level {
        font-weight: 600;
        font-size: 34px;
        line-height: 38px;
      }
      .lookValue {
        font-size: 14px;
        line-height: 16px;
      }
      .level,
      .lookValue {
        &.red {
          color: #f8685f;
        }
        &.orange {
          color: #ee974d;
        }
        &.teal {
          color: #4db6b8;
        }
        &.green {
          color: #33ba3c;
        }
        &.gray {
          color: #9e9e9e;
        }
      }
      &.unrated {
        height: auto;
        &::after,
        .lookValue {
          display: none;
        }
      }
    }
  }
  .rating-info {
    align-items: center;
    padding-right: 51px;
    margin-top: -10px;
    .price-num {
      font-weight: 600;
      font-size: 28px;
      line-height: 36px;
      color: #fff;
    }
    .change-num {
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        border-radius: 6px;
        padding: 2px 6px;
        &.red {
          color: #e96975;
          background: #fddbd9;
        }
        &.green {
          color: #0ab27d;
          background: #daf8ee;
        }
      }
    }
    .score {
      width: 84px;
      height: 84px;
      position: relative;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 26px;
      font-weight: 600;
      line-height: 30px;
      &::after {
        content: '';
        width: 84px;
        height: 84px;
        position: absolute;
        left: 16px;
        top: 0;
      }
      &::before {
        content: '';
        width: 120px;
        height: 84px;
        position: absolute;
        left: 16px;
        top: 0;
      }
      &.red {
        background: url('@/assets/images/card-score/red.svg') no-repeat center center;
        background-size: contain;
        &::after {
          background: url('@/assets/images/card-score/red-gaid.svg') no-repeat center center;
          background-size: contain;
        }
        &::before {
          background: url('@/assets/images/card-score/red-ellipse.svg') no-repeat center center;
          background-size: cover;
        }
      }
      &.teal {
        background: url('@/assets/images/card-score/blue.svg') no-repeat center center;
        background-size: contain;
        &::after {
          background: url('@/assets/images/card-score/blue-gaid.svg') no-repeat center center;
          background-size: contain;
        }
        &::before {
          background: url('@/assets/images/card-score/blue-ellipse.svg') no-repeat center center;
          background-size: cover;
        }
      }
      &.orange {
        background: url('@/assets/images/card-score/orange.svg') no-repeat center center;
        background-size: contain;
        &::after {
          background: url('@/assets/images/card-score/orange-gaid.svg') no-repeat center center;
          background-size: contain;
        }
        &::before {
          background: url('@/assets/images/card-score/orange-ellipse.svg') no-repeat center center;
          background-size: cover;
        }
      }
      &.green {
        background: url('@/assets/images/card-score/green.svg') no-repeat center center;
        background-size: contain;
        &::after {
          background: url('@/assets/images/card-score/green-gaid.svg') no-repeat center center;
          background-size: contain;
        }
        &::before {
          background: url('@/assets/images/card-score/green-ellipse.svg') no-repeat center center;
          background-size: cover;
        }
      }
    }
    .level {
      font-weight: 600;
      font-size: 64px;
      line-height: 1;
      &.red {
        color: #f8685f;
      }
      &.orange {
        color: #ee974d;
      }
      &.teal {
        color: #4db6b8;
      }
      &.green {
        color: #33ba3c;
      }
      &.gray {
        color: #9e9e9e;
      }
    }
  }
}
</style>
