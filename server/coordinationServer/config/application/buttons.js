module.exports = {
    actions: {
        ping : [
            "ping/hexapod",
            "ping/voltage"
        ],
        misc : [
            "action/calibrate",
            "action/wakeup",
            "action/standby"
        ],
        crawl : [
            "movement",
            "movement/forward",
            "movement/backward",
            "movement/left",
            "movement/right"
        ],
        turns : [
            "turn/left",
            "turn/right"
        ],
        height : [
            "height"
        ],
        move : [
            "move"
        ],
        rotate : [
            "rotate"
        ],
        twist : [
            "twist"
        ]
    }
};
