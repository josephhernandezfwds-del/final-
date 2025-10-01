// Función para enviar datos al servidor mediante una petición POST.
// Esta función se utiliza para crear nuevos recursos en la API, como agregar un nuevo usuario o evento.
// Parámetros:
// - endpoint: La ruta específica del API donde se enviarán los datos (ej. 'usuarios', 'eventos').
// - obj: El objeto de datos a enviar en formato JSON.
// Retorna: Los datos de respuesta del servidor en formato JSON, o undefined si hay error.
async function postData(endpoint, obj) {
    try {
        // Realiza una petición fetch al endpoint especificado en localhost:3001 con método POST.
        // Incluye headers para indicar que el contenido es JSON y convierte el objeto a string JSON.
        const peticion = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        // Convierte la respuesta a JSON y la retorna.
        const data = await peticion.json()
        return data
    } catch (error) {
        // Si ocurre un error (ej. conexión fallida), lo registra en la consola.
        console.error('Error en postData:', error)
    }
}
// Función para eliminar un recurso específico del servidor mediante una petición DELETE.
// Se utiliza para borrar elementos como usuarios o eventos por su ID.
// Parámetros:
// - endpoint: La ruta base del API (ej. 'usuarios', 'eventos').
// - id: El identificador único del recurso a eliminar.
// Retorna: true si la eliminación fue exitosa, false en caso contrario.
async function deleteData(endpoint, id) {
    try {
        // Envía una petición DELETE al endpoint con el ID especificado.
        const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // Verifica si la respuesta fue exitosa (status 200-299).
        if (peticion.ok) {
            return true;
        } else {
            // Registra el error si el status no es OK.
            console.error('Error en deleteData:', peticion.status);
            return false;
        }
    } catch (error) {
        // Maneja errores de conexión o red.
        console.error('Error en deleteData:', error);
        return false;
    }
}
// Función para actualizar parcialmente un recurso existente en el servidor mediante una petición PATCH.
// Se utiliza para modificar campos específicos de usuarios o eventos sin reemplazar todo el objeto.
// Parámetros:
// - endpoint: La ruta base del API (ej. 'usuarios', 'eventos').
// - obj: El objeto con los campos a actualizar en formato JSON.
// - id: El identificador único del recurso a actualizar.
// Retorna: Los datos actualizados del servidor en formato JSON, o undefined si hay error.
async function patchData(endpoint, obj, id) {
    try {
        // Envía una petición PATCH al endpoint con el ID, incluyendo solo los campos a modificar.
        const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        // Convierte la respuesta a JSON y la retorna.
        const data = await peticion.json()
        return data
    } catch (error) {
        // Registra errores en la consola.
        console.error('Error en patchData:', error)
    }
}


 // Función para obtener datos del servidor mediante una petición GET.
 // Se utiliza para recuperar listas o detalles de recursos como usuarios o eventos.
 // Parámetros:
 // - endpoint: La ruta específica del API desde donde se obtendrán los datos (ej. 'usuarios', 'eventos').
 // Retorna: Los datos obtenidos en formato JSON, o undefined si hay error.
 async function fetchData(endpoint) {
     try {
         // Realiza una petición GET al endpoint especificado.
         const peticion = await fetch(`http://localhost:3001/${endpoint}`, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         })
         // Convierte la respuesta a JSON y la retorna.
         const data = await peticion.json()
         // Muestra los datos en consola para depuración.
         console.log(data)
         return data
     } catch (error) {
         // Registra errores en la consola.
         console.error(error)
     }
 }


// Función exportada para obtener la lista de usuarios desde el servidor.
// Es una función específica para el endpoint 'usuarios', con posibilidad de cambiar el endpoint por defecto.
// Parámetros:
// - endpoint: La ruta del API, por defecto 'usuarios'.
// Retorna: La lista de usuarios en formato JSON, o lanza un error si falla.
export async function getUsuarios(endpoint = 'usuarios') {
    try {
       // Realiza una petición GET al endpoint de usuarios.
       const response = await fetch(`http://localhost:3001/${endpoint}`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       });
       // Verifica si la respuesta es exitosa, de lo contrario lanza un error.
       if (!response.ok) throw new Error("Error al obtener usuarios");
       // Convierte la respuesta a JSON y la retorna.
       const respuesta = await response.json();
       return respuesta;
 } catch (error) {
       // Registra el error en la consola.
       console.error(error);
 }
}


// Exporta las funciones CRUD (Create, Read, Update, Delete) para que puedan ser importadas y utilizadas en otros módulos de la aplicación.
// - postData: Para crear recursos.
// - deleteData: Para eliminar recursos.
// - patchData: Para actualizar recursos parcialmente.
// - fetchData: Para obtener recursos.
export { postData, deleteData, patchData,fetchData }
