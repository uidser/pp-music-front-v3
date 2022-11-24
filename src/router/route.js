import { createRouter, createWebHistory } from 'vue-router'

const route = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/index',
            component: () => import('@/views/index/index'),
            children: [
                {
                    path: '',
                    component: () => import('@/components/index/index/index'),
                    children: [
                        {
                            path: '/index',
                            component: () => import('@/components/index/recommend/recommend')
                        },
                        {
                            path: 'musicBuild',
                            component: () => import('@/components/index/musicbuild/musicbuild')
                        },
                        {
                            path: 'my',
                            component: () => import('@/components/my/index/index')
                        },
                    ]
                },
                {
                    path: 'comment',
                    component: () => import('@/components/comment/index/comment'),
                    children: [
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
                    path: 'singer',
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
                            path: 'detail',
                            component: () => import('@/components/rank/detail/detail')
                        }
                    ]
                }
            ]
        }
    ]
})

export default route
