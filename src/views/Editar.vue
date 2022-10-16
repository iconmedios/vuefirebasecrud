<template>
    <div>
        <h1>Editar</h1>
               <p> </p>
    </div>

<br />
<form @submit.prevent="handleSubmit" >
    <input type="text" placeholder="Nombre cliente" v-model="cliente" >
    <button type="submit">EDITAR</button> 
    
    

</form>


</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import {useClienteStore} from '../stores/clientedb'

const clienteStore = useClienteStore()
const route = useRoute()
//console.log(route.params.id);
const handleSubmit =  ()=> {
    //console.log('Editando...');  
 clienteStore.updateCliente(route.params.id, cliente.value)
}
const cliente = ref('')

onMounted( async()=> {
    // se obtiene la informacion del documento
    cliente.value = await clienteStore.leerCliente(route.params.id)
   
})

</script>