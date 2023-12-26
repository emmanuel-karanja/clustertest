const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app=require('./server');

const port=3000;

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker deaths and restart them
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code}`);
    cluster.fork();
  });
} else {
  // Worker processes
 
  app.listen(port, () => {
    console.log(`App started and listening at ${port}`);
  });

  // Handle unhandled promise rejections in workers
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection in worker ${process.pid}:`, err);
    server.close(() => {
      process.exit(1); // Exit worker process with error code
    });
  });
}
