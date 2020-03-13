let data = msg.payload;
var cont = context;
console.log(cont);
var t;
var sv;
var ts;
var type, value, priority, role, min_threshold, max_threshold;
for (var i = 0; i < data.length; i++){
    for (var h= 0; h < data[i].SIGNALS.length;h++){
        t = data[i].SIGNALS[h].TYPE;
        sv = data[i].SIGNALS[h].VALUE;
        ts = data[i].SIGNALS[h].SIGNAL_TIMESTAMP;
        if (data[i].SIGNALS[h].MIN_THRESHOLD != "NULL" && data[i].SIGNALS[h].MAX_THRESHOLD != "NULL"){
            min_threshold = data[i].SIGNALS[h].MIN_THRESHOLD;
            max_threshold = data[i].SIGNALS[h].MAX_THRESHOLD;
            node.send({
                timestamp: ts,
                sensor_value: sv,
                min: min_threshold,
                max: max_threshold,
                topic: t
            });
        } else {
            node.send({
                timestamp: ts,
                sensor_value: sv,
                topic: t
            });
        }
    }
    if (data[i].NOTIFICATIONS.length > 0){
        for (var j = 0; j < data[i].NOTIFICATIONS.length;j++){
            type = data[i].NOTIFICATIONS[j].TYPE;
            value = data[i].NOTIFICATIONS[j].VALUE;
            priority = data[i].NOTIFICATIONS[j].PRIORITY;
            role = data[i].NOTIFICATIONS[j].ROLE;
            node.send(
                {
                    notif_info:[{
                        notify_value: value,
                        notify_type: type,
                        notify_priority: priority,
                        notfiy_role: role
                    }],
                    topic: "notification"
                }
            )
        }
    }
}

