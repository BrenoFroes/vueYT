import Vue from 'vue'
import Router from 'vue-router'
import GitHubIssues from '@/components/GitHubIssues'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
		path: '/',
		name:'GitHubIssues',
		component: GitHubIssues,
		}
	]
})
