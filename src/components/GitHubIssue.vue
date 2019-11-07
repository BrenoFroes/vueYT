<template>
    <div class="container">
        <div v-if="loader.getIssue" class="container" >
            <img src="/static/loading.svg" alt="">
        </div>


        <div v-if="!loader.getIssue && issue.number" class="container">
            <h2>Issue #{{issue.number}}</h2>

            <h4>{{issue.title}}</h4>

            <div class="container">
                {{issue.body}}
            </div>
            <br>
            <a href="javascript:history.go(-1)" class="btn btn-primary">Voltar</a>
        </div>
    </div>   
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'GitHubIssues',

        data(){
            return {
                
                issue:{},
                loader:{
                    getIssue: false,
                }
            }
        },
        created(){
            this.getIssue();
        },
        methods: {
            getIssue(){
                
                this.loader.getIssue = true;
                const url = `https://api.github.com/repos/${this.$route.params.name}/${this.$route.params.repo}/issues/${this.$route.params.issue}`;

                axios.get(url).then((response) =>{
                    this.issue = response.data;
                    
                }).finally(() =>{
                    this.loader.getIssue = false;
                });
                
            },
            
        },
        
    }
</script>
