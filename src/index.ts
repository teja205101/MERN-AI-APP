import concurrently from 'concurrently';

concurrently([
   {
      command: 'bun dev',
      name: 'server',
      cwd: 'packages/server',
      prefixColor: 'blue',
   },
   {
      command: 'bun dev',
      name: 'client',
      cwd: 'packages/client',
      prefixColor: 'red',
   },
]);
