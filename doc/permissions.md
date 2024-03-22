# **Permissions**

**Reasoning**

- The system identifies all the endpoints available in it (excluding auth, docs, etc.) and compares
  them against the current permission objects in the DB; it creates / deletes permission objects
  according to this comparison

**Guards**

- Permission guard
  - Global guard for all controllers
  - If the controller is either public or token-refresh, it returns true; otherwise it continues
    with the normal flow
  - Gets the path and method from the endpoint currently being requested and compares them against
    the user's permissions; if the user's permissions includes the path and method then flow
    continues to the controller, otherwise the system throws the corresponding error

**Endpoints**

- `/api/permission/refresh`
  - The permissions process is done through this endpoint, which is the only endpoint that should be
    used to modify permissions
  - Other endpoints are available in the backend only for testing purposes
