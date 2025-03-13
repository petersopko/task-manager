import type { Context } from "koa";

// Define a custom PolicyContext that extends Context
interface PolicyContext extends Context {
  state: {
    user?: any;
    [key: string]: any;
  };
}

export default (policyContext: PolicyContext, config: any, { strapi }: any) => {
  if (policyContext.state.user) {
    // Go to next policy or controller
    return true;
  }

  return false;
};
