import { createRouter, createWebHistory } from 'vue-router'

const route = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: () => import('@/views/index/index'),
            children: [
                {
                    path: '',
                    redirect: 'musicBuild',
                    component: () => import('@/components/index/index/index'),
                    children: [
                        // {
                        //     path: 'index',
                        //     component: () => import('@/components/index/recommend/recommend')
                        // },
                        {
                            path: 'musicBuild',
                            component: () => import('@/components/index/musicbuild/musicbuild')
                        }
                    ]
                },
                {
                    path: 'comment',
                    children: [
                        {
                            path: '',
                            component: () => import('@/components/comment/index/comment')
                        },
                        {
                            path: 'detail',
                            component: () => import('@/components/comment/detail/detail')
                        }
                    ]
                },
                {
                    path: 'play',
                    component: () => import('@/components/play/index/play')
                },
                {
                    path: 'singerList',
                    component: () => import('@/components/singerlist/index/singerlist')
                },
                {
                    path: 'singer/:id',
                    component: () => import('@/components/singer/index/singer')
                },
                {
                    path: 'rank',
                    children: [
                        {
                            path: '',
                            component: () => import('@/components/rank/ranklist/ranklist')
                        },
                        {
                            path: 'detail/:rankId/:frequency',
                            component: () => import('@/components/rank/detail/detail')
                        }
                    ]
                },
                {
                    path: 'categorySongList',
                    children: [
                        {
                            path: '',
                            component: () => import('@/components/categorysonglist/categorysonglist')
                        }
                    ]
                },
                {
                    path: 'songListDetail/:id',
                    component: () => import('@/components/songlistdetail/songlistdetail')
                },
                {
                    path: 'search',
                    component: () => import('@/components/search/index/search')
                },
                {
                    path: 'my',
                    component: () => import('@/components/my/index/index')
                },
                {
                    path: 'login',
                    component: () => import('@/components/login/login')
                },
                {
                    path: 'album/:id',
                    component: () => import('@/components/album/album')
                }
            ]
        }
    ]
})

export default route
