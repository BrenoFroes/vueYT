<template>
    <div class="container">
        <h1>Vue.js + Github</h1>
        <p class="lead">
            Página que lista issues de um repositório do Github, usando Vue.js.
        </p>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <input v-model="username"
                        type="text" class="form-control" placeholder="github username">
                    
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <input v-model="repository"
                        type="text" class="form-control" placeholder="github repositório">
                
                </div>
            </div>
            <div class="col-3">
                <div class="form-group">
                <button class="btn btn-success" @click.prevent.stop="getIssues()">GO</button>
                <button class="btn btn-danger" @click.prevent.stop="reset()" >LIMPAR</button>
                </div>
            </div>
        </div>

        <div v-if="response.status === 'error'" class="alert alert-danger">

            {{ response.message }}
        </div>


        <br><br><br>
        <table class="table table-sm table-bordered">
            <thead>
                <tr>
                    <th width="100">Número</th>
                    <th>Título</th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-if="loader.getIssues">
                    <td colspan="2">
                        <img src="/static/loading.svg" alt="">
                    </td>
                </tr>

                <div v-if="showIssues">
                    <tr v-for="issue in issues" :key="issue.number">
                    <td>
                        <router-link :to="{ name: 'GitHubIssue', params: { name: username, repo: repository, issue: issue.number } }">
                            {{issue.number}}
                        </router-link>
                        
                    </td>
                    <td>{{ issue.title }}</td>
                    
                </tr>
                </div>
                
                <tr v-if="noIssues">
                    <td class="text-center" colspan="2">Nenhuma issues encontrada!</td>
                </tr>
            </tbody>
        </table>
    </div>   
</template>
<script>
    import axios from 'axios';
    export default {
        name: 'GitHubIssues',
        data(){
            return {
                username:'',
                repository:'',
                issues: [],
                response: {
                    status: '',
                    message: '',
                },
                loader: {
                    getIssues: false,
                    
                }
            }
        },

        created(){
            this.getLocalData();
        },

        computed: {
            showIssues(){
                return !!this.issues.length && !this.loader.getIssues;
            },
            noIssues(){
                return !this.issues.length && !this.loader.getIssues;
            }
        },

        methods: {
            reset(){
                this.username = "";
                this.repository = "";
                this.issues = "";
                
                
            },
            getIssues(){
                if(this.username && this.repository){
                    localStorage.setItem('gitHubIssues', JSON.stringify({ username: this.username, repository: this.repository}) );

                    this.loader.getIssues = true;

                    const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;

                    axios.get(url).then((response) =>{
                        this.issues = response.data;
                        console.log(response);

                    }).catch((error) => {

                        console.log(error.response.data);
                        this.response.status = 'error'
                        this.response.message = 'Repositório não existe!'

                    }).finally(() => {

                        this.loader.getIssues = false;

                    });
                }
            },

            clearIssue(){
                this.selectedIssue = {

                };
            },

            getLocalData(){
                const localDate = JSON.parse(localStorage.getItem('gitHubIssues'));
                console.log(localDate);

                if( localDate.username && localDate.repository){
                    this.username = localDate.username;
                    this.repository = localDate.repository;
                    this.getIssues();
                }
            }
        },
        
    }
</script>
