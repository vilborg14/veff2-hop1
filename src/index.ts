import { serve } from '@hono/node-server'
import { Hono } from 'hono'


// routes from folder
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import tagRoutes from "./routes/tagsRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

//const app = new Hono()

const app = new Hono();

app.get('/', (c) => {
  const routes = Array.from(
    new Map(
      app.routes.map((route) => [
        `${route.method} ${route.path}`, route])
  ).values()
  );
  return c.json(routes);

})
// routes all /**/... , from folder routes
app.route("/users", userRoutes);
app.route("/tasks", taskRoutes);
app.route("/categories", categoryRoutes);
app.route("/tags", tagRoutes);
app.route("/images", imageRoutes);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
});
