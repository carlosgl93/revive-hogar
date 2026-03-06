Suscripción
Permite la vinculación de un plan a un cliente, para posteriormente realizar cargos recurrentes automáticamente, según se defina en cada plan

<https://app.payku.cl/api/suclient>

Crear cliente
Este método permite la inserción de datos de un cliente.

const request = async (data) => {
  const response = await fetch('https://BASE_URL/api/suclient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result)
}

let data = {
  email: "<johndoe@example.com>",
  name: "John Doe",
  rut: "111111111",
  phone: "923122312",
  address: "Moneda 101",
  country: "Chile",
  region: "Metropolitana",
  city: "Santiago",
  postal_code: "850000",
  additional_parameters:{
    parameter_1: "example",
    parameter_2: "example 2",
  }
};

request(data);

res: 
{
  "status": "active",
  "id": "cl0be4c8e623c167bc8b777",
  "rut": "11111111",
  "name": "John Doe",
  "phone": "923122312",
  "email": "<johndoe@example.com>",
  "address": "Moneda 101",
  "country": "Chile",
  "region": "Metropolitana",
  "city": "Santiago",
  "postal_code": "850000",
  "created_at": "2023-09-29",
  "update_at": null,
  "subcriptions": null,
  "additional_parameters": {
    "parameter_1": "example",
    "parameter_2": "example"
  }
}

Obtener cliente
Este método permite obtener el detalle de un cliente.
<https://app.payku.cl/api/suclient/{identificadorCliente}> o {emailCliente}

const request = async () => {
  const response = await fetch('https://BASE_URL/api/suclient/cla90927fa9b30e1dfffa0', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res:
{
  "status": "active",
  "id": "cl0be4c8e623c167bc8b777",
  "rut": "11111111",
  "name": "John Doe",
  "phone": "923122312",
  "email": "<johndoe@example.com>",
  "address": "Moneda 101",
  "city": "Santiago",
  "region": "Metropolitana",
  "country": "Chile",
  "postal_code": "850000",
  "created_at": "2023-09-29 22:00:00",
  "update_at": null,
  "active_cards": [
    {
      "last_4_digits": "XXXXXXXXXXXX6622",
      "identifier": "surec804a8ed60c747cb8839",
      "card_type": "Visa",
      "register": "2023-07-26 08:00:19"
    },
    {
      "last_4_digits": "XXXXXXXXXXXX1234",
      "identifier": "surec804a8ed60c747cb8843",
      "card_type": "MasterCard",
      "register": "2023-01-01 12:00:00"
    }
  ],
  "additional_parameters": {
    "parameter_1": "example",
    "parameter_2": "example"
  },
  "subcriptions": {
    "id": "su867f07772aa5f5175527",
    "created_at": "2023-09-29 19:58:35",
    "status": "active",
    "amount": "15000",
    "plan": [
      {
        "id": "pl9697fb170834ad42dd00",
        "name": "test plan",
        "currency": "CLP"
      }
    ],
    "cards": [
      {
        "last_4_digits": "XXXXXXXXXXXX6623",
        "card_type": "Visa"
      }
    ],
    "transactions": [
      {
        "created_at": "2023-09-30 19:58:35",
        "date_payment": "2023-09-30",
        "amount": 10000,
        "transaction": 204444,
        "authorization_code": "1234",
        "order": "001",
        "description": "descripcion",
        "status": "success"
      }
    ]
  }
}

Actualizar cliente
Este método permite la actualización de los datos de un cliente.
<https://app.payku.cl/api/suclient/{identificadorCliente}> o {emailCliente}

const request = async (data) => {
  const response = await fetch('https://BASE_URL/api/suclient', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result)
}

let data = {
  email: "<johndoe@example.com>",
  name: "John Doe Doe",
  phone: "923122312",
  address: "Moneda 121",
  country: "Chile",
  region: "Metropolitana",
  city: "Santiago",
  postal_code: "750000",
  additional_parameters:{
    parameter_1: "example",
    parameter_2: "example 2",
  }
};

request(data);

res: 

{
  "status": "active",
  "id": "cl0be4c8e623c167bc8b777",
  "name": "John Doe Doe",
  "phone": "923122312",
  "email": "<johndoe@example.com>",
  "address": "Moneda 121",
  "city": "Santiago",
  "region": "Metropolitana",
  "country": "Chile",
  "postal_code": "750000",
  "created_at": "2023-09-29 22:00:00",
  "update_at": "2023-10-2 08:32:52",
  "additional_parameters": {
    "parameter_1": "example",
    "parameter_2": "example"
  },
  "subcriptions": {
    "id": "su867f07772aa5f5175527",
    "created_at": "2023-09-29 19:58:35",
    "status": "active",
    "amount": "15000",
    "plan": [
      {
        "id": "pl9697fb170834ad42dd00",
        "name": "test plan",
        "currency": "CLP"
      }
    ],
    "cards": [
      {
        "last_4_digits": "XXXXXXXXXXXX6623",
        "card_type": "Visa"
      }
    ],
    "transactions": [
      {
        "created_at": "2023-09-30 19:58:35",
        "date_payment": "2023-09-30",
        "amount": 10000,
        "transaction": 204444,
        "authorization_code": "1234",
        "order": "001",
        "description": "descripcion",
        "status": "success"
      }
    ]
  }
}

Eliminar cliente
Este método permite la eliminación de un cliente asociado a un ID de usuario.

<https://app.payku.cl/api/suclient/{identificadorCliente}> o {emailCliente}

const request = async () => {
  const response = await fetch('https://BASE_URL/api/suclient/cla90927fa9b30e1dfffa0', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res:
{
  "status": "success",
  "id": "cl0be4c8e623c167bc8b777"
}

Obtener clientes
Este método permite obtener todos los clientes asociados a un ID de usuario , este método permite una paginación con un máximo de 100 registros por página, además, posee un filtro de fecha, si este parámetro no es ingresado se tomará la fecha actual, para la paginación es necesario agregar al final del endpoint lo siguiente ?page=1&per_page=100 siendo el primer parámetro el número de la página y el segundo el número de registros por página.

https://app.payku.cl/api/suclient/customers

const request = async () => {
  const response = await fetch('https://BASE_URL/api/suclient/customers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res:
[
  {
    "Customers": [
      {
        "last_4_digits": "XXXXXXXXXXXX6622",
        "identifier": "surec804a8ed60c747cb8839",
        "card_type": "Visa",
        "register": "2023-07-26 08:00:19"
      },
      {
        "last_4_digits": "XXXXXXXXXXXX1234",
        "identifier": "surec804a8ed60c747cb8843",
        "card_type": "MasterCard",
        "register": "2023-01-01 12:00:00",
        "additional_parameters": {
          "type": "array",
          "description": "Parámetros adicionales que puede enviar payku.",
          "example": ""
        },
        "subcriptions": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "description": "Identificador de la suscripción creado por payku.",
                "type": "string",
                "example": "su867f07772aa5f5175527"
              },
              "created_at": {
                "description": "Fecha de registro.",
                "type": "string",
                "example": "2023-09-29 19:58:35",
                "format": "datetime"
              },
              "status": {
                "description": "Estatus de la suscripción. Los posibles estados que puede obtener son los siguientes:\n- register\n- active\n- finish\n- delete\n- cancel\n- suspended\n",
                "type": "string",
                "example": "active"
              },
              "amount": {
                "description": "Monto de la suscripción.",
                "type": "string",
                "example": "15000"
              },
              "plan": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "Identificador del plan creado por payku.",
                      "type": "string",
                      "example": "pl9697fb170834ad42dd00"
                    },
                    "name": {
                      "description": "Nombre del plan.",
                      "type": "string",
                      "example": "test plan"
                    },
                    "currency": {
                      "description": "Moneda.",
                      "type": "string",
                      "example": "CLP"
                    }
                  }
                }
              },
              "cards": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "last_4_digits": {
                      "description": "Últimos 4 dígitos de la tarjeta afiliada.",
                      "type": "string",
                      "example": "XXXXXXXXXXXX6623"
                    },
                    "card_type": {
                      "description": "Tipo de tarjeta.",
                      "type": "string",
                      "example": "Visa"
                    }
                  }
                }
              },
              "transactions": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "created_at": {
                      "description": "Fecha de creación de la transacción.",
                      "type": "string",
                      "example": "2023-09-30 19:58:35"
                    },
                    "date_payment": {
                      "description": "Fecha en que se realizo la transacción.",
                      "type": "string",
                      "example": "2023-09-30"
                    },
                    "amount": {
                      "description": "Monto de transacción.",
                      "type": "int",
                      "example": 10000
                    },
                    "transaction": {
                      "description": "Número de transacción.",
                      "type": "int",
                      "example": 204444
                    },
                    "authorization_code": {
                      "description": "Código de autorización.",
                      "type": "string",
                      "example": "1234"
                    },
                    "order": {
                      "description": "Número de orden.",
                      "type": "string",
                      "example": "001"
                    },
                    "description": {
                      "description": "Descripción.",
                      "type": "string",
                      "example": "descripcion"
                    },
                    "status": {
                      "description": "Estatus de transacción.Los posibles estados que puede obtener son los siguientes:\n- pending\n- success\n- retry\n- canceled by customer\n- canceled by paymaster\n- canceled by payku\n- maximum attempt limit\n- first payment rejected\n- payment consumes failed\n",
                      "type": "string",
                      "example": "success"
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
]

Crear suscripción
Este método permite al usuario de una cuenta payku crear una suscripción a un plan de suscripción de monto fijo, suscripción de plan de consumo y suscripción de monto variable a uno de sus clientes, para este ultimo tipo de suscripción es necesario enviar el monto que sera cobrado en la suscripción, es importante destacar que al realizar esta solicitud por primera vez se realizará un cobro de $50 que permite comprobar que la tarjeta se encuentra activa y es válida, en el caso de un plan de suscripción fijo el cobro del servicio será automático a partir del mes siguiente de la fecha de suscripción y en el caso que la suscripción sea a un plan de consumo será necesario utilizar el endpoint api/sutransaction para generar la transacción.

https://app.payku.cl/api/sususcription
const request = async (data) => {
  const response = await fetch('https://BASE_URL/api/sususcription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result)
}

let data = {
  plan: "pl9697fb170834ad42dd00",
  client: "cl9b1e1dd988694f30fa30",
};

request(data);
res:
{
  "status": "register",
  "id": "sucaab7865dceaff49d8b3",
  "url": "http://BASE_URL/gateway/registrosuscripcion?tipoplan=2&plan=true&token=219&validacion=e6c50ba0e0"
}

Obtener suscripciones
Este método permite obtener todos las suscripciones asociados a un ID de usuario , este método permite una paginación con un máximo de registros por página, además, posee un filtro de fecha, si este parámetro no es ingresado se tomará la fecha actual, para la paginación es necesario agregar al final del endpoint lo siguiente ?page=1&per_page=100 siendo el primer parámetro el número de la página y el segundo el número de registros por página. estatus: se puede filtrar la búsqueda de las suscripciones dependiendo del estatus que se desea buscar agregando el estatus a buscar igual a true, en caso de no agregar ninguno por defecto se buscaran todas las suscripciones sin discriminar por su estatus.

https://app.payku.cl/api/sususcription

const request = async () => {
  const response = await fetch('https://BASE_URL/api/sususcription', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res: [
  {
    "subscriptions": [
      {
        "id": "sucaab7865dceaff49d8b7",
        "status": "active",
        "last_status_current_payment": "pending",
        "start": "2019-07-22 18:34:49",
        "end": "2023-06-12 00:00:00",
        "client": {
          "id": "su7e5e1c0b1bd2e37ec557",
          "name": "name",
          "email": "johndoe@example.com",
          "rut": "11.111.111-1",
          "phone": "56928265454",
          "parámetros": [],
          "additional_parameters": ""
        },
        "plan": {
          "id": "pl9697fb170834ad42dd00",
          "name": "test plan",
          "currency": "CLP"
        },
        "cards": {
          "last_4_digits": "XXXXXXXXXXXX6622",
          "card_type": "Visa"
        },
        "transactions": [
          {
            "created_at": "2023-09-30 19:58:35",
            "amount": 10000,
            "transaction": 204444,
            "authorization_code": "1234",
            "order": "001",
            "description": "descripcion",
            "status": "success"
          }
        ],
        "logs": {
          "status": [
            {
              "change_date": "2021-02-17 16:11:53",
              "initial_status": "register",
              "final_status": "active"
            }
          ]
        }
      }
    ]
  }
]

Obtener suscripciones V3
Este método permite obtener todos las suscripciones asociados a un ID de usuario , este método permite una paginación con un máximo de 4000 registros por página, además, posee los siguientes filtros:

date_init: indica la fecha desde donde se desea comenzar la búsqueda de suscripciones, si este parámetro no es enviado la busqueda iniciara la fecha actual . date_end: indica la fecha donde se desea que termine la búsqueda de suscripciones, si este parámetro no es enviado la busque tendrá como fecha final la fecha actual. estatus: se puede filtrar la búsqueda de las suscripciones dependiendo del estatus que se desea buscar agregando el estatus a buscar igual a true, en caso de no agregar ninguno por defecto se buscaran todas las suscripciones sin discriminar por su estatus.

para la paginación es necesario agregar al final del endpoint lo siguiente ?page=1&per_page=100 siendo el primer parámetro el número de la página y el segundo el número de registros por página. En caso de querer buscar las suscripciones entre las fechas 01-07-2021 y 15-07-2021, además que solo sean las suscripciones de estado active, la url a utilizar seria la siguiente: https://[URL_BASE]/api/sususcriptionv2?date_init=2021-09-01&date_end=2021-09-15&active=true.

<https://app.payku.cl/api/sususcriptionv3>

const request = async () => {
  const response = await fetch('https://BASE_URL/api/sususcriptionv3', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);
res: [
  {
    "subscriptions": [
      {
        "id": "sucaab7865dceaff49d8b7",
        "estatus": "active",
        "start": "2019-07-22 18:34:49",
        "end": "2023-06-12 00:00:00",
        "client": {
          "id": "su7e5e1c0b1bd2e37ec557",
          "name": "name",
          "email": "johndoe@example.com",
          "rut": "11.111.111-1",
          "phone": "56928265454",
          "parámetros": [],
          "additional_parameters": ""
        },
        "plan": {
          "id": "pl9697fb170834ad42dd00",
          "name": "test plan",
          "currency": "CLP"
        },
        "active_cards": {
          "last_4_digits": "XXXXXXXXXXXX6622",
          "card_type": "Visa"
        },
        "logs": {
          "status": [
            {
              "change_date": "2021-02-17 16:11:53",
              "initial_status": "register",
              "final_status": "active"
            }
          ]
        },
        "paid": [
          {
            "payment_cycle_day": "2021-07-09",
            "payment_day": "2021-07-09",
            "status": "success",
            "amount_paid": 2500,
            "try_number": 1,
            "paid_number": 1,
            "transactions": [
              {
                "created_at": "2023-09-30 19:58:35",
                "amount": 2500,
                "transaction": 204444,
                "payment_key": null,
                "transaction_key": null,
                "authorization_code": "1234",
                "order": "001",
                "description": "descripcion",
                "status": "success"
              }
            ]
          }
        ]
      }
    ]
  }
]

Obtener suscripción
Este método permite obtener el detalle de una suscripción.

path Parameters
id
required
stringmáximo 20 caracteres
Identificador único de transacción por payku.

https://app.payku.cl/api/sususcription/{identificadorSuscripcion}

const request = async () => {
  const response = await fetch('https://BASE_URL/api/sususcription/sucaab7865dceaff49d8b', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res:
{
  "id": "sucaab7865dceaff49d8b7",
  "status": "active",
  "start": "2019-07-22 18:34:49",
  "end": "2023-06-12 00:00:00",
  "client": {
    "id": "cld0835b9063a5903f4ae7",
    "name": "name",
    "email": "<joedoe@example.com>",
    "rut": "11.111.111-1",
    "phone": "56972756487",
    "parámetros": [],
    "additional_parameters": ""
  },
  "plan": {
    "id": "pl9697fb170834ad42dd00",
    "name": "test plan",
    "currency": "CLP"
  },
  "cards": {
    "last_4_digits": "XXXXXXXXXXXX6622",
    "card_type": "Visa"
  },
  "active_cards": [
    {
      "last_4_digits": "XXXXXXXXXXXX6622",
      "identifier": "surec804a8ed60c747cb8839",
      "card_type": "Visa",
      "register": "2023-07-26 08:00:19"
    },
    {
      "last_4_digits": "XXXXXXXXXXXX1234",
      "identifier": "surec804a8ed60c747cb8843",
      "card_type": "MasterCard",
      "register": "2023-01-01 12:00:00"
    }
  ],
  "transactions": [
    {
      "created_at": "2023-09-30 19:58:35",
      "amount": 10000,
      "transaction": 204444,
      "authorization_code": "1234",
      "order": "001",
      "description": "descripcion",
      "status": "success"
    }
  ],
  "logs": {
    "status": [
      {
        "change_date": "2021-02-17 16:11:53",
        "initial_status": "register",
        "final_status": "active"
      }
    ]
  }
}

Eliminar suscripción
Este método permite la eliminación de una suscripción asociada a un ID de suscripción.

path Parameters
id
required
stringmáximo 20 caracteres
Identificador único de suscripción creado por payku.

https://app.payku.cl/api/sususcription/{identificadorSuscripcion}

const request = async () => {
  const response = await fetch('https://BASE_URL/api/sususcription/sucaab7865dceaff49d8b', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res: {
  "id": "sucaab7865dceaff49d8b3",
  "status": "success"
}

Afiliar tarjeta
Este método permite la Inserción de los datos de una tarjeta para suscripción.

Improtante

En caso de necesitar de la renovacion de tarjeta de su cliente, el método le permitira agregar una nueva tarjeta a la suscripcion.

¡Inmediatamente a la actualización de la tarjeta asociada a la suscripción, el sistema podrá realizar los cargos atrasados correspondientes según configuración del plan suscrito!, Es decir, si la suscripción se encuentra en estatus suspendido por máximos intentos de cobros realizados, y el cliente registra una nueva tarjeta, el sistema podrá revisar los pagos pendientes, hacer el cargo correspondiente, y activar automáticamente la suscripción
https://app.payku.cl/api/suinscriptionscards

const request = async (data) => {
  const response = await fetch('https://BASE_URL/api/suinscriptionscards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.log(result)
}

let data = {
  suscription: "sucaab7865dceaff49d8b3"
};

request(data);
{
  "status": "success",
  "id": "sucaab7865dceaff49d8b3",
  "url": "https://BASE_URL/gateway/registrosuscripcion?plan=true&token=246&validacion=d6b32"
}

Obtener plan
Este método permite obtener el detalle de un plan.

path Parameters
id
required
stringmáximo 20 caracteres
Identificador único de plan por payku.

const request = async () => {
  const response = await fetch('https://BASE_URL/api/suplan/pl29f6ad69fbd594148c39', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Sign': 'SHA256-REQUEST-PATH-VALUE-TOKEN-PRIVADO',
      'Authorization': 'Bearer TOKEN_PUBLICO'
    },
  });
  const result = await response.json();
  console.log(result)
}

request(data);

res: {
  "status": "success",
  "plans": {
    "id": "pl4293e97a87195bb9edcd",
    "status": "active",
    "name": "Test plan",
    "code": "001",
    "description": "Test Plan",
    "url_notify_payment": "",
    "url_notify_suscription": "",
    "total_suscription": 0,
    "total_suscription_active": 0
  }
}

url Callback notificación suscripción
Luego de realizar la activación de la suscripción por parte del usuario, payku notificara al comercio, el resultado de la operación (status), realizando una solicitud post a la url de notificación de suscripción suministrada previamente en la creación de la suscripción y a su vez entregará una serie de datos para las validaciones internas por parte de la aplicación del comercio, el id de la suscripción el cual corresponde al identificador único en payku. Estos datos permitirán al comercio conocer el estado de sus suscripciones y respaldarlas en su base de datos.

https://app.payku.cl/urlnotifysuscription
res: {
  "id": "su74866857980c7d2b4306",
  "status": "active"
}

url Callback notificación cobro
Luego de realizado el cobro de la suscripción de forma automatica, payku notificara al comercio, el resultado de la operación (status), realizando una solicitud post a la url de notificación de cobro suministrada previamente en la creación de la suscripción y a su vez entregará una serie de datos para las validaciones internas por parte de la aplicación del comercio, el transactionn_id el cual corresponde al identificador único en payku y un verification_key, que corresponde a un hash de validación único por transacción. Estos datos permitirán al comercio conocer el estado de sus transaciones y respaldarlas en su base de datos.

https://app.payku.cl/urlnotifypayment

Res: {
  "transaction_id": 9123123,
  "verification_key": "2ba83615f863e72sdca5dfd0a6df2782",
  "order": 1568041684,
  "status": "success",
  "subscriptions": {
    "id": "su3ce571420e90b600eafb",
    "client": "cl795704ece0a3690baaf"
  }
}
