# **JWT Auth Flow**

**Reasoning**

- The system provides an access / refresh token pair on user log in
- The access token is used by the client to authorize every request and is valid for a short amount
  of time (e.g.: 15m)
- The refresh token is used by the client to authorize a request only to the refresh tokens endpoint
  and is valid for a longer amount of time (e.g.: 7d)
  - A copy of the hashed refresh token is saved as part of the user in the DB on log in and token
    refresh, which is then used to compare against in the refresh token guard
- E.g.:
  - User logs in and gets access / refresh token pair
  - Client uses the access token for every request
  - Eventually the access token expires and throws the corresponding error
  - The client gets the response that the access token expired and sends a request to the refresh
    token endpoint with the refresh token instead of the access token
  - If the refresh token hasn't expired, the service creates a new access / refresh token pair
    allowing the user to stay logged in for the duration of the refresh token's validity period
    while also rotating both access tokens in short intervals for security reasons
    - If the refresh token has expired, the user is then asked to log in again

**Guards**

- Access token guard
  - Global guard for all controllers
  - If the controller is either public or token-refresh, it returns true; otherwise it continues
    with the normal flow
  - Gets the access token from the header
  - Verifies the token hasn't expired
  - Validates the token's payload matches against the user's info in the DB
    - If valid, sets the requests.user = the user from the DB and returns true
    - Throws an unauthorized error otherwise
- Refresh token guard
  - Only applies to the refresh tokens endpoint
  - Gets the access token from the header
  - Verifies the token hasn't expired
  - Validates the token and token's payload matches against the user's info in the DB
    - If valid, sets the requests.user = the user from the DB and returns true
    - Throws an unauthorized error otherwise

**Endpoints**

- `api/auth/sign-in`

  - User provides username and password
  - The service checks the provided password for the user against the DB
    - If the password matches, the service saves the login in the DB and responds with the user
      along with an access / refresh token pair
    - The access token is signed with the user's id and username
    - The refresh token is signed with the user's id
    - The refresh token is hashed, then saved as part of the user's information in the DB
      - It is first reversed then hashed because bcrypt only hashes the first 72 bytes of the input
        and the first bytes of both tokens will be the same because they're signed with similar
        information

- `/api/auth/refresh`

  - The client provides the refresh token as a bearer token in the request's authorization header
  - This endpoint is protected by the refresh token guard
  - The service gets the user from the request (passed to the controller by the refresh token guard)
    and creates a new access / refresh token pair (updating the user's refresh token to the new one)

- `/api/auth/log-out`

  - The service gets the user from the request (passed to the controller by the access token guard)
    and updates the user's refresh token in the DB to an empty string
