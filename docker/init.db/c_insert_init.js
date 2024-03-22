/*
===============================================================
========================= Inserts =============================
===============================================================
*/

// ======================= Logger Configs ===========================

db.loggerconfigs.insertOne({
  consoleLevel: 7,
  fileLevel: 4,
  webhookLevel: 2,
  name: "MSTeamsLog",
  webhookUrl:
    "https://sportenlace.webhook.office.com/webhookb2/7ac4ea9d-bef5-4f42-a31b-68452c3f3c69@d3f8969a-3cd7-4dce-90fe-14c7203911e8/IncomingWebhook/3af22113b4a643d9a0915af5e26d511f/7aa55911-3ea8-4361-bc36-87c53dfac2de",
  context: "MSTeamsLog",
  createdAt: new Date(),
  updatedAt: new Date(),
});

// ======================= i18n ===========================

db.i18ns.insertMany([
  {
    language: "en",
    content: {
      auth: {
        unauthorized: "You are not authorized",
        invalidPassword: "Invalid password",
        invalidToken: "Invalid token",
        invalidUser: "Invalid User",
        accessTokenExpired: "Access token expired",
        refreshTokenExpired: "Refresh token expired",
        noRole: "User has no role associated",
        noPermissions: "Role has no permissions associated",
      },
      account: {
        invalidUsername: "Invalid username",
        invalidEmail: "Invalid email",
      },
      common: {
        success: "Operation success",
        failure: "Operation failed",
      },
      entity: {
        alreadyExists: "Entity already exists",
        notExists: "Entity does not exist",
      },
    },
  },
  {
    language: "es",
    content: {
      auth: {
        unauthorized: "No esta autorizado",
        invalidPassword: "Contraseña invalida",
        invalidToken: "Token invalido",
        invalidUser: "Usuario invalido",
        accessTokenExpired: "Token de accesso vencida",
        refreshTokenExpired: "Token de refrescar vencida",
        noRole: "Usuario no tiene role asociado",
        noPermissions: "Role no tiene permisos asociados",
      },
      account: {
        invalidUsername: "Nombre de usuario invalido",
        invalidEmail: "Email invalido",
      },
      common: {
        success: "Operacion exitosa",
        failure: "Operacion fallida",
      },
      entity: {
        alreadyExists: "Entidad ya existe",
        notExists: "Entidad no existe",
      },
    },
  },
]);

// ==================== Permissions ========================

db.permissions.insertMany([
  {
    module: "user",
    path: "/api/user",
    method: "post",
    description: "create users",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    module: "user",
    path: "/api/user",
    method: "get",
    description: "view users",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// ======================= Roles ===========================

const createUsersPermission = db.permissions.findOne({
  $and: [{ module: "user" }, { method: "post" }],
});
const viewUsersPermission = db.permissions.findOne({
  $and: [{ module: "user" }, { method: "get" }],
});

db.roles.insertMany([
  {
    slug: "admin",
    name: "Admin",
    permissions: [createUsersPermission._id, viewUsersPermission._id],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "test",
    name: "Test",
    permissions: [viewUsersPermission._id],
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// ======================= Users ===========================

const adminRole = db.roles.findOne({
  slug: "admin",
});
const testRole = db.roles.findOne({
  slug: "test",
});

db.users.insertMany([
  {
    fullName: "Super User",
    userName: "super",
    email: "super@email.com",
    password: "$2b$10$xnruAmWKJtvUuNm9dDVRS.YJFB62DqKoQetjDtFxSXB7CQCY0Trxq",
    status: "1",
    language: "en",
    role: adminRole._id,
    isSuperUser: true,
    refreshToken: "",
    lastLogin: null,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    fullName: "Test User",
    userName: "test",
    email: "test@email.com",
    password: "$2b$10$xnruAmWKJtvUuNm9dDVRS.YJFB62DqKoQetjDtFxSXB7CQCY0Trxq",
    status: "1",
    language: "es",
    role: testRole._id,
    isSuperUser: false,
    refreshToken: "",
    lastLogin: null,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
