// -----------------------------------
//* CONSULTAS SIN PARAMETROS
// -----------------------------------

// -----------------------------------
//? 1. SEDES
// -----------------------------------
export const SQL_HEADQUARTERS = `
SELECT CIACOD, CIANOM, CIAABR
FROM SICIA
WHERE SICIA.CIAACT = 'S'
AND SICIA.CIACOD IN ('01','03')
ORDER BY CIACOD
`;

//  -----------------------------------
//? 2. ESTADOS DE ÓRDENES
// -----------------------------------
export const SQL_ORDER_STATES = `
SELECT ESTCOD, ESTNOM
FROM OREST
WHERE OREST.ESTACT = 'S'
ORDER BY ESTCOD
`;

// -----------------------------------
//* CONSULTAS CON PARAMETROS
// -----------------------------------

// -----------------------------------
//? 3. SERVICIOS POR SEDE
// -----------------------------------
export const SQL_SERVICES_BY_HEADQUARTERS = `
SELECT SERCOD, SERNOM
FROM INSER
WHERE INSER.SERACT = 'S'
AND SERDSE = ?
ORDER BY SERNOM
`;

// -----------------------------------
//? 4. UBICACIONES POR SERVICIO
// -----------------------------------
export const SQL_LOCATIONS_BY_SERVICE = `
SELECT UBICOD, UBINOM, UBIEAD
FROM INUBI, INSER
WHERE INUBI.UBIACT = 'S'
AND INUBI.UBISER = INSER.SERCOD
AND INSER.SERACT = 'S'
AND INSER.SERCOD = ?
ORDER BY UBINOM
`;

