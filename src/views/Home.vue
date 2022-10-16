<template>
    <div>
        <h1>Home</h1>
        <p>{{userStore.userData?.email}}</p>
        <!-- Si es verdadero carga -->
        <p  v-if="clienteStore.loadingDoc" >Loading docs...</p>
        <ul v-else>  
            <li v-for="item of clienteStore.documents" :key="item.id" >
                {{item.id}} {{item.cliente}} {{item.dominio}} 
                <button @click="clienteStore.deleteCliente(item.id)" >BORRAR</button>
                <button @click="router.push(`/editar/${item.id}`)" >EDITAR</button>
            </li>
         
        </ul>
        
    </div>
<br />
<form @submit.prevent="handleSubmit" >
    <input type="text" placeholder="Nombre cliente" v-model="campocliente">
    <button type="submit">ENVIAR</button> 
    
    

</form>

</template>

<script setup>
import {useUserStore} from '../stores/user'
import {useClienteStore} from '../stores/clientedb'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const clienteStore = useClienteStore()

clienteStore.getClientes()

const campocliente = ref('')

const handleSubmit = () => {
    // validar urls 
    // console.log('formulario');
    clienteStore.addCliente( campocliente.value );
}

</script>