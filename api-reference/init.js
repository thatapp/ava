  window.ui = SwaggerUIBundle({
    url: "swagger.json",
    dom_id: "#swagger-ui",
    deepLinking: true,              // keeps the docs' existing links working: /docs/v2#/workspaces/post_workspaces
    docExpansion: "none",
    defaultModelsExpandDepth: -1,
    filter: true,
    tryItOutEnabled: false,
    supportedSubmitMethods: [],     // reference only: never send requests from this page
    validatorUrl: null              // don't call the public swagger.io validator
  });
