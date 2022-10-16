import { addDoc, collection, getDocs, getDoc, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite'
import {defineStore} from 'pinia';
import { auth, dbCliente } from '../firebaseConfig'
import {nanoid} from 'nanoid';
import router from '../router';
// clientes iconmedios firebase jean@

export const useClienteStore = defineStore( 'clienteStore',{ 

    state: ()=> ({
        
        documents: [],
        loadingDoc: false // precarga
        }),

        actions:{
        // obtener los datos (clientes)
        async getClientes(){
            // evitar que se carguen nuevamente los resultados
            if ( this.documents.length !== 0 ){
                return
            }
        
            this.loadingDoc = true
            try {
                // q Obtener coleccion clientes
                //const q = query(collection(db, 'clientes'))
                const q = query(collection(dbCliente, 'clientes'), 
                //where("user", "==", "NXDAjae0vtehcAKzUIfapPKF72z1")) // comprobar
                // solo traer documentos del usuario logueado
                where("user", "==", auth.currentUser.uid ) 
                ) 
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                //console.log(doc.id, doc.data());
                // generar objeto cliente para llenar documents[] 
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

            } catch (error){
                console.log(error);
            } finally {
        // para manejar un preload
         this.loadingDoc = false
            }
        },
    
        async addCliente( cliente ){
            try {
               const objetoDocCliente = {
                   cliente,
                   short: nanoid(6),
                   user: auth.currentUser.uid
                   
               }
               const docRef = await addDoc(collection(dbCliente, "clientes"), objetoDocCliente );
               // console.log(docRef); 
               this.documents.push(
                   {...objetoDocCliente,
                       id: docRef.id
                    })
            } catch (error) {
               console.log(error);
            } finally { 
   
             }
   
        },
        async leerCliente(id){
            try {
            const docRef = doc(dbCliente, "clientes", id);  
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) {
                throw new Error("No existe el documento")
            }
            if (docSnap.data().user !== auth.currentUser.uid ) {
                throw new Error("Documento denegado")
            }
            return docSnap.data().cliente
                
            } catch  (error) {
                console.log(error.message);
            } finally {

            }
        },

        async updateCliente(id, cliente){
            try {
                const docRef = doc(dbCliente, "clientes", id);  
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    throw new Error("No existe el documento")// si no existe genera un error y detiene la solicitud
                }
                if (docSnap.data().user !== auth.currentUser.uid ) {
                    throw new Error("Documento denegado") // usuario incorrecto
                }
                
                await updateDoc(docRef, {
                    cliente: cliente
                } )
                //actualizar cliente
                this.documents = this.documents.map(item => 
                item.id === id ? ({...item, cliente }) : item)
                // retornar la inicio
                router.push('/')
                
            } catch (error) {
                console.log(error.message  );
            } finally {

            }

        },

        async deleteCliente ( id ) {
            try {
                const docRef = doc(dbCliente, "clientes", id);
                const docSnap = await getDoc(docRef) // obtener el documento unico
                if (!docSnap.exists()) {
                    throw new Error("No existe el documento")// si no existe genera un error y detiene la solicitud
                }
                if (docSnap.data().user !== auth.currentUser.uid ) {
                    throw new Error("Documento denegado") // usuario incorrecto
                }
                await deleteDoc(docRef) // eliminar documento
                this.documents = this.documents.filter(item => item.id !== id ) // quitarlo de la lista

                
            } catch (error) {
                console.log(error.message );
            } finally {

            }
        }
    
    
    
    }
        // guardar clientes
})//userClienteStore

