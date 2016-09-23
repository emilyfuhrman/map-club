if (typeof(DeviceInfo) != 'object')
    DeviceInfo = {};

if ($('brief')) {
	$('brief').hide()
}

/**
 * This represents the PhoneGap API itself, and provides a global namespace for accessing
 * information about the state of PhoneGap.
 * @class
 */
PhoneGap = {
    queue: {
        ready: true,
        commands: [],
        timer: null
    },
    _constructors: []
};

/**
 * Boolean flag indicating if the PhoneGap API is available and initialized.
 */
PhoneGap.available = DeviceInfo.uuid != undefined;

/**
 * Add an initialization function to a queue that ensures it will run and initialize
 * application constructors only once PhoneGap has been initialized.
 * @param {Function} func The function callback you want run once PhoneGap is initialized
 */
PhoneGap.addConstructor = function(func) {
    var state = document.readyState;
    if (state != 'loaded' && state != 'complete')
        PhoneGap._constructors.push(func);
    else
        func();
};
(function() {
    var timer = setInterval(function() {
        var state = document.readyState;
        if (state != 'loaded' && state != 'complete')
            return;
        clearInterval(timer);
        while (PhoneGap._constructors.length > 0) {
            var constructor = PhoneGap._constructors.shift();
            try {
                constructor();
            } catch(e) {
                if (typeof(debug['log']) == 'function')
                    debug.log("Failed to run constructor: " + debug.processMessage(e));
                else
                    alert("Failed to run constructor: " + e.message);
            }
        }
    }, 1);
})();


/**
 * Execute a PhoneGap command in a queued fashion, to ensure commands do not
 * execute with any race conditions, and only run when PhoneGap is ready to
 * recieve them.
 * @param {String} command Command to be run in PhoneGap, e.g. "ClassName.method"
 * @param {String[]} [args] Zero or more arguments to pass to the method
 */
PhoneGap.exec = function() {
    PhoneGap.queue.commands.push(arguments);
    if (PhoneGap.queue.timer == null)
        PhoneGap.queue.timer = setInterval(PhoneGap.run_command, 10);
};
/**
 * Internal function used to dispatch the request to PhoneGap.  This needs to be implemented per-platform to
 * ensure that methods are called on the phone in a way appropriate for that device.
 * @private
 */
PhoneGap.run_command = function() {
};

load_next_script()
