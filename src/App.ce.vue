<!-- @format -->

<template>
  <!-- 币种详情页评级卡片 -->
  <div class="coin-grade-container flex-col" :class="{ loading }">
    <cssLoading class="flex-col" :loading="loading" center>
      <div class="lavel-bg" :class="lavelColor"></div>
      <template v-if="!loading">
        <div class="base-info flex">
          <div class="info-name flex1 flex">
            <div class="coin-img">
              <img :src="coinDetail.imgUrl" />
            </div>
            <div class="coin-name flex1">{{ tokenName }}</div>
          </div>
          <a href="https://tokeninsight-support.gitbook.io/support/methodologies/rating/token-rating" target="_blank" class="rating-link"> Rating Methodology </a>
        </div>
        <div v-if="ratingDetails && ratingDetails.ratingReport" class="level-box flex-col">
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
            <nuxt-link v-if="ratingDetails && ratingDetails.ratingReport" :to="`en/research/reports/${ratingDetails.ratingReport}`">
              <span class="report flex"><img src="@/assets/images/research.svg" alt="" srcset="" />Rating report</span>
            </nuxt-link>
          </div>
          <div class="reprot-right flex-col">
            <span class="review-time flex">Last Rating Review:{{ ratingDetails && ratingDetails.lastRatingReview }}</span>
          </div>
        </div>
      </template>
    </cssLoading>
  </div>
</template>

<script setup lang="ts">
// import { getCaptcha } from '@/api'
import cssLoading from '@/components/cssLoading.ce.vue'
import { ref, onMounted, computed, reactive } from 'vue'

defineProps(['mode', 'token', 'currency'])

let loading = ref(false)
let ratingDetails = reactive({
  abbreviate: 'BTC',
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
let coinDetail = reactive({
  abbreviate: 'BTC',
  changeOned: '-0.0115051900',
  cid: 2365,
  currentPrice: '20119.384345860915',
  imgUrl: 'https://image.tokeninsight.com/content/imgUrl/opengraph.png?x-oss-process=image/resize,l_160',
  name: 'Bitcoin',
  updateDate: '2022-11-07 00:00:08',
})

let tokenName = computed(() => `${coinDetail.name} (${coinDetail.abbreviate}) Rating`)
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
</script>

<style lang="scss" scoped>
.coin-grade-container {
  min-height: 165px;
  margin-bottom: 30px;
  box-sizing: border-box;
  padding: 16px;
  position: relative;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 11px;
  overflow: hidden;
  justify-content: space-between;
  &.loading {
    padding: 0;
  }
  .custorm-loading {
    justify-content: space-between;
  }
  .lavel-bg {
    width: 180px;
    height: 169px;
    position: absolute;
    right: 62px;
    bottom: -31px;
    &.red {
      background: url('~assets/images/ratingnew/rating-d.png') right bottom no-repeat;
      background-size: contain;
    }
    &.orange {
      background: url('~assets/images/ratingnew/rating-c.png') right bottom no-repeat;
      background-size: contain;
    }
    &.teal {
      background: url('~assets/images/ratingnew/rating-b.png') right bottom no-repeat;
      background-size: contain;
    }
    &.green {
      background: url('~assets/images/ratingnew/rating-a.png') right bottom no-repeat;
      background-size: contain;
    }
    &.gray {
      background: url('~assets/images/ratingnew/rating-no.png') right bottom no-repeat;
      background-size: contain;
    }
  }
  .base-info {
    position: relative;
    z-index: 2;
    .info-name {
      justify-content: flex-start;
      align-items: center;
      .coin-img {
        width: 24px;
        height: 24px;
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
        color: #171717;
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

    .rating-link {
      font-style: normal;
      font-size: 12px;
      line-height: 11px;
      color: #1c4eff;
      text-decoration: underline;
      line-height: 24px;
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
      color: #5334ab;
      font-size: 14px;
      align-items: center;
      img {
        width: 14px;
        height: 14px;
      }
    }
    .reprot-left {
      align-items: flex-end;
    }
    .reprot-right {
      align-items: flex-end;
      .review-time {
        color: #9e9e9e;
        font-size: 12px;
      }
      .rating-link {
        text-decoration-line: underline;
        color: #1c4eff;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
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
}
</style>
