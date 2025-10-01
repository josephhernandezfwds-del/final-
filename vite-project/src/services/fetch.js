async function postData(endpoint, obj) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await peticion.json()
        return data
    } catch (error) {
        console.error('Error en postData:', error)
    }
}
async function deleteData(endpoint, id) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (peticion.ok) {
            return true;
        } else {
            console.error('Error en deleteData:', peticion.status);
            return false;
        }
    } catch (error) {
        console.error('Error en deleteData:', error);
        return false;
    }
}
async function patchData(endpoint, obj, id) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await peticion.json()
        return data
    } catch (error) {
        console.error('Error en patchData:', error)
    }
}


async function fetchData(endpoint) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await peticion.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }

}


export async function getUsuarios(endpoint = 'usuarios') {
    try {
       const response = await fetch(`http://localhost:3001/${endpoint}`, {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       });
       if (!response.ok) throw new Error("Error al obtener usuarios");
       const respuesta = await response.json();
       return respuesta;
 } catch (error) {
       console.error(error);    
 }
}


export { postData, deleteData, patchData,fetchData }
