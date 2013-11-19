EasyRepl
========
Easy REPL module - Adds telnet accessible REPL to your server scoped to a passed in context

Example usage


    EasyREPL = require('easyrepl');


    var easyRepl = new EasyREPL({
      abc: abc_instance,
      process: {
        // only expose a subset of process which is useful for debugging
        memoryUsage : process.memoryUsage,
        uptime : process.uptime,     hrtime : process.hrtime
      }
    });
    
    easyRepl.start();
    // REPL Setup Done

