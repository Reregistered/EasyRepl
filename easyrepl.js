/***
 * Create a telnet accessible REPL which provides access to
 * a context define by the user.
 */
var vm = require('vm'),
  net = require("net"),
  repl = require("repl");

function EasyREPL(context){

  if (!context['_info']) {
    var inspect = [];
    for (var itr in context){
      inspect.push(itr);
    }
    context['_info'] = inspect;
  }

  this.sandboxContext = vm.createContext(context);
}

/***
 * Now create the net server and attach the REPL for debugging.
 */
EasyREPL.prototype.start = function(port){

  port = port || Math.floor(Math.random()*3000)+5000;
  console.log('REPL port : ' + port);

  var ctx = this.sandboxContext;

  /**
   * An Eval function in the scope of the context defined by the user
   * Signature matches requirements
   * @param in_code : Code to execute
   * @param in_context : Sandboxed context
   * @param in_file : ...
   * @param cb
   */
  var localEval = function(in_code, in_context, in_file, cb) {

    var err, result;
    try {
      result = vm.runInContext(in_code, ctx, in_file);
    } catch (e) {
      err = e;
    }

    cb(err, result);
  };

  try{
    net.createServer(function (socket) {
      repl.start({
        prompt: " > ",
        input: socket,
        eval: localEval,
        output: socket
      }).on('exit', function() {
          socket.end();
        });
    }).listen(port, "localhost");
  } catch (err){
    console.log(err);
  }
};

module.exports = EasyREPL;