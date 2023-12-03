-- Este archivo es utilizado para cargar datos de prueba en la base de datos.

-- Insertar primero instancias fijas de dominio (Estado) que respete el patrón.
INSERT INTO Estado (id, nombre) VALUES
(1, 'Finalizada'),
(2, 'En Curso'),
(3, 'Iniciado'),
(4, 'Escucha Correcta'),
(5, 'En Escucha con Observación'),
(6, 'Pendiente de Escucha'),
(7, 'Descartado'),
(8, 'Cancelada');

-- Ahora sí pasamos a insertar las instancias necesarias para el ejemplo de demostración del caso de uso.
-- Comenzar de abajo para arriba en términos de relaciones.

INSERT INTO Validacion (id, mensajeValidacion, subOpcionLlamadaId) VALUES
(1, 'Últimos 4 números de la tarjeta', 1),
(2, 'Código de seguridad de la tarjeta', 1);

INSERT INTO OpcionValidacion (id, descripcion, correcta, validacionId) VALUES
-- Opciones de la tarjeta
(1, '1234', FALSE, 1),
(2, '4321', FALSE, 1),
(3, '5678', TRUE, 1),
(4, '8765', FALSE, 1),
-- Opciones del código de seguridad
(5, '123', FALSE, 2),
(6, '321', FALSE, 2),
(7, '456', TRUE, 2),
(8, '654', FALSE, 2);

INSERT INTO CategoriaLlamada (id, nombre) VALUES
(1, 'Robo');

INSERT INTO OpcionLlamada (id, nombre, nroOrden, categoriaLlamadaId) VALUES
(1, 'Informar robo y solicitar tarjeta nueva', 1, 1),
(2, 'Informar robo y anular tarjeta', 2, 1);

INSERT INTO SubOpcionLlamada (id, nombre, nroOrden, opcionLlamadaId) VALUES
-- Para primera opcion de llamada
(1, 'Cuenta con datos tarjeta', 1, 1),
(2, 'No cuenta con datos tarjeta', 2, 1),
(3, 'Comunicar con responsable de at. al cliente', 3, 1),
-- Para segunda opcion de llamada
(4, 'Cuenta con datos tarjeta', 1, 2),
(5, 'No cuenta con datos tarjeta', 2, 2),
(6, 'Comunicar con responsable de at. al cliente', 3, 2);

INSERT INTO Cliente (id, dni, nombreCompleto, nroCelular) VALUES
(1, '43601084', 'SERNIOTTI ANDRÉS GUIDO', '+543535123456');

-- Insertar con datos a validar vacios, son utilizados en runtime únicamente.
-- Esta es la información del cliente insertado, podríamos hacer más pero esto debe ser solo persistente para el ejemplo de demostración.
INSERT INTO InformacionCliente (id, opcionCorrectaId, validacionId, clienteId) VALUES
-- Ultimos 4 numeros de tarjeta, opcion correcta es 5678
(1, 3, 1, 1),
-- Codigo de seguridad, opcion correcta es 456
(2, 7, 2, 1);

INSERT INTO Llamada (id, clienteId, opcionSeleccionadaId, subOpcionSeleccionadaId, estadoActualId) VALUES
-- Una sola llamada, que le pertenece al cliente Guido Andrés Serniotti.
-- La llamada ya viene con la opción y subopción seleccionadas de un caso de uso anterior al que estamos mostrando, por ende las tomamos aquí. Para el ejemplo, estas son 'Informar robo y solicitar tarjeta nueva' y 'Cuenta con datos tarjeta'.
-- El estado actual de la llamada en esta etapa es 'Iniciado'.
(1, 1, 1, 1, 3);

-- Además, agregar el cambio de estado que tuvo en Iniciado.
INSERT INTO CambioEstadoLlamada (estadoId, llamadaId) VALUES
(3, 1);