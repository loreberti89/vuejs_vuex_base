<template>
    <div id="loader">
        <div v-bind:class="{ visible: showing, hidden: !showing}" v-if="showing">
            loading ...
            
        </div>
    </div>
</template>
<script>
    export default {
        name: "loading-view",
        /* questo è il classico interceptor per nmostrare il loading fintanto che ci sono richieste pendenti, l'ho fatto manuale perché non c'era nessun riferimento su axios */
        created: function () {


        },
        computed:{

            showing: function(){
                return ((this.$store.getters.logged && !this.$store.getters.token_refreshed) || this.$store.getters.loading)
            }
        }
    }
</script>
