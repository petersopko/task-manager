/**
 * Custom task routes with authentication
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/tasks",
      handler: "task.find",
      config: {
        policies: ["api::task.is-authenticated"],
      },
    },
    {
      method: "GET",
      path: "/tasks/:id",
      handler: "task.findOne",
      config: {
        policies: ["api::task.is-authenticated"],
      },
    },
    {
      method: "POST",
      path: "/tasks",
      handler: "task.create",
      config: {
        policies: ["api::task.is-authenticated"],
      },
    },
    {
      method: "PUT",
      path: "/tasks/:id",
      handler: "task.update",
      config: {
        policies: ["api::task.is-authenticated"],
      },
    },
    {
      method: "DELETE",
      path: "/tasks/:id",
      handler: "task.delete",
      config: {
        policies: ["api::task.is-authenticated"],
      },
    },
  ],
};
