import { useEffect, useReducer } from "react";

const ActionTypes = {
  START: "START",
  STOP: "STOP",
  TICK: "TICK",
  RESET: "RESET",
  SET_TIME: "SET_TIME"
};

function reducer(state, action) {

  switch (action.type) {
    case ActionTypes.START: {
      const { timerId } = action.payload;
      return {
        ...state,
        timerId
      };
    }

    case ActionTypes.STOP: {
      clearInterval(state.timerId);
      console.log("timer stopped", state.timerId);
      return {
        ...state,
        timerId: null
      };
    }

    case ActionTypes.TICK: {
      return {
        ...state,
        seconds: state.seconds+1
      };
    }

    case ActionTypes.RESET: {
      return {
        ...state,
        timerId: null
      };
    }

    case ActionTypes.SET_TIME: {
      return state
    }

    default: {
      return state;
    }
  }
}

const initialState = {
  seconds: 0,
  timerId: null
};

function useTimer() {
  const [{ seconds, timerId }, dispatch] = useReducer(reducer, initialState);

  const isRunning = timerId !== null;

  useEffect(() => {
    return () => {
      stop(dispatch)
    }
  }, [])

  const formattedTime = formatTime(seconds)

  return {
    formattedTime,
    start,
    stop,
    isRunning,
    reset,
    dispatch
  };
}

function formatTime(seconds){
  const minutes = Math.floor(seconds/60)
  const secs = Math.floor(seconds%60)

  return lpad(minutes)+":"+lpad(secs)
}

function lpad(val){
  return val > 9 ? val : "0"+val
}

export default useTimer;


// helper fns
function tick(dispatch){
    dispatch({ type: ActionTypes.TICK });
    console.log("ticking....");
}

function start(dispatch) {
  const id = setInterval(() => tick(dispatch), 1000);
  console.log("new timer started ", id);
  const payload = {
    timerId: id
  };
  dispatch({ type: ActionTypes.START, payload });
};

function stop(dispatch){
  dispatch({ type: ActionTypes.STOP });
};

function reset(dispatch){
  stop(dispatch);
  dispatch({ type: ActionTypes.RESET });
};