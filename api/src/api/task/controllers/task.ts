import { factories } from "@strapi/strapi";
import type { Context } from "koa";

// Define an interface for the task with the user relation
interface TaskWithUser {
  id: string;
  user?: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
}

// Define an interface for the filters
interface TaskFilters {
  user?: { id: number } | number;
  [key: string]: any;
}

export default factories.createCoreController(
  "api::task.task",
  ({ strapi }) => ({
    // Create a new task with the current user
    async create(ctx: Context) {
      try {
        // Extract the data from the request
        const { data } = ctx.request.body || { data: {} };

        // Create the task using the entity service
        const task = await strapi.entityService.create("api::task.task", {
          data: {
            ...data,
            user: ctx.state.user.id,
          },
        });

        // Return the task
        return { data: task };
      } catch (error) {
        console.error("Error creating task:", error);
        return ctx.badRequest("Error creating task");
      }
    },

    // Only return tasks that belong to the current user
    async find(ctx: Context) {
      try {
        // Get the tasks using the entity service
        const tasks = await strapi.entityService.findMany("api::task.task", {
          filters: {
            user: {
              id: ctx.state.user.id,
            },
          },
          populate: ["user"],
        });

        // Return the tasks
        return { data: tasks };
      } catch (error) {
        console.error("Error finding tasks:", error);
        return ctx.badRequest("Error finding tasks");
      }
    },

    // Only return a specific task if it belongs to the current user
    async findOne(ctx: Context) {
      try {
        // Get the requested task
        const task = (await strapi.entityService.findOne(
          "api::task.task",
          ctx.params.id,
          {
            populate: ["user"],
          }
        )) as TaskWithUser;

        // Check if the task belongs to the current user
        if (task && task.user && task.user.id === ctx.state.user.id) {
          return { data: task };
        }

        return ctx.forbidden("You are not allowed to access this task");
      } catch (error) {
        console.error("Error finding task:", error);
        return ctx.badRequest("Error finding task");
      }
    },

    // Only update a task if it belongs to the current user
    async update(ctx: Context) {
      try {
        // Get the requested task
        const task = (await strapi.entityService.findOne(
          "api::task.task",
          ctx.params.id,
          {
            populate: ["user"],
          }
        )) as TaskWithUser;

        // Check if the task belongs to the current user
        if (task && task.user && task.user.id === ctx.state.user.id) {
          // Extract the data from the request
          const { data } = ctx.request.body || { data: {} };

          // Update the task
          const updatedTask = await strapi.entityService.update(
            "api::task.task",
            ctx.params.id,
            {
              data: {
                ...data,
                user: ctx.state.user.id,
              },
            }
          );

          return { data: updatedTask };
        }

        return ctx.forbidden("You are not allowed to update this task");
      } catch (error) {
        console.error("Error updating task:", error);
        return ctx.badRequest("Error updating task");
      }
    },

    // Only delete a task if it belongs to the current user
    async delete(ctx: Context) {
      try {
        // Get the requested task
        const task = (await strapi.entityService.findOne(
          "api::task.task",
          ctx.params.id,
          {
            populate: ["user"],
          }
        )) as TaskWithUser;

        // Check if the task belongs to the current user
        if (task && task.user && task.user.id === ctx.state.user.id) {
          // Delete the task
          const deletedTask = await strapi.entityService.delete(
            "api::task.task",
            ctx.params.id
          );

          return { data: deletedTask };
        }

        return ctx.forbidden("You are not allowed to delete this task");
      } catch (error) {
        console.error("Error deleting task:", error);
        return ctx.badRequest("Error deleting task");
      }
    },
  })
);
