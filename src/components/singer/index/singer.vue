<template>
  <div>
    <div class="top-text-button">
      <van-icon name="arrow-left" size="1.5rem" class="top-text-button-icon-left-white" @click="back"/>
      <van-icon name="arrow-left" size="1.5rem" class="top-text-button-icon-left-black" @click="back"/>
      <span class="top-text-singer-name">{{ singer.name }}</span>
    </div>
    <div id="singer-profile-picture-box">
      <img :src="singer.profilePicture" id="singer-profile-picture"/>
    </div>
    <div id="singer-detail-and-song">
      <div id="singer-name">
        <div id="top-singer-name-and-follow-button">
          <span id="singer-name-span">{{ singer.name }}</span>
          <div id="follow-button">
            <span id="follow-span">+ 关注</span>
          </div>
        </div>
        <div id="certified-info">
          <div id="certified-red-dot">
            <span id="v-span"><strong>V</strong></span>
          </div>
          <span id="certification-span-top">入驻艺人</span>
        </div>
        <span id="fans-quantity">0 关注&nbsp;&nbsp;{{ singer.fansQuantity }} 粉丝</span>
        <div id="singer-name-other-button">
          <div class="singer-name-other-button-item">
            <van-icon name="smile-o" size="1rem" color="#8f8f8f" class="singer-name-other-button-icon"/>
            <span class="singer-name-other-button-span">扑通小组</span>
          </div>
          <div class="singer-name-other-button-item">
            <van-icon name="cart-circle-o" size="1rem" color="#8f8f8f" class="singer-name-other-button-icon"/>
            <span class="singer-name-other-button-span">周边商品</span>
          </div>
        </div>
      </div>
      <div id="nav-and-other-list">
        <div id="nav">
          <a href="javascript:void(0)" :class="navNum === 0? 'nav-a-checked-left': 'nav-a-left'" @click="changeNavNum(0)">百科</a>
          <a href="javascript:void(0)" :class="navNum === 1? 'nav-a-checked-center': 'nav-a-center'" @click="changeNavNum(1)">歌曲</a>
          <a href="javascript:void(0)" :class="navNum === 2? 'nav-a-checked-center': 'nav-a-center'" @click="changeNavNum(2)">专辑</a>
          <a href="javascript:void(0)" :class="navNum === 3? 'nav-a-checked-right': 'nav-a-right'" @click="changeNavNum(3)">视频</a>
        </div>
        <div id="song-list-and-search-box" v-if="navNum === 1">
          <div id="search-box">
            <van-search shape="round" placeholder="搜索此音乐人演唱的歌曲" style="width: 95%; margin: 0 auto;"/>
          </div>
          <div id="play-and-sort-button">
            <div id="play-and-sort-button-left" @click="playAll">
              <van-icon name="play-circle"  size="1.7rem" color="#8f8f8f"/>
              <span id="play-all-span">全部播放</span>
            </div>
            <div id="play-and-sort-button-right">
              <span id="hot-span">热门</span>
              <van-icon name="descending" size="1rem" color="#8f8f8f"/>
            </div>
          </div>
          <div id="song-list">
            <div class="song-item" v-for="song in singer.songList" :key="song.id" @click="checkSong(song)">
              <div class="song-info">
                <span :class="store.state.currentSong.id === song.id?'song-item-name-check': 'song-item-name'">{{ song.name }}</span>
                <span :class="store.state.currentSong.id === song.id?'song-item-singer-name-check': 'song-item-singer-name'">{{ song.author }} - {{ song.album }}</span>
              </div>
              <div class="song-item-right">
                <van-icon name="video" size="1.5rem" color="#8f8f8f"/>
                <van-icon name="ellipsis" size="1.5rem" color="#8f8f8f" style="margin-left: 10px"/>
              </div>
            </div>
          </div>
        </div>
        <div id="pedia-box" v-if="navNum === 0">
          <div id="singer-introduction">
            <div id="introduction-span-and-more-button">
              <span id="introduction-span">简介</span>
              <span id="more-span">更多 ></span>
            </div>
            <span id="certification-span">认证信息：{{ singer.name }}</span>
            <span id="introduction-content">{{ singer.detail }}</span>
          </div>
          <div id="split-box"></div>
          <div id="feature-box">
            <div id="feature-title">
              <span id="feature-span"><strong>精选歌曲</strong></span>
              <div id="play-button" @click="playRecommendSong">
                <van-icon name="play" size="1rem" color="#FFF" id="play-icon"/>
                <span id="play-span">播放</span>
              </div>
              <span id="feature-more-span">更多 ></span>
            </div>
            <div id="feature-song-list">
              <div class="three-feature-box" v-for="(songThree, index) in recommendSongList" :key="index">
                <div class="feature-song-item" v-for="song in songThree" :key="song.id" @click="checkSong(song)">
                  <div class="song-profile-picture-box">
                    <img :src="song.mediaProfilePictureImg" width="60" />
                  </div>
                  <div class="feature-song-name-and-album-name-box">
                    <span :class="store.state.currentSong.id === song.id?'feature-song-name-check': 'feature-song-name'">{{ song.name }}</span>
                    <span :class="store.state.currentSong.id === song.id?'feature-song-name-and-album-name-check': 'feature-song-name-and-album-name'">{{ song.author + ' - ' + song.album }}</span>
                  </div>
                  <van-icon name="video" color="#8f8f8f" size="1.5rem" class="feature-song-mv-button"/>
                </div>
              </div>
            </div>
          </div>
          <div id="split-box"></div>
          <div id="feature-video-list">
            <div id="feature-title">
              <span id="feature-span"><strong>精选视频</strong></span>
              <span id="feature-more-span">更多 ></span>
            </div>
            <div class="feature-video-list-box">
              <div class="feature-video-item">
                <div class="feature-video-video-item">
                  <div class="feature-video-play-quantity-and-time-box">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">15.4万</span>
                    <span class="play-time">03:32</span>
                  </div>
                </div>
                <span class="feature-video-video-button-span">明天，双人舞</span>
              </div>
              <div class="feature-video-item">
                <div class="feature-video-video-item">
                  <div class="feature-video-play-quantity-and-time-box">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">15.4万</span>
                    <span class="play-time">03:32</span>
                  </div>
                </div>
                <span class="feature-video-video-button-span">明天，双人舞</span>
              </div>
              <div class="feature-video-item">
                <div class="feature-video-video-item">
                  <div class="feature-video-play-quantity-and-time-box">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">15.4万</span>
                    <span class="play-time">03:32</span>
                  </div>
                </div>
                <span class="feature-video-video-button-span">明天，双人舞</span>
              </div>
              <div class="feature-video-item">
                <div class="feature-video-video-item">
                  <div class="feature-video-play-quantity-and-time-box">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">15.4万</span>
                    <span class="play-time">03:32</span>
                  </div>
                </div>
                <span class="feature-video-video-button-span">明天，双人舞</span>
              </div>
              <div class="feature-video-item">
                <div class="feature-video-video-item">
                  <div class="feature-video-play-quantity-and-time-box">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">15.4万</span>
                    <span class="play-time">03:32</span>
                  </div>
                </div>
                <span class="feature-video-video-button-span">明天，双人舞</span>
              </div>
            </div>
          </div>
          <div id="split-box"></div>
          <div id="achievement-box">
            <div id="feature-title">
              <span id="feature-span"><strong>艺人成就</strong></span>
              <span id="feature-more-span">更多 ></span>
            </div>
            <div id="achievement-list">
              <div class="achievement-item">
                <div class="achievement-profile-picture">
                  <img src="/img/203fb80e7bec54e721194d3abe389b504fc26a18.jfif" width="50"/>
                </div>
                <div class="achievement-title-and-detail">
                  <span class="achievement-title">第31届金曲奖</span>
                  <span class="achievement-detail">最佳国语女歌手奖（提名）</span>
                </div>
              </div>
              <div class="achievement-item">
                <div class="achievement-profile-picture">
                  <img src="/img/203fb80e7bec54e721194d3abe389b504fc26a18.jfif" width="50"/>
                </div>
                <div class="achievement-title-and-detail">
                  <span class="achievement-title">第31届金曲奖</span>
                  <span class="achievement-detail">最佳国语女歌手奖（提名）</span>
                </div>
              </div>
              <div class="achievement-item">
                <div class="achievement-profile-picture">
                  <img src="/img/203fb80e7bec54e721194d3abe389b504fc26a18.jfif" width="50"/>
                </div>
                <div class="achievement-title-and-detail">
                  <span class="achievement-title">第31届金曲奖</span>
                  <span class="achievement-detail">最佳国语女歌手奖（提名）</span>
                </div>
              </div>
            </div>
          </div>
          <div id="split-box"></div>
        </div>
        <div v-if="navNum === 2" id="album-box">
          <div id="album-box-top-button">
            <span id="option-span">筛选</span>
            <van-icon name="descending" size="1rem" color="#8f8f8f"/>
          </div>
          <div id="album-list-box">
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
            <div class="album-item">
              <div class="cd-box"></div>
              <div class="album-profile-picture-box">
                <img src="/img/manleng-album.png" width="60"/>
              </div>
              <div class="album-info">
                <span class="album-name">我好吗？- 太阳照常升起</span>
                <span class="album-publish-time-and-song-quantity">2019-05-06&nbsp;&nbsp;10首</span>
              </div>
              <span class="arrows">></span>
            </div>
          </div>
        </div>
        <div id="singer-video-box" v-if="navNum === 3">
          <div id="singer-video-top-span-and-button">
            <div id="video-play-and-sort-button">
              <div id="play-and-sort-button-left">
                <span id="hot-span">筛选</span>
                <van-icon name="descending" size="1rem" color="#8f8f8f"/>
              </div>
              <div id="play-and-sort-button-right">
                <span id="hot-span">最新</span>
                <van-icon name="descending" size="1rem" color="#8f8f8f"/>
              </div>
            </div>
          </div>
          <div id="singer-video-list">
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
            <div class="singer-video-item-box">
              <div class="video-item">
                <div class="video-play-info-box">
                  <span class="video-publish-time">2022-11-18</span>
                  <div class="play-quantity-and-icon">
                    <van-icon name="play-circle" size="1rem" color="#FFF" class="play-icon"/>
                    <span class="play-quantity-span">10000</span>
                  </div>
                </div>
              </div>
              <div></div>
              <span class="video-introduction">【实力唱将】盘点周王陶为量进入创造的歌曲</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import singerApi from "@/api/singer/singer"
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"
import {useStore} from "vuex";
import pubSub from "pubsub-js";
export default {
  name: "singer",
  setup() {
    let navNum = ref(1)
    let opacityNum = ref(1)
    let topBackgroundColor = ref()
    let singerNameBoxOpacity = ref(1)
    let topButtonBlackColor = ref()
    let topButtonWhiteColor = ref()
    let singer = ref({})
    let store = useStore()
    let recommendSongList = ref([[]])
    function back() {
      router.go(-1)
    }
    let router = useRouter()
    function changeNavNum(num) {
      navNum.value = num
    }
    onMounted(() => {
      window.addEventListener('scroll', showNavText)
      let scrollTop = window.pageYOffset
      computeColor(scrollTop)
      let route = router.currentRoute.value
      getSinger(route.params.id)
    })

    function computeColor(scrollTop) {
      opacityNum.value = scrollTop / 290 - 0.1
      singerNameBoxOpacity.value = 1.3 - scrollTop / 290
      topBackgroundColor.value = "rgb(255, 255, 255, " + Number(opacityNum.value).toFixed(2) * 100 + "%" + ")"
      topButtonBlackColor.value = "rgb(143, 143, 143, " + Number(opacityNum.value).toFixed(2) * 100 + "%" + ")"
      topButtonWhiteColor.value = "rgb(255, 255, 255, " + (Math.abs(Number(opacityNum.value)).toFixed(2)) * 100 + 500 + "%" + ")"
    }

    function showNavText() {
      let scrollTop = window.pageYOffset
      computeColor(scrollTop)
    }
    const getSinger = (id) => {
      singerApi.get(id).then(
        response => {
          singer.value = response.data
          let count = response.data.songList.length / 3
          for (let i = 1; i < count; i++) {
            recommendSongList.value[i - 1] = []
            recommendSongList.value[i - 1][0] = response.data.songList[i * 3 - 3]
            recommendSongList.value[i - 1][1] = response.data.songList[i * 3 - 2]
            recommendSongList.value[i - 1][2] = response.data.songList[i * 3 - 1]
          }
        }
      )
    }
    const playAll = () => {
      store.commit('changeSongList', singer.value.songList)
      store.commit('changeCurrentSingerName', singer.value.songList[0].name + ' - ' + singer.value.songList[0].author)
      pubSub.publish('changeCurrentSongSrcPubSub', singer.value.songList[0])
      pubSub.publish('computeDuration', true)
      pubSub.publish('playOrStop', true)
    }
    const checkSong = (song) => {
      pubSub.publish('playOrStop', false)
      store.commit('changeCurrentSingerName', song.name + ' - ' + song.author)
      store.commit('CHANGE_CURRENT_SONG', song)
      pubSub.publish('changeCurrentSongSrcPubSub', song)
      store.getters.currentMainColor
    }
    const playRecommendSong = async () => {
      let array = []
      for (let i = 0; i < recommendSongList.value.length; i++) {
        for (let j = 0; j < recommendSongList.value[i].length; j++) {
          array.push(recommendSongList.value[i][j])
        }
      }
      store.commit('changeSongList', array)
      pubSub.publish('playOrStop', false)
      pubSub.publish('changeCurrentSongSrcPubSub', array[0])
      store.commit('changeCurrentSingerName', array[0].name + ' - ' + array[0].author)
      store.commit('CHANGE_CURRENT_SONG', array[0])
      store.getters.currentMainColor
    }
    return {
      router,
      navNum,
      opacityNum,
      singerNameBoxOpacity,
      topBackgroundColor,
      topButtonBlackColor,
      singer,
      store,
      recommendSongList,
      playRecommendSong,
      checkSong,
      playAll,
      changeNavNum,
      back,
      showNavText,
      topButtonWhiteColor
    }
  }
}
</script>

<style scoped>
  .top-text-button{
    width: 100%;
    position: fixed;
    margin: 0 auto;
    text-align: center;
    z-index: 9999;
    padding: 20px 0;
    float: left;
    background: v-bind('topBackgroundColor');
  }
  .top-text-button-icon-left-white{
    float: left;
    margin-left: 15px;
    color: v-bind('topButtonWhiteColor');
    position: absolute;
    left: 0;
  }
  .top-text-button-icon-left-black{
    float: left;
    margin-left: 15px;
    color: v-bind('topButtonBlackColor');
    position: absolute;
    left: 0;
  }
  #singer-profile-picture-box{
    width: 100%;
  }
  #singer-profile-picture{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  #singer-detail-and-song{
    width: 100%;
    background-color: #FFF;
  }
  #singer-name{
    background-color: #FFF;
    display: inline-block;
    width: 90vw;
    border-radius: 15px;
    box-shadow: 0px 17px 22px -13px rgba(0,0,0,0.1);
    position: relative;
    top: -90px;
    margin-left: 5vw;
  }
  #follow-span{
    font-size: 14px;
    color: #FFF;
    line-height: 25px;
    margin-left: 10px;
  }
  #singer-name-span{
    font-size: 24px;
    letter-spacing: 0.9px;
    float: left;
    line-height: 30px;
  }
  #follow-button{
    background-color: black;
    height: 25px;
    width: 60px;
    border-radius: 15px;
    float: right;
    margin-top: 2.5px;
    margin-right: 20px;
  }
  #top-singer-name-and-follow-button{
    height: 30px;
    padding-top: 20px;
    margin-left: 20px;
  }
  #fans-quantity{
    font-size: 12px;
    color: #8f8f8f;
    margin-left: 20px;
  }
  #nav{
    width: 88%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .nav-a-checked-center, .nav-a-center, .nav-a-checked-left, .nav-a-left, .nav-a-checked-right, .nav-a-right{
    text-decoration: none;
  }
  .nav-a-center, .nav-a-left, .nav-a-right{
    color: #8f8f8f;
  }
  .nav-a-checked-center, .nav-a-checked-left, .nav-a-checked-right{
    color: #000;
  }
  .nav-a-checked-left, .nav-a-left{
    float: left;
  }
  .nav-a-checked-right, .nav-a-right{
    float: right;
  }
  .nav-a-checked-center, .nav-a-center{
    /*margin-left: 21%;*/
  }
  #search-box{
    /*position: relative;*/
    /*top: -70px;*/
  }
  #play-and-sort-button{
    /*position: relative;*/
    /*top: -70px;*/
    height: 27px;
    width: 90%;
    margin: 0 auto;
  }
  #play-all-span{
    margin-left: 5px;
  }
  #play-and-sort-button-right{
    float: right;
    height: 27px;
    display: flex;
    align-items: center;
  }
  #play-and-sort-button-left{
    height: 27px;
    display: flex;
    align-items: center;
    float: left;
  }
  #hot-span{
    font-size: 14px;
    color: #8f8f8f;
  }
  #song-list{
    width: 88%;
    margin: 0 auto;
    /*position: relative;*/
    /*top: -70px;*/
  }
  .song-item-name{
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .song-item-right{
    display: flex;
    align-items: center;
    align-content: space-between;
  }
  .song-item-singer-name{
    font-size: 12px;
    color: #8f8f8f;
    display: block;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .song-item-singer-name-check{
    font-size: 12px;
    display: block;
    color: #ff0039;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .song-item{
    width: 100%;
    height: 50px;
    margin: 10px 0;
    display: flex;
    align-content: space-between;
    align-items: center;
    justify-content: space-between;
  }
  .top-text-singer-name{
    color: #8f8f8f;
    line-height: 24px;
    margin-left: 40px;
  }
  .top-text-singer-name{
    opacity: v-bind('opacityNum');
    float: left;
  }
  #singer-name{
    opacity: v-bind('singerNameBoxOpacity');
  }
  #introduction-span{
    float: left;
    line-height: 20px;
  }
  #singer-introduction{
    width: 88%;
    margin: 0 auto;
  }
  #more-span{
    font-size: 12px;
    color: #8f8f8f;
    float: right;
    line-height: 20px;
  }
  #introduction-span-and-more-button{
    display: block;
    height: 20px;
    margin-bottom: 5px;
  }
  #pedia-box{
/*    position: relative;
    top: -50px;*/
    width: 100vw
  }
  #certification-span{
    font-size: 12px;
    color: #8f8f8f;
    display: block;
    margin: 5px auto;
  }
  #introduction-content{
    display: -webkit-box;
    line-height: 20px;
    width: 100%;
    font-size: 12px;
    color: #8f8f8f;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  #split-box{
    width: 100%;
    height: 10px;
    background: #f2f2f2;
    margin: 15px auto;
  }
  #feature-title{
    height: 25px;
    width: 88%;
    margin: 0 auto;
  }
  #play-button{
    height: 25px;
    width: 60px;
    background: #8f8f8f;
    border-radius: 20px;
    display: inline-block;
    float: left;
    margin-left: 10px;
  }
  #play-span{
    color: #FFF;
    font-size: 12px;
    float: left;
    line-height: 25px;
    display: inline-block;
  }
  #play-icon{
    float: left;
    line-height: 25px;
    margin-left: 7px;
    display: inline-block;
  }
  #feature-span{
    float: left;
    line-height: 25px;
    display: inline-block;
  }
  #feature-more-span{
    float: right;
    font-size: 12px;
    line-height: 25px;
    color: #8f8f8f;
  }
  .song-profile-picture-box{
    width: 60px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
    display: inline-block;
    float: left;
  }
  #feature-song-list{
    width: 100%;
    margin: 0 auto;
    white-space: nowrap;
    overflow-y: auto;
  }
  #feature-song-list::-webkit-scrollbar{
    display: none;
  }
  .feature-song-item{
    height: 60px;
    width: 95%;
    margin: 10px 0;
    margin-left: 6%;
    display: flex;
    align-content: space-between;
    align-items: center;
    justify-content: space-between;
  }
  .feature-song-name{
    display: block;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .feature-song-name-check{
    display: block;
    color: #ff0039;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .feature-song-name-and-album-name{
    display: block;
    color: #8f8f8f;
    font-size: 12px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .feature-song-name-and-album-name-check{
    display: block;
    color: #ff0039;
    font-size: 12px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .feature-song-name-and-album-name-box{
    height: 60%;
    width: 69%;
    display: flex;
    align-items: center;
    align-content: space-between;
    flex-wrap: wrap;
  }
  .feature-song-mv-button{
    position: relative;
    right: 5px;
  }
  .feature-video-video-item{
    height: 230px;
    width: 170px;
    background-color: #8f8f8f;
    border-radius: 10px;
    overflow: hidden;
  }
  .play-quantity-span, .play-time{
    color: #FFF;
    font-size: 12px;
    line-height: 16px;
  }
  .play-icon{
    float: left;
  }
  .play-time{
    float: right;
  }
  .play-quantity-span{
    float: left;
    margin-left: 3px;
  }
  .feature-video-play-quantity-and-time-box{
    width: 94%;
    margin: 0 auto;
    height: 16px;
    position: relative;
    top: 91%;
  }
  .feature-video-list-box{
    width: 100%;
    margin: 10px auto;
    white-space: nowrap;
    overflow-y: auto;
  }
  .feature-video-list-box::-webkit-scrollbar{
    display: none;
  }
  .feature-video-video-button-span{
    font-size: 10px;
    display: block;
    margin: 5px 2px;
  }
  .feature-video-item{
    display: inline-block;
    margin-right: 8px;
  }
  .feature-video-item:first-child{
    margin-left: 6%;
  }
  .feature-video-item:last-child{
    margin-right: 6%;
  }
  .achievement-profile-picture{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  #achievement-list{
    width: 88%;
    margin: 0 auto;
  }
  .achievement-title{
    font-size: 14px;
    display: block;
  }
  .achievement-detail{
    color: #8f8f8f;
    font-size: 12px;
    display: block;
  }
  .achievement-item{
    height: 50px;
    margin: 15px auto;
    display: flex;
    align-items: center;
    align-content: space-between;
  }
  .achievement-title-and-detail{
    display: inline;
    margin-left: 2vw;
  }
  #certified-info{
    display: flex;
    align-items: center;
    height: 15px;
    margin-left: 20px;
    margin-bottom: 5px;
    margin-top: 5px;

  }
  #certified-red-dot{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    text-align: center;
    display: inline-block;
    line-height: 15px;
  }
  #v-span{
    color: #FFF;
    font-size: 12px;
  }
  #certification-span-top{
    font-size: 12px;
    color: #8f8f8f;
    display: inline-block;
    margin: 5px auto;
    margin-left: 2px;
  }
  .singer-name-other-button-item{
    height: 20px;
    width: 70px;
    border: 1.3px solid #8f8f8f;
    border-radius: 20px;
    display: flex;
    align-items: center;
    float: left;
    margin-right: 8px;
  }
  .singer-name-other-button-span{
    font-size: 12px;
    line-height: 20px;
  }
  .singer-name-other-button-icon{
    line-height: 20px;
    font-weight: bolder;
    margin-left: 1.5px;
  }
  #singer-name-other-button{
    margin-left: 20px;
    margin-top: 7px;
  }
  #album-box{
    /*position: relative;*/
    /*top: -50px;*/
    width: 88%;
    margin: 0 auto;
  }
  #album-box-top-button{
    display: flex;
    align-items: center;
    width: 100vw;
  }
  #option-span{
    font-size: 14px;
    color: #8f8f8f;
  }
  .album-profile-picture-box{
    height: 60px;
    width: 60px;
    border-radius: 10px;
    overflow: hidden;
    display: inline-block;
    position: relative;
    left: -50px;
  }
  .cd-box{
    width: 50px;
    height: 50px;
    background-color: #eaeaea;
    border-radius: 50%;
    display: inline-block;
    float: left;
    position: relative;
    left: 20px;
    top: 5px;
  }
  .album-item{
    height: 60px;
    margin: 10px auto;
  }
  .album-info{
    height: 40px;
    display: inline-block;
    position: relative;
    bottom: 12px;
    left: -35px;
  }
  .album-name{
    display: block;
    height: 20px;
    line-height: 20px;
  }
  .album-publish-time-and-song-quantity{
    font-size: 12px;
    color: #8f8f8f;
    display: inline-block;
  }
  .arrows{
    float: right;
    line-height: 60px;
    color: #8f8f8f;
  }
  .video-item{
    height: 110px;
    width: 100%;
    background-color: #8f8f8f;
    border-radius: 10px;
  }
  .video-publish-time{
    font-size: 12px;
    color: #FFF;
  }
  .play-quantity-and-icon{
    float: right;
  }
  .video-play-info-box{
    width: 94%;
    margin: 0 auto;
    height: 16px;
    line-height: 16px;
    position: relative;
    top: 91px;
  }
  .video-introduction{
    font-size: 12px;
    display: inline-block;
    width: 98%;
    margin: 10px auto;
  }
  #singer-video-list{
    width: 90%;
    margin: 0 auto;
    position: relative;
    top: -50px;
  }
  .singer-video-item-box{
    float: left;
    width: 48%;
    margin: 0 1%;
  }
  #video-play-and-sort-button{
    position: relative;
    top: -50px;
    height: 27px;
    width: 88%;
    margin: 0 auto;
  }
  #singer-detail-and-song{
    display: inline-block;
    width: 100vw;
  }
  #song-list-and-search-box{
  }
  .song-item-name-check{
    display: block;
    color: #ff0039;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .three-feature-box{
    display: inline-block;
    width: 90%;
  }
  .three-feature-box:last-child{
    margin-right: 6%;
  }
  #nav-and-other-list{
    display: inline-block;
    margin-top: -80px;
    width: 100vw;
  }
  .song-info{
    width: 80%;
    height: 78%;
    display: flex;
    align-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
