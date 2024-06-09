const empleados = [
    {
        "id":1,
        "puesto": 1,
        "nombre": "Juan",
        "apellido": "Perez",
        "cedula": "1-0123-4567",
        "correoElectronico": "juan.perez@example.com",
        "telefono": "1234567890",
        "direccion": "Calle 1",
        "fechaNacimiento": "1980-01-01",
        "fechaContratacion": "2020-01-01"
    },
    {
        "id": 2,
        "puesto": 2,
        "nombre": "Maria",
        "apellido": "Lopez",
        "cedula": "2-2345-6789",
        "correoElectronico": "maria.lopez@example.com",
        "telefono": "1234567891",
        "direccion": "Calle 2",
        "fechaNacimiento": "1985-02-02",
        "fechaContratacion": "2020-02-01"
    },
    {
        "id": 3,
        "puesto": 3,
        "nombre": "Carlos",
        "apellido": "Gomez",
        "cedula": "3-3456-7890",
        "correoElectronico": "carlos.gomez@example.com",
        "telefono": "1234567892",
        "direccion": "Calle 3",
        "fechaNacimiento": "1990-03-03",
        "fechaContratacion": "2020-03-01"
    },
    {
        "id": 4,
        "puesto": 4,
        "nombre": "Ana",
        "apellido": "Martinez",
        "cedula": "4-4567-8901",
        "correoElectronico": "ana.martinez@example.com",
        "telefono": "1234567893",
        "direccion": "Calle 4",
        "fechaNacimiento": "1995-04-04",
        "fechaContratacion": "2020-04-01"
    },
    {
        "id": 5,
        "puesto": 5,
        "nombre": "Luis",
        "apellido": "Garcia",
        "cedula": "5-5678-9012",
        "correoElectronico": "luis.garcia@example.com",
        "telefono": "1234567894",
        "direccion": "Calle 5",
        "fechaNacimiento": "1980-05-05",
        "fechaContratacion": "2020-05-01"
    },
    {
        "id": 6,
        "puesto": 1,
        "nombre": "Laura",
        "apellido": "Rodriguez",
        "cedula": "1-6789-0123",
        "correoElectronico": "laura.rodriguez@example.com",
        "telefono": "1234567895",
        "direccion": "Calle 6",
        "fechaNacimiento": "1985-06-06",
        "fechaContratacion": "2020-06-01"
    },
    {
        "id": 7,
        "puesto": 3,
        "nombre": "Marta",
        "apellido": "Diaz",
        "cedula": "3-8901-2345",
        "correoElectronico": "marta.diaz@example.com",
        "telefono": "1234567897",
        "direccion": "Calle 8",
        "fechaNacimiento": "1995-08-08",
        "fechaContratacion": "2020-08-01"
    },
    {
        "id": 8,
        "puesto": 4,
        "nombre": "Pedro",
        "apellido": "Morales",
        "cedula": "4-9012-3456",
        "correoElectronico": "pedro.morales@example.com",
        "telefono": "1234567898",
        "direccion": "Calle 9",
        "fechaNacimiento": "1980-09-09",
        "fechaContratacion": "2020-09-01"
    },
    {
        "id": 9,
        "puesto": 5,
        "nombre": "Sofia",
        "apellido": "Alvarez",
        "cedula": "5-0123-4567",
        "correoElectronico": "sofia.alvarez@example.com",
        "telefono": "1234567899",
        "direccion": "Calle 10",
        "fechaNacimiento": "1985-10-10",
        "fechaContratacion": "2020-10-01"
    },
    {
        "id": 10,
        "puesto": 1,
        "nombre": "Diego",
        "apellido": "Gutierrez",
        "cedula": "1-1234-5678",
        "correoElectronico": "diego.gutierrez@example.com",
        "telefono": "1234567800",
        "direccion": "Calle 11",
        "fechaNacimiento": "1990-11-11",
        "fechaContratacion": "2020-11-01"
    },
    {
        "id": 11,
        "puesto": 2,
        "nombre": "Elena",
        "apellido": "Mendoza",
        "cedula": "2-2345-6789",
        "correoElectronico": "elena.mendoza@example.com",
        "telefono": "1234567801",
        "direccion": "Calle 12",
        "fechaNacimiento": "1995-12-12",
        "fechaContratacion": "2020-12-01"
    },
    {
        "id": 12,
        "puesto": 3,
        "nombre": "Miguel",
        "apellido": "Castro",
        "cedula": "3-3456-7890",
        "correoElectronico": "miguel.castro@example.com",
        "telefono": "1234567802",
        "direccion": "Calle 13",
        "fechaNacimiento": "1980-01-13",
        "fechaContratacion": "2021-01-01"
    },
    {
        "id": 13,
        "puesto": 4,
        "nombre": "Sara",
        "apellido": "Vargas",
        "cedula": "4-4567-8901",
        "correoElectronico": "sara.vargas@example.com",
        "telefono": "1234567803",
        "direccion": "Calle 14",
        "fechaNacimiento": "1985-02-14",
        "fechaContratacion": "2021-02-01"
    },
    {
        "id": 14,
        "puesto": 5,
        "nombre": "Daniel",
        "apellido": "Reyes",
        "cedula": "5-5678-9012",
        "correoElectronico": "daniel.reyes@example.com",
        "telefono": "1234567804",
        "direccion": "Calle 15",
        "fechaNacimiento": "1990-03-15",
        "fechaContratacion": "2021-03-01"
    },
    {
        "id": 15,
        "puesto": 1,
        "nombre": "Clara",
        "apellido": "Ortega",
        "cedula": "1-6789-0123",
        "correoElectronico": "clara.ortega@example.com",
        "telefono": "1234567805",
        "direccion": "Calle 16",
        "fechaNacimiento": "1995-04-16",
        "fechaContratacion": "2021-04-01"
    },
    {
        "id": 16,
        "puesto": 2,
        "nombre": "Pablo",
        "apellido": "Romero",
        "cedula": "2-7890-1234",
        "correoElectronico": "pablo.romero@example.com",
        "telefono": "1234567806",
        "direccion": "Calle 17",
        "fechaNacimiento": "1980-05-17",
        "fechaContratacion": "2021-05-01"
    },
    {
        "id": 17,
        "puesto": 3,
        "nombre": "Lucia",
        "apellido": "Ramos",
        "cedula": "3-8901-2345",
        "correoElectronico": "lucia.ramos@example.com",
        "telefono": "1234567807",
        "direccion": "Calle 18",
        "fechaNacimiento": "1985-06-18",
        "fechaContratacion": "2021-06-01"
    },
    {
        "id": 18,
        "puesto": 4,
        "nombre": "Fernando",
        "apellido": "Torres",
        "cedula": "4-9012-3456",
        "correoElectronico": "fernando.torres@example.com",
        "telefono": "1234567808",
        "direccion": "Calle 19",
        "fechaNacimiento": "1990-07-19",
        "fechaContratacion": "2021-07-01"
    },
    {
        "id": 19,
        "puesto": 5,
        "nombre": "Eva",
        "apellido": "Sanchez",
        "cedula": "5-0123-4567",
        "correoElectronico": "eva.sanchez@example.com",
        "telefono": "1234567809",
        "direccion": "Calle 20",
        "fechaNacimiento": "1995-08-20",
        "fechaContratacion": "2021-08-01"
    },
    {
        "id": 20,
        "puesto": 2,
        "nombre": "Jose",
        "apellido": "Hernandez",
        "cedula": "2-7890-1234",
        "correoElectronico": "jose.hernandez@example.com",
        "telefono": "1234567896",
        "direccion": "Calle 7",
        "fechaNacimiento": "1990-07-07",
        "fechaContratacion": "2020-07-01"
    }
]
export default empleados